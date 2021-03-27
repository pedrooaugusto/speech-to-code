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
        const mPath = path.resolve(__dirname, module)
        const commands = list('FOLDER')(mPath)

        for (const command of commands) {
            const cPath = path.resolve(mPath, command)
            const dotFiles = list('FILES')(cPath).filter(a => a.startsWith('phrase_') && a.endsWith('.dot'))
            const readme = {id: command, langs: {}}
            let graph = null

            for (const phrase of dotFiles) {
                try {
                    const pPath = path.resolve(cPath, phrase)
                    const fileContent = fs.readFileSync(pPath, 'utf-8')
                    const svg = await graphviz.layout(fileContent, "svg", "dot")
                    await svgToImage(svg, pPath.replace(/.dot/gi, '.png'))

                    graph = dot.read(fileContent).graph()

                    readme.langs[graph.langName] = phrase.replace(/.dot/gi, '.png')

                    if (graph.lang == 'en-US') {
                        readme.title = graph.title
                        readme.desc = graph.desc
                    }

                    graph = null
                  } catch (err) {
                    console.log(err)
                }
            }

            const implFile = path.resolve(cPath, list('FILES')(cPath).find(a => a === 'impl.ts'))

            readme.code = fs.readFileSync(implFile, 'utf-8')

            const m = "" +
                      "## " + readme.title + "\n\n" +
                      "" + readme.desc + "\n\n" +
                      "**Phrases:**\n\n" +
                      "" + Object.entries(readme.langs)
                            .map(
                                ([k, v]) => "* " + k + "\n\t" + "![" + k + "](" + v + ")\n" // *A\n\t ![A](urlA)
                            )
                            .join("") + "\n\n" +
                      "**Implementation:**\n\n" +
                      "```typescript\n" +
                      "" + readme.code.substr(0, 300) + "\n(...) see more\n" +
                      "```"

            fs.writeFileSync(path.resolve(cPath, 'README.md'), m)
        }
    }
}

function list(type) {
    type = type === 'FOLDER' ? 0 : 1
    return (folder) => {
        return fs.readdirSync(folder).filter((file) => {
            if (type == null) return true

            const isFolder = fs.statSync(path.resolve(folder, file)).isDirectory()

            return type ^ isFolder
        })
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
