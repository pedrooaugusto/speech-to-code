const path = require('path')
const fs = require('fs')
const svg2img = require('svg2img')
const { graphviz } = require('@hpcc-js/wasm')
const ModulesInfo = require('./modules/info')

exports.allRecognizablePhrases = function allRecognizablePhrases(graph) {
    const finalStates = graph.nodes().filter((a) => graph.node(a).shape === 'doublecircle').map(a => parseInt(a, 10))
    const results = []
    const isVisited = new Array()
    const pathList = new Array()
    const sanitizeTransitionString = (str) => str.trim().replace(/\(/, '').replace(/\)$/, '').split(/, |,/)

    pathList.push(0)

    for (const finalState of finalStates) allPaths(graph, 0, finalState, isVisited, pathList, results)

    const phrases = []
    for (const item of results) {
        const tmp = []

        for (let i = 0; i < item.length - 1; i++) {
            const a = item[i].toString()
            const b = item[i + 1].toString()

            tmp.push(sanitizeTransitionString(graph.edge(a, b).label))
        }

        // @ts-ignore
        phrases.push(fillTemplates(tmp, graph.graph().lang).join(' '))
    }

    return phrases
}

exports.listArchives = function listArchives(filter) {
    const type = filter === 'FOLDER' ? 0 : 1

    return (folder, aditionalFilter = () => true) => {
        return fs.readdirSync(folder).filter((file) => {
            if (type == null) return true

            const isFolder = fs.statSync(path.resolve(folder, file)).isDirectory()

            // @ts-ignore
            return type ^ isFolder
        }).filter(aditionalFilter)
    }
}

exports.automataToImage = async function automataToImage(automataPath, fileName) {
    const fileContent = fs.readFileSync(automataPath, 'utf-8')
    const svg = await graphviz.layout(fileContent, 'svg', 'dot')

    return new Promise((res, rej) => {
        svg2img(svg, function(error, buffer) {
            if (error) return rej(error)

            fs.writeFileSync(fileName, buffer)

            return res(true)
        })
    })
}

function allPaths(
    graph,
    u,
    d,
    isVisited,
    localPathList,
    results
) {

    if (u === d) {
        const successors = graph.successors(u.toString())

        if (successors?.length && successors.includes(d.toString())) return results.push([...localPathList, u])
        else return results.push([...localPathList])
    }

    isVisited[u] = true

    for (const t of graph.successors(u.toString())) {
        const i = parseInt(t, 10)

        if (!isVisited[i]) {
            localPathList.push(i)
            allPaths(graph, i, d, isVisited, localPathList, results)
            localPathList.splice(localPathList.findIndex(a => a === i), 1)
        }
    }

    isVisited[u] = false
}

function fillTemplates(choices, lang) {
    return choices.map(item => {
        let choice = item

        if (choice.length > 1) choice = choice[Math.floor(Math.random()*choice.length)]
        else choice = choice[0]

        if (choice.startsWith('{') && choice.endsWith('}')) {
            const k = ModulesInfo.templates[choice].examples[lang]

            return k[Math.floor(Math.random() * k.length)]
        } else if (choice === 'λ') {
            return undefined
        }

        return choice
    }).filter(a => a != null)
}
