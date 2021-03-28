import * as graphlib from './graphlib'
import Automata from './automata'

class Spoken {
    public grammars: GrammarCollection | null = null

    async init() {
        this.grammars = await loadGrammar()
    }

    private grammarIsLoaded() {
        if (this.grammars == null) throw new Error('Grammar is not loaded')
    }

    public recognizePhrase(phrase: string, lang: string): (MatchedCommandWrapper[] | null) {
        if (this.grammars == null) throw new Error('Grammar is not loaded')

        const command = new Automata(this.grammars.langs[lang])
            .recoginize(phrase)
            .map(([graph, state]) => new MatchedCommandWrapper(graph, state.args))

        return command.length ? command : null
    }

    public findById(id: string, lang: string): (MatchedCommandWrapper | null) {
        if (this.grammars == null) throw new Error('Grammar is not loaded')

        for (const strCommand of this.grammars.langs[lang]) {
            const graphObj: graphlib.Graph = graphlib.json.read(strCommand)

            if (graphObj.graph().id === id) return new MatchedCommandWrapper(graphObj)
        }

        return null
    }
}

class MatchedCommandWrapper {
    id: string
    label: string
    lang: string
    langName: string
    title: string
    desc: string
    path: (string | null | Record<string, string>)[]
    args: Record<string, string>

    constructor(graph: graphlib.Graph, path: (string | null | Record<string, string>)[] = []) {
        const graphInfo = graph.graph()
        this.id = graphInfo.id
        this.label = graphInfo.label
        this.lang = graphInfo.lang
        this.langName = graphInfo.langName
        this.title = graphInfo.title
        this.desc = graphInfo.desc
        this.path = path
        this.args = (path
            .filter(a => typeof a !== 'string') as Record<string, string>[])
            .reduce((acc, el) => ({...acc, ...el}), {})
    }
}

async function loadGrammar() {
    if (typeof require === 'function' && require('fs') !== undefined) {
        const fs = require('fs')
        const path = require('path')

        return JSON.parse(fs.readFileSync(path.resolve(__dirname, 'grammar.json'), 'utf-8'))

    } else if(typeof fetch === 'function') {
        const r = await fetch('grammar.json')

        return await r.json()
    }

    console.error('Unable to load grammar!')

    return null
}

export default new Spoken()
