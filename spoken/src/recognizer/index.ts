import Modules from '../modules-loader'
import Automata from './automata'
import * as graphlib from '../graphlib'

class Recognizer {

    recognize(phrase: string, lang: string) {
        const words = phrase.split(' ')

        for (const mod of Modules.list) {
            for (const graphJson of mod.grammar[lang]) {
                const graph = graphlib.json.read(graphJson)
                const result = new Automata(graph, lang).recognize(words)

                if (result != null) return result
            }
        }

        return null
    }
}

export default new Recognizer()