import * as graphlib from './graphlib'
import Modules, { SpokenModule } from './modules-loader'
import SpokenCommand from './spoken-command'
import PhraseRecognizer from './recognizer'
import LOG from './logger'

class Spoken {
    async init(val?: any) {
        await Modules.load(val)
    }

    get modules() {
        return Modules.list
    }

    get context() {
        return Modules.context
    }

    public recognizePhrase(phrase: string, lang: string): (SpokenCommand | null) {
        if (!Modules?.list?.length) throw new Error('Grammar is not loaded')

        LOG.info('Looking for a match for: ', '"' + phrase + '"')

        const result = PhraseRecognizer.recognize(phrase, lang)

        if (result == null) return null

        LOG.info('Match found for:', '"' + phrase + '"', "ID:", result[0].graph().id, "Path:", result[1].path)

        const [graph, state] = result

        return new SpokenCommand(graph.graph(), state.path)
    }

    public findById(id: string, lang: string): (SpokenCommand | null) {
        if (!Modules?.list?.length) throw new Error('Grammar is not loaded')

        const result = Modules.findAutomataById(id, lang)

        if (result == null) return null

        return new SpokenCommand(result.graph())
    }

}

export default new Spoken()

export { SpokenCommand }
export { SpokenModule }
export { Editor } from './modules/d'