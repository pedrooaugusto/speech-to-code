import JaroWinklerDistance from '../string-distance/jaro-winlker'
import { normalizeTransition } from './utils'

const Modules: any = {}

export type SerializedTransition = {
    text: string,
    type: 'STRING' | 'REGEX' | 'AUTOMATA'
    options: {
        graph: { id: string, lang: string },
        store?: string,
        normalizer?: string
    }
}

type TransitionAcceptsResult<T> = { index: number, consumed: ( ({ [key: string]: T }) | T | null)[] } | null

/**
 * This class represents a transition between two nodes in a automata.
 * A transition could be a simple string transition, a regex transition
 * or a automata transition.
 */
export abstract class Transition<T> {
    constructor(protected transition: SerializedTransition) { this.transition = transition }
    abstract accepts(inputString: string[], index?: number): TransitionAcceptsResult<T>
}

export class Transitions {
    private transitions: Transition<string | AutomataTransitionType>[]
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

class StringTransition extends Transition<string> {

    accepts(inputString: string[], index = 0) {
        const word = inputString[index]

        if (word === 'λ') return { index: index, consumed: [null] }

        const { text } = this.transition

        if (StringTransition.compareStrings(word, text)) {
            const { store } = this.transition.options
            const path = store ? { [store]: word } : word

            return { index: index + 1, consumed: [path] }
        }

        return null
    }

    static compareStrings(word: string, word2: string) {
        if (word.toLocaleLowerCase() === word2.toLocaleLowerCase()) return true

        return JaroWinklerDistance(word, word2) > 0.835
    }
}

class RegexTransition extends Transition<string> {

    accepts(inputString: string[], index = 0) {
        const word = inputString[index]

        const { text } = this.transition
        const template = Modules.getInstance().context.templates[text.trim()]
        const match = new RegExp(template.value).exec(word)

        if (match != null) {
            const { store } = this.transition.options
            const path = store ? { [store]: match[1] } : match[1]

            return { index: index + 1, consumed: [path] }
        }

        return null
    }
}

type AutomataTransitionType = {id: string, impl: string, path: any[]}

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
            const graph = result[0].graph()
            const automata = {
                id: this.automataId,
                impl: graph.impl,
                path: result[1].path
            }

            const path = store ? { [store]: automata } : automata

            return { index: result[2], consumed: [path] }
        }

        return null
    }
}
