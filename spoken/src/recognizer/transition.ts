import compareStrings from '../string-distance'
import { normalizeTransition } from './utils'
import Automata from './automata'
import Modules from '../modules-loader'

export type SerializedTransition = {
    text: string,
    type: 'STRING' | 'REGEX' | 'AUTOMATA'
    options: {
        graph: { id: string, lang: string },
        choiceIndex: number,
        store?: string,
        normalizer?: string,
        extraArgs?: string,
        disableSpellcheck?: string
    }
}

type TransitionAcceptsResult<T> = { index: number, consumed: (({ [key: string]: T }) | T)[] } | null

/**
 * This class represents a transition between two nodes in a automata.
 * A transition could be a simple string transition, a regex transition
 * or a automata transition.
 */
export abstract class Transition<T > {
    constructor(protected transition: SerializedTransition) { this.transition = transition }
    abstract accepts(inputString: string[], index?: number): TransitionAcceptsResult<T>

    protected normalize(text: string, normalizer?: string) {
        const lang = this.transition.options.graph.lang

        return Modules.normalizers(normalizer, lang)(text, compareStrings)
    }
}

export type TransitionsTypes = StringTransitionType | RegexTransitionType | AutomataTransitionType

export default class Transitions {
    private transitions: Transition<TransitionsTypes>[]
    constructor(rawTransition: any) {
        this.transitions = normalizeTransition(rawTransition).map(this.buildTransition)
    }

    accepts(inputString: string[], index = 0) {
        for (const transition of this.transitions) {
            const result = transition.accepts(inputString, index)

            if (result != null) {
                return result
            }
        }

        return null
    }
    
    buildTransition(transition: SerializedTransition) {
        if (transition.type === 'STRING') return new StringTransition(transition)
        if (transition.type === 'REGEX') return new RegexTransition(transition)
        if (transition.type === 'AUTOMATA') return new AutomataTransition(transition)

        throw new Error('Unknown transition type')
    }
}

/**
 * A simple string transition in the format of: (Option, Option, ...)
 * Where each 'Option' is a valid accepted input transition;
 * If the strings are equal* the transition is made.
 */
type StringTransitionType = string | number | null
class StringTransition extends Transition<StringTransitionType> {

    accepts(inputString: string[], index = 0) {
        const word = inputString[index]

        const { text } = this.transition

        if (text === 'λ') return { index: index, consumed: [null] }

        if (compareStrings(word, text, this.transition.options.disableSpellcheck)) {
            const { store, choiceIndex, normalizer } = this.transition.options
            const value = normalizer ? this.normalize(word, normalizer) : choiceIndex

            // Normalizer has total control over this ?
            if (value == null) return null

            const path = store ? { [store]: value } : word

            return { index: index + 1, consumed: [path] }
        }

        return null
    }
}

/**
 * A regex transition in the format of: ({Option}, {Option}, ...)
 * Where each '{Option}' is a regex, if the regex matches the transition
 * string the transition is made.
 */
type RegexTransitionType = string
class RegexTransition extends Transition<RegexTransitionType> {

    accepts(inputString: string[], index = 0) {
        const word = inputString[index]

        const { text } = this.transition
        const template = Modules.templates(text.trim())
        const match = new RegExp(template.value).exec(word)

        if (match != null) {
            const { store, normalizer = template.defaultNormalizer } = this.transition.options
            const value = this.normalize(word, normalizer)

            // Normalizer has total control over this ?
            if (value == null) return null

            const path = store ? { [store]: value } : value

            return { index: index + 1, consumed: [path] }
        }

        return null
    }
}

/**
 * A automata transition in the format of: ([Option], [Option], ...)
 * Where each '[Option]' is a different automata that should be used
 * to test the transition string, if that automata accepts the string
 * the transition is made.
 */
type AutomataTransitionType = { id: string, impl: string, path: any[] }
class AutomataTransition extends Transition<AutomataTransitionType> {
    private automataId: string

    constructor(transition: SerializedTransition) {
        super(transition)

        this.automataId = transition.text.replace(/\[(.*)\]/gi, '$1')
    }

    accepts(inputString: string[], index = 0) {
        const { store, graph } = this.transition.options
        const result = new Automata(this.automataId, graph.lang).recognize(inputString, index)

        if (result !== null) {
            const graphInfo = result[0].graph() as unknown as Record<string, string>
            const automata = {
                id: this.automataId,
                lang: graph.lang,
                impl: graphInfo.impl,
                path: result[1].path,
                extraArgs: this.transition.options.extraArgs
            }

            const path = store ? { [store]: automata } : automata

            return { index: result[2], consumed: [path] }
        }

        return null
    }
}
