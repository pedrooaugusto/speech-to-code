const graphlib = require('./graphlib/graphlib')
const JaroWinklerDistance = require('./string-distance/jaro-winlker')

class Modules {
    async load() {
        const fs = require('fs')
        const path = require('path')

        const json = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'dist', 'grammar.json'), 'utf-8'))

        for (const key in json.normalizers) {
            json.normalizers[key] = eval(`(() => { return ${json.normalizers[key]} })()`)
        }

        this.spoken = json
    }

    static getInstance() {
        if (this.instance == null) {
            this.instance = new Modules()
        }

        return this.instance
    }

    findAutomataById(id, lang) {
        console.log(id, lang)
        for (const mod of this.modules) {
            for (const graphJson of mod.grammar[lang]) {
                if (graphJson.value.id === id) return graphlib.json.read(graphJson)
            }
        }

        return null
    }

    get modules() {
        return this.spoken.modules
    }

    get list() {
        return this.spoken.modules
    }

    get context() {
        return {
            templates: this.spoken.templates,
            normalizers: this.spoken.normalizers,
            stopWords: this.spoken.stopWords
        }
    }
}

class Recognizer {
    constructor() {
        this.modules = Modules.getInstance()
    }

    async init() {
        await this.modules.load()
    }

    recognize(phrase, language) {
        for (const mod of this.modules.list) {
            for (const graphJson of mod.grammar[language]) {
                const graph = graphlib.json.read(graphJson)
                const result = new Automata(graph, language).recognize(phrase.split(' '))

                if (result != null) return result
            }
        }

        return null
    }
}

class Automata {
    currentState = {
        id: '0',
        isFinal: false,
        path: []
    }

    graph = {}

    constructor(graph, language) {
        if (typeof graph === 'string') {
            graph = Modules.getInstance().findAutomataById(graph, language)
        }

        this.graph = graph
    }

    recognize(inputString, index = 0) {
        while(index < inputString.length) {
            const state = this.nextState(inputString, index)

            if (state == null) break

            index = state.index

            this.setState(state)
        }
        
        if (this.currentState.isFinal) return [this.graph, this.currentState, index]

        return null
    }

    setState(state) {
        this.currentState = {
            id: state.id,
            isFinal: this.graph.node(state.id).shape === 'doublecircle',
            path: [...this.currentState.path, ...state.path]
        }
    }

    nextState(inputString, index = 0) {
        for (const sucessor of this.getSucessors()) {
            const transition = this.getTransitions(sucessor)

            const result = transition.accepts(inputString, index)

            if (result != null) {
                return { id: sucessor, index: result.index, path: result.path }                
            }
        }

        return null
    }

    getSucessors() {
        const { id: current } = this.currentState

        return this.graph.successors(current).sort(sortSucessors(current, this.graph))
    }

    getTransitions(to) {
        const graph = { id: this.graph.graph().id, lang: this.graph.graph().lang }
        const transition = { ...this.graph.edge(this.currentState.id, to), graph }

        return new Transition(transition)
    }
}

class Transition {
    constructor(rawTransition) {
        this.rawTransition = rawTransition
        this.transitions = normalizeTransition(rawTransition)
    }

    accepts(inputString, index = 0) {
        for (const transition of this.transitions) {
            const result = transition.accepts(inputString, index)

            if (result != null) {
                return result
            }
        }

        return null
    }
}

class StringTransition {
    constructor(transition) {
        this.transition = transition
    }

    accepts(inputString, index = 0) {
        const word = inputString[index]

        if (word === 'λ') return { index: index, path: [null] }

        const { text } = this.transition

        if (StringTransition.compareStrings(word, text)) {
            const { store } = this.transition.options
            const path = store ? { [store]: word } : word

            return { index: index + 1, path: [path] }
        }

        return null
    }

    static compareStrings(word, condition) {
        if (word.toLocaleLowerCase() === condition.toLocaleLowerCase()) return true

        return JaroWinklerDistance(word, condition) > 0.835
    }
}

class RegexTransition {
    constructor(transition) {
        this.transition = transition
    }

    accepts(inputString, index = 0) {
        const word = inputString[index]

        const { text } = this.transition
        const template = Modules.getInstance().context.templates[text.trim()]
        const match = new RegExp(template.value).exec(word)

        if (match != null) {
            const { store } = this.transition.options
            const path = store ? { [store]: match[1] } : match[1]

            return { index: index + 1, path: [path] }
        }

        return null
    }
}

class AutomataTransition {
    constructor(transition) {
        this.transition = transition
        this.automataId = transition.text.replace(/\[(.*)\]/gi, '$1')
    }

    accepts(inputString, index = 0) {
        const { store, graph } = this.transition.options
        const result = new Automata(this.automataId, graph.lang).recognize(inputString, index)

        if (result !== null) {
            const graph = result[0].graph()
            const automata = {
                id: this.automataId,
                impl: graph.impl,
                path: result[1].path
            }

            const path = store ? { [store]: automata } : automata

            return { index: result[2], path: [path] }
        }

        return null
    }
}

function normalizeTransition(rawTransition) {
    const options = parseTransitionLabel(rawTransition.label)

    return options.map(item => ({
        options: { ...rawTransition },
        type: getTransitionType(item),
        text: item
    })).map(buildTransition)
}

function buildTransition(transition) {
    if (transition.type === 'STRING') return new StringTransition(transition)
    if (transition.type === 'REGEX') return new RegexTransition(transition)
    if (transition.type === 'AUTOMATA') return new AutomataTransition(transition)

    return null
}

function parseTransitionLabel(str) {
    return str.trim().replace(/\(/, '').replace(/\)$/, '').split(/, |,/)
}

function getTransitionType(str) {
    if (/\{(.*)\}/.test(str)) return 'REGEX'
    if (/\[(.*)\]/.test(str)) return 'AUTOMATA'

    return 'STRING'
}

function sortSucessors(current, graph) {

    function priorityOf(transition) {
        if (transition.includes('λ')) return 6
        if (transition.includes('[')) return 4
        if (transition.includes('{')) return 2

        return 1
    }

    return (a, b) => {
        const pa = priorityOf(graph.edge(current, a).label)
        const pb = priorityOf(graph.edge(current, b).label)

        if (pa < pb) return -1
        else if (pa > pb) return 1

        return 0
    }
}

async function main() {
    try {
        const recognizer = new Recognizer()
        await recognizer.init()

        const r = recognizer.recognize('result number 19984 constant name', 'en-US')

        console.log(r[1].path[1])
    } catch(err) {
        console.log(err)
    }
}

main()