const { listArchives } = require('../build-utils')
const path = require('path')
const fs = require('fs')
const dot = require('graphlib-dot')

class Node {
    constructor (name) {
        this.name = name;
        this.examples = {
            'pt-BR': [],
            'en-US': []
        };
    }

    parseExamples(str, lang) {
        const list = str.split('\n').map(a => a.trim().replace(',', '')).filter(Boolean)

        for (const phrase of list) {
            const dependencies = phrase.match(/\[(.*?)\]/gi) || []

            this.examples[lang].push({
                originalPhrase: phrase,
                phrase: null,
                dependencies: (dependencies.map(a => a.replace(/\[|\]/gi, '')))
            })
        }
    }

    getCompletedExamples(lang) {
        return this.examples[lang].filter(a => a.phrase != null)
    }

    getRandomCompletedExample(lang) {
        const examples = this.getCompletedExamples(lang)

        return examples[Math.floor(Math.random() * examples.length)].phrase
    }

    completeExamples(nodes, lang) {
        for (const example of this.examples[lang]) {
            if (example.phrase != null) continue

            example.phrase = example.originalPhrase

            for (const dependency of example.dependencies) {
                nodes[dependency].completeExamples(nodes, lang)

                const fill = nodes[dependency].getRandomCompletedExample(lang)

                example.phrase = example.phrase.replace(new RegExp('\\[' + dependency + '\\]'), fill)
            }
        }
    }
}

exports.getExamples = function getExamples() {
    const nodes = {}

    const root = path.resolve(__dirname, '..', '..', 'modules', 'typescript')
    const commands = listArchives('FOLDER')(root)

    for (const command of commands) {
        const node = new Node()

        for (const lang of ['en-US', 'pt-BR']) {
            const automataPath = path.resolve(root, command, 'phrase_' + lang + '.dot')

            const automata = dot.read(fs.readFileSync(automataPath, 'utf-8')).graph()
    
            node.name = automata.id
    
            node.parseExamples(automata.examples, lang)
        }

        nodes[node.name] = node
    }

    for (const nodeName in nodes) {
        const node = nodes[nodeName]

        node.completeExamples(nodes, 'en-US')
        node.completeExamples(nodes, 'pt-BR')
    }

    return nodes
}
