import Modules, { SpokenModule, GraphJsonView } from '../modules-loader'
import Automata from './automata'
import * as graphlib from '../graphlib'

class Recognizer {

    recognize(phrase: string, lang: string) {
        const words = phrase.split(' ')

        for (const mod of Modules.list) {
            for (const graphJson of this.graphs(mod, lang)) {
                const graph = graphlib.json.read(graphJson)
                const result = new Automata(graph, lang).recognize(words)

                if (result != null) return result
            }
        }

        return null
    }

    public graphs(mod: SpokenModule, lang: string) {
        if (!mod.grammar[lang]) return []

        return mod.grammar[lang]
            .filter(item => item.value.alias !== 'true')
            .sort(this.sortGraphs)
    }

    private sortGraphs(a: GraphJsonView, b: GraphJsonView) {
        const av = parseInt(a.value.priority || '1', 10)
        const bv = parseInt(b.value.priority || '1', 10)

        if (av === bv) return 0

        return av < bv ? -1 : 1
    }
}

export default new Recognizer()