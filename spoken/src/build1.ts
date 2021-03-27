import path from 'path'
import fs from 'fs'
import dot from 'graphlib-dot'

const SRC = path.resolve(__dirname, '..', 'src', 'modules')
const COD = path.resolve(__dirname, 'modules')

const modules = list('FOLDER')(SRC)

init()

async function init() {
    const grammar: Record<string, any> = { langs: {} }

    for (const module of modules) {
        const modulePath = path.resolve(SRC, module)
        const folders = list('FOLDER')(modulePath)

        for (const command of folders) {
            const commandPath = path.resolve(modulePath, command)
            const allFiles = list('FILES')(commandPath)
            const dotFiles = allFiles.filter(a => a.startsWith('phrase_') && a.endsWith('.dot'))
            const compiledImplFile = path.resolve(COD, module, command, 'impl.js')
            const code = fs.readFileSync(compiledImplFile, 'utf-8')
            let graphObject = null

            for (const phrase of dotFiles) {
                try {
                    const pPath = path.resolve(commandPath, phrase)
                    const fileContent = fs.readFileSync(pPath, 'utf-8')

                    graphObject = dot.read(fileContent)

                    const graphInfo = graphObject.graph()
                    graphInfo.impl = code

                    if (!grammar.langs[graphInfo.lang]) grammar.langs[graphInfo.lang] = []

                    grammar.langs[graphInfo.lang].push(dot.graphlib.json.write(graphObject))

                    graphObject = null
                  } catch (err) {
                    console.log(err)
                }
            }
        }
    }

    fs.writeFileSync(path.resolve(__dirname, 'grammar.json'), JSON.stringify(grammar))
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