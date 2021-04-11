import path from 'path'
import fs from 'fs'
import dot from 'graphlib-dot'

const SRC = path.resolve(__dirname, '..', 'src', 'modules')
const COD = path.resolve(__dirname, 'modules')

const modules = list('FOLDER')(SRC)

init()

async function init() {
    const modulesObj: {
        id: string,
        desc: string,
        label: string,
        grammar: Record<string, any>
    }[] = []

    for (const module of modules) {
        const modulePath = path.resolve(SRC, module)
        const folders = list('FOLDER')(modulePath)
        const moduleInfo = dot.read(fs.readFileSync(path.resolve(modulePath, module + '.dot'), 'utf-8')).graph()
        const moduleObj: {
            id: string,
            desc: string,
            label: string,
            grammar: Record<string, any>
        } = {
            id: module,
            desc: moduleInfo.desc,
            label: moduleInfo.label,
            grammar: {}
        }

        for (const command of folders) {
            const commandPath = path.resolve(modulePath, command)
            const allFiles = list('FILES')(commandPath)
            const dotFiles = allFiles.filter(a => a.startsWith('phrase_') && a.endsWith('.dot'))
            const compiledImplFile = path.resolve(COD, module, command, 'impl.js')
            const code = fs.readFileSync(compiledImplFile, 'utf-8')
            let graphObject: any = null

            for (const phrase of dotFiles) {
                try {
                    const pPath = path.resolve(commandPath, phrase)
                    const fileContent = fs.readFileSync(pPath, 'utf-8')

                    graphObject = dot.read(fileContent)
                    
                    const finalStates = graphObject.nodes().filter((a: any) => graphObject.node(a).shape === 'doublecircle')
                    const paths = dot.graphlib.alg.dijkstra(graphObject, '0')

                    const phrases = mountTree(finalStates, paths, graphObject).map(item => item.join(" ")).join(";")

                    const graphInfo = graphObject.graph()
                    graphInfo.impl = code
                    graphInfo.phrases = phrases

                    if (!moduleObj.grammar[graphInfo.lang]) moduleObj.grammar[graphInfo.lang] = []

                    moduleObj.grammar[graphInfo.lang].push(dot.graphlib.json.write(graphObject))

                    graphObject = null
                  } catch (err) {
                    console.log(err)
                }
            }
        }

        modulesObj.push(moduleObj)
    }

    const dict = JSON.stringify(modulesObj)
    fs.writeFileSync(path.resolve(__dirname, 'grammar.json'), dict)

    // Remove non essential files
    fs.unlinkSync(path.resolve(__dirname, 'd.js'))
    fs.rmdirSync(path.resolve(__dirname, 'modules'), { recursive: true })
    fs.rmdirSync(path.resolve(__dirname, '__tests__'), { recursive: true })
}

function mountTree(finalStates: string[], paths: Record<string, { distance: number, predecessor: string }>, graph: any) {
    function trace(current: string, previous: string): string[] {
        if (previous === '0') return [graph.edge(previous, current).label]

        return trace(previous, paths[previous].predecessor).concat(graph.edge(previous, current).label)
    }

    return finalStates.map(item => trace(item, paths[item].predecessor))
}

function list(type: string | number) {
    type = type === 'FOLDER' ? 0 : 1
    return (folder: string) => {
        return fs.readdirSync(folder).filter((file) => {
            if (type == null) return true

            const isFolder = fs.statSync(path.resolve(folder, file)).isDirectory()

            // @ts-ignore
            return type ^ isFolder
        })
    }
}