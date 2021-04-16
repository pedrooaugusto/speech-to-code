import * as graphlib from './graphlib'
import JaroWinklerDistance from './string-distance/jaro-winlker'
import LOG from './logger'

export type Context = {
	normalizers: Record<string, (((lang: string) => Function) | string)>,
    templates: Record<string, {
		value: string,
		examples: Record<string, string[]>
	}>
}

export default class {
    grammar: GraphJsonView[]
    context: Context

    constructor(grammar: GraphJsonView[], context: Context) {
        this.grammar = grammar
        this.context = context
    }

    private phraseBelongsToGrammar(phrase: string, grammar: GraphJsonView): [graphlib.Graph, State] | null {
        const words = phrase.split(' ')
        const graph: graphlib.Graph = graphlib.json.read(grammar)
        const automata = new Automata(graph, this.context)

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
                LOG.info('Match found for:', '"' + phrase + '"', "ID:", match[0].graph().id, "Args:", match[1].args)
                break
            }
        }

        return result
    }
}

type Args = (string | Record<string, string | number> | null)[]
export type State = { isFinal: boolean; id: string; args: Args }

export class Automata {
    graph: graphlib.Graph
    currentState: State
    transitionStringNormalizer: TransitionStringNormalizer
    context: Context

    constructor(graph: graphlib.Graph, context: Context) {
        this.graph = graph
        this.currentState = { isFinal: false, id: "0", args: [] }
        this.context = context
        this.transitionStringNormalizer = new TransitionStringNormalizer(context)
    }

    private sortSucessors = (current: string) => (a: string, b: string) => {
        const aC = (this.graph.edge(current, a).label as string).includes('λ')
        const bC = (this.graph.edge(current, b).label as string).includes('λ')

        if (!aC && bC) return -1
        else if(aC && !bC) return 1

        return 0
    }

    nextState(word: string) {
        const current = this.currentState.id
        const successors = (this.graph.successors(current) as string[]).sort(this.sortSucessors(current))

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

    transitionIsPossible(
        word: string,
        transition: Record<string, string | undefined>
    ): undefined | null | string | Record<string, string | number> {

        const conditions = this.transitionStringNormalizer.normalizeTransition(transition as Record<string, string>)

        for (let i = 0; i < conditions.length; i++) {
            const condition = conditions[i]

            if (typeof condition === 'string') {
                if (condition === 'λ') return null

                if (Automata.compareStrings(word, condition))
                    return transition.store ? { [transition.store]: i } : word

            } else {
                const match = condition.exec(word)

                if (match != null) {
                    let term = match[1]

                    if (transition.normalizer) {
                        const lang = this.graph.graph().lang
                        const fn = this.context.normalizers[transition.normalizer] as ((str: string) => Function)
                        const t = fn ? fn(lang)(term, Automata.compareStrings) : null

                        if (t == null) return undefined

                        term = t
                    }

                    return transition.store ? { [transition.store]: term } : term
                }
            }
        }

        return undefined
    }

    static compareStrings(word: string, condition: string) {
        if (word.toLocaleLowerCase() === condition.toLocaleLowerCase()) return true

        return JaroWinklerDistance(word, condition) > 0.835
    }

    setState(state: State, word?: string | null) {
        this.currentState = state
    }

}

class TransitionStringNormalizer {
    context: Context

    constructor(context: Context) {
        this.context = context
    }

    sanitizeTransitionString(str: string): string[] {
        return str.trim().replace(/\(/, '').replace(/\)$/, '').split(/, |,/)
    }

    normalizeTransition(edgeAttr: Record<string, string>): (string | RegExp)[] {
        const temp = this.sanitizeTransitionString(edgeAttr.label)

        return temp.map((item) => this.buildTemplates(item))
    }

    buildTemplates(str: string) {
        if (str.startsWith('{') && str.endsWith('}')) {
            return new RegExp((this.context.templates)[str.trim()].value)
        }

        return str
    }
}
