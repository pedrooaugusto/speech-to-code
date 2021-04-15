/**
 * A simple script to build all the docs in this sub folder
 */

const { graphviz } = require('@hpcc-js/wasm')
const fs = require('fs')
const path = require('path')
const svg2img = require('svg2img')
const dot = require('graphlib-dot')

const modules = list('FOLDER')(__dirname)

init()

async function init() {
    for (const module of modules) {
        const modulePath = path.resolve(__dirname, module)
        const commands = list('FOLDER')(modulePath)
        const readMes = {}

        for (const command of commands) {
            const commandPath = path.resolve(modulePath, command)
            const commandAutomatas = list('FILES')(commandPath, a => a.startsWith('phrase_') && a.endsWith('.dot'))

            const readme = {
                id: command,
                title: undefined,
                desc: undefined,
                code: undefined,
                langs: {},
            }

            let graphInfo = null

            for (const automata of commandAutomatas) {
                try {
                    const automataPath = path.resolve(commandPath, automata)
                    const fileContent = fs.readFileSync(automataPath, 'utf-8')
                    const svg = await graphviz.layout(fileContent, 'svg', 'dot')

                    await svgToImage(svg, automataPath.replace(/.dot/gi, '.png'))

                    const graph = dot.read(fileContent)
                    const phrases = AutomataPaths.allPathsToFinalStates(graph).slice(0, 16)

                    graphInfo = graph.graph()

                    readme.langs[graphInfo.lang] = {
                        image: automata.replace(/.dot/gi, '.png'),
                        phrases: phrases,
                        langName: graphInfo.langName
                    }

                    if (graphInfo.lang == 'en-US') {
                        readme.title = graphInfo.title
                        readme.desc = graphInfo.desc
                    }

                    graphInfo = null
                  } catch (err) {
                    console.log(err)
                }
            }

            const implFile = path.resolve(commandPath, list('FILES')(commandPath).find(a => a === 'impl.ts'))

            readme.code = fs.readFileSync(implFile, 'utf-8')

            readMes[command] = readme

            fs.writeFileSync(path.resolve(commandPath, 'README.md'), buildCommandReadme(readMes[command]))
        }

        // MOUNT MODULE GRAPH
        const moduleInfoPath = path.resolve(modulePath, module + '.dot')
        let moduleInfoContent = fs.readFileSync(moduleInfoPath, 'utf-8')
        let moduleInfoLines = moduleInfoContent.split('\n')
        let begin = moduleInfoLines.findIndex(a => a.trim().startsWith('// START GENERATED'))
        let end = moduleInfoLines.findIndex(a => a.trim().startsWith('// END GENERATED'))

        if (end === -1 || begin === -1 || begin > end) {
            console.warn('Could not mount module documentation')
            continue
        }

        const newLines = commands.map((item, index) => `    0 -> ${(index + 1)} [label="(${item})"];`)

        const a = moduleInfoLines.slice(0, begin + 1)
        const b = moduleInfoLines.slice(end)
        const c = a.concat(newLines).concat(b).join('\n')

        fs.writeFileSync(moduleInfoPath, c)

        // Generate image
        const svg = await graphviz.layout(c, 'svg', 'dot')
        await svgToImage(svg, moduleInfoPath.replace(/.dot/gi, '.png'))

        // MOUNT MODULE README
        const graph = dot.read(c).graph()
        const text = []

        text.push('# ' + graph.label)
        text.push(graph.desc)
        text.push('![' + module + '](' + module + '.png)')
        text.push('---')

        for (const j in readMes) {
            for (const k in readMes[j].langs) {
                readMes[j].langs[k].image = readMes[j].id + '/' + readMes[j].langs[k].image
            }
        }

        text.push(...Object.values(readMes).map(buildCommandReadme).map(a => a + '\n\n---'))

        fs.writeFileSync(path.resolve(modulePath, 'README.md'), text.join('\n\n'))
    }
}

function buildCommandReadme(readme) {
    const text = []

    const push = (s) => {
        text.push(s)

        return text
    }

    push('## ' + readme.title)
    push(readme.desc)
    push('### Languages')
    push('This command is available in the following languages')
    push(buildLangSection(readme))
    push('### Implementation')
    push('Full implementation of this command can be found on this repository under the file [impl.ts](impl.ts)')
    push('```typescript\n' + readme.code.substr(0, 300))
    push('(...)\n```')

    return text.join('\n\n')
}

const i18n = {
    'en-US': {
        automata: (cName) => `The following automata is responsible for recognizing the command \`${cName}\` in english:`,
        phrases: (cName) => `The following are examples of phrases, in english, used to trigger the command \`${cName}\`:`
    },
    'pt-BR': {
        automata: (cName) => `O automata seguinte é reponsável por reconhecer o comando \`${cName}\` em português:`,
        phrases: (cName) => `As seguintes frases, em português, podem ser usadas para ativar o comando \`${cName}\`:`
    }
}

function buildLangSection(readme) {
    let text = []

    for (const langCode in readme.langs) {
        const idiom = readme.langs[langCode]

        text.push('**' + idiom.langName + '**')
        text.push(i18n[langCode].automata(readme.title))
        text.push(`![${idiom.langName}](${idiom.image})`)
        text.push(i18n[langCode].phrases(readme.title))

        text.push(idiom.phrases.map((item, index) => (index + 1) + '. ' + item).join('\n'))
    }

    return text.join('\n\n')
}

function list(type) {
    type = type === 'FOLDER' ? 0 : 1
    return (folder, aditionalFilter = () => true) => {
        return fs.readdirSync(folder).filter((file) => {
            if (type == null) return true

            const isFolder = fs.statSync(path.resolve(folder, file)).isDirectory()

            return type ^ isFolder
        }).filter(aditionalFilter)
    }
}

function svgToImage(svg, fileName) {
    return new Promise((res, rej) => {
        svg2img(svg, function(error, buffer) {
            if (error) return rej(error)

            fs.writeFileSync(fileName, buffer)

            return res(true)
        })
    })
}

class AutomataPaths {

    static  printAllPathsUtil(
        graph, u, d,
        isVisited, localPathList,
        results
    ) {
        if (u === d) {
            const sus = graph.successors(u.toString())
            if (sus?.length && sus.includes(d.toString())) {
                return results.push([...localPathList, u])
            } else {
                return results.push([...localPathList])
            }
        }
    
        isVisited[u] = true
    
        for (const t of graph.successors(u.toString())) {
            const i = parseInt(t, 10)
    
            if (!isVisited[i]) {
                localPathList.push(i)
                AutomataPaths.printAllPathsUtil(graph, i, d, isVisited, localPathList, results)
                localPathList.splice(localPathList.findIndex(a => a === i), 1)
            }
        }
    
        isVisited[u] = false
    }
    
    static allPathsToFinalStates(graph) {
        const finalStates = graph.nodes().filter((a) => graph.node(a).shape === 'doublecircle').map(a => parseInt(a, 10))
        const results = []
        const isVisited = new Array()
        const pathList = new Array()

        pathList.push(0)
    
        for (const finalState of finalStates) {
            AutomataPaths.printAllPathsUtil(graph, 0, finalState, isVisited, pathList, results)
        }
    
        const phrases = []
        for (const item of results) {
            const strItem = []
            for (let i = 0; i < item.length - 1; i++) {
                strItem.push(graph.edge(item[i].toString(), item[i + 1].toString()).label.trim())
            }
    
            phrases.push(strItem.join(' '))
        }
    
        return phrases
    }
}