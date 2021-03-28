import * as graphlib from './graphlib'
import JaroWinklerDistance from './string-distance/jaro-winlker'

export default class {
    grammar: GraphJsonView[]

    constructor(grammar: GraphJsonView[]) {
        this.grammar = grammar
    }

    private phraseBelongsToGrammar(phrase: string, grammar: GraphJsonView): [graphlib.Graph, State] | null {
        const words = phrase.split(' ')
        const graph: graphlib.Graph = graphlib.json.read(grammar)
        const automata = new Automata(graph)

        for (let i = 0; i < words.length; i++) {
            const w = words[i]
            const state = automata.nextState(w)

            if (state == null) break

            if (state.args[state.args.length - 1] === null) {
                automata.setState(state, null)
                i = i - 1 // dont consume it!
            } else {
                automata.setState(state, w)
            }
        }

        if (automata.currentState.isFinal) return [graph, automata.currentState]

        return null
    }

    recoginize(phrase: string): [graphlib.Graph, State][] {
        const result = []

        for (const commands of this.grammar) {
            const match = this.phraseBelongsToGrammar(phrase, commands)

            // TODO: Add support for nested commands
            if (match != null) {
                result.push(match)
                break
            }
        }

        return result
    }
}

type Args = (string | Record<string, string> | null)[]
export type State = { isFinal: boolean; id: string; args: Args }

export class Automata {
    graph: graphlib.Graph
    currentState: State

    constructor(graph: graphlib.Graph) {
        this.graph = graph
        this.currentState = { isFinal: false, id: "0", args: [] }
    }

    nextState(word: string) {
        const current = this.currentState.id
        const successors = this.graph.successors(current) as string[]

        for (const successor of successors) {
            const transitionAttr: Record<string, string> = this.graph.edge(current, successor)
            const result = this.transitionIsPossible(word, transitionAttr)

            if (result !== undefined) {
                const args = [...this.currentState.args, result]
                const isFinal = this.graph.node(successor).shape === 'doublecircle'

                return { id: successor, isFinal, args: args }
            }
        }

        return null
    }

    transitionIsPossible(word: string, transition: Record<string, string | undefined>): undefined | null | string | Record<string, string> {
        const conditions = this.normalizeTransitionInput(transition as Record<string, string>)

        for (const condition of conditions) {
            if (typeof condition === 'string') {
                if (condition === 'λ') return null

                if (this.compareStrings(word, condition))
                    return transition.store ? { [transition.store]: word } : word

            } else {
                const match = condition.exec(word)

                if (match != null)
                    return transition.store ? { [transition.store]: match[1] } : match[1]
            }
        }

        return undefined
    }

    compareStrings(word: string, condition: string) {
        if (word === condition) return true

        return JaroWinklerDistance(word, condition) > 0.835
    }

    setState(state: State, word?: string | null) {
        this.currentState = state
    }

    normalizeTransitionInput(edgeAttr: Record<string, string>): (string | RegExp)[] {
        const label = edgeAttr.label.trim().replace(/\(/, '').replace(/\)$/, '')

        return label.split(/, |,/).map(this.templateToRegex)
    }

    templateToRegex(str: string) {
        if (str.startsWith('{') && str.endsWith('}'))
            return new RegExp(
                str
                    .replace(/{any}/gi, '(.*)')
                    .replace(/{term}/gi, '(\\S+)')
                    .replace(/{numeral}/gi, '(\\d+)')
            )

        return str
    }

}