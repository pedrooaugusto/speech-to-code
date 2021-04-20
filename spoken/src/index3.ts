import * as graphlib from './graphlib'
import Automata from './automata'
import LOG from './logger'

class Spoken {
    private spoken: SpokenModules = {
        modules: [],
        normalizers: {},
        templates: {},
        stopWords: {}
    }

    async init() {
        this.spoken = await loadModules()
    }

    private grammarIsLoaded() {
        if (!this.spoken?.modules?.length) throw new Error('Grammar is not loaded')
    }

    get modules() {
        return this.spoken.modules
    }

    get context() {
        return {
            templates: this.spoken.templates,
            normalizers: this.spoken.normalizers,
            stopWords: this.spoken.stopWords
        }
    }

    public recognizePhrase(phrase: string, lang: string): (MatchedCommandWrapper[] | null) {
        if (this.spoken == null) throw new Error('Grammar is not loaded')

        LOG.info('Looking for a match for: ', '"' + phrase + '"')
        for (const mod of this.spoken.modules) {
            const command = new Automata(mod.grammar[lang], this.context)
                .recoginize(phrase)
                .map(([graph, state]) => new MatchedCommandWrapper(graph, state.args))

            if (command.length) return command
        }

        return null
    }

    public findById(id: string, lang: string): (MatchedCommandWrapper | null) {
        if (this.spoken.modules.length == 0) throw new Error('Grammar is not loaded')

        for (const mod of this.spoken.modules) {
            for (const strCommand of mod.grammar[lang]) {
                // dont need to do that
                const graphObj: graphlib.Graph = graphlib.json.read(strCommand)

                if (graphObj.graph().id === id) return new MatchedCommandWrapper(graphObj)
            }
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
    path: (string | null | Record<string, string | number>)[]
    args: Record<string, string | number>
    impl: string

    constructor(graph: graphlib.Graph, path: (string | null | Record<string, string | number>)[] = []) {
        const graphInfo = graph.graph()
        this.id = graphInfo.id
        this.label = graphInfo.label
        this.lang = graphInfo.lang
        this.langName = graphInfo.langName
        this.title = graphInfo.title
        this.desc = graphInfo.desc
        this.impl = graphInfo.impl
        this.path = path
        this.args = (path
            .filter(a => a != null && typeof a !== 'string') as Record<string, string>[])
            .reduce((acc, el) => {
                const key = Object.keys(el)[0]

                if (acc[key]) acc[key] += ' ' + el[key]
                else acc[key] = el[key]

                return acc
            }, {})
    }
}

async function loadModules(): Promise<SpokenModules> {
    let json: SpokenModules = { modules: [], normalizers: {}, templates: {}, stopWords: {} }

    if (typeof require === 'function' && require('fs')?.readFileSync !== undefined) {
        const fs = require('fs')
        const path = require('path')

        json = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'grammar.json'), 'utf-8'))

    } else if(typeof fetch === 'function') {
        const r = await fetch('grammar.json')

        json = await r.json()
    }

    if (!json?.modules?.length) {
        console.error('Unable to load grammar!')

        return { modules: [], normalizers: {}, templates: {}, stopWords: {} }
    }

    for (const key in json.normalizers) {
        json.normalizers[key] = eval(`(() => { return ${json.normalizers[key]} })()`)
    }

    return json
}

export default new Spoken()
