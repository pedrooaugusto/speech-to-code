import * as graphlib from './graphlib'
import Modules from './modules-loader'
import PhraseRecognizer from './recognizer'
import LOG from './logger'

class Spoken {
    async init() {
        await Modules.load()
    }

    get modules() {
        return Modules.list
    }

    get context() {
        return Modules.context
    }

    public recognizePhrase(phrase: string, lang: string): (MatchedCommandWrapper[] | null) {
        if (!Modules?.list?.length) throw new Error('Grammar is not loaded')

        LOG.info('Looking for a match for: ', '"' + phrase + '"')

        const result = PhraseRecognizer.recognize(phrase, lang)

        if (result == null) return null

        LOG.info('Match found for:', '"' + phrase + '"', "ID:", result[0].graph().id, "Args:", result[1].path)

        const [graph, state] = result

        const command = [new MatchedCommandWrapper(graph, state.path)]

        return command
    }

    public findById(id: string, lang: string): (MatchedCommandWrapper | null) {
        if (!Modules?.list?.length) throw new Error('Grammar is not loaded')

        const result = Modules.findAutomataById(id, lang)

        if (result == null) return null

        return new MatchedCommandWrapper(result)
    }

}

class MatchedCommandWrapper {
    id: string
    label: string
    lang: string
    langName: string
    title: string
    desc: string
    path: any[]
    args: Record<string, string | number>
    impl: string

    constructor(graph: graphlib.Graph, path: any[] = []) {
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

export default new Spoken()
