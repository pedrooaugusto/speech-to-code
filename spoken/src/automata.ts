// @ts-ignore
const NumberRecognizers = require('./recognizers-text-number')
import * as graphlib from './graphlib'
import JaroWinklerDistance from './string-distance/jaro-winlker'
import LOG from './logger'

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

    constructor(graph: graphlib.Graph) {
        this.graph = graph
        this.currentState = { isFinal: false, id: "0", args: [] }
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

        const conditions = this.normalizeTransitionInput(transition as Record<string, string>)

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

                    if (transition.normalize === 'ordinalNumber') {
                        let t = Normalizer.ordinalNumber(this.graph.graph().lang, term)

                        if (t === null) return undefined

                        term = t.toString()
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

export class Normalizer {
    public static ordinalNumber(lang: string, text: string) {
        // @ts-ignore
        if (lang === 'pt-BR') {
            if (Automata.compareStrings(text, 'último')) return -1

            //@ts-ignore
            const result = NumberRecognizers.recognizeOrdinal(text, NumberRecognizers.Culture.Portuguese)

            if(result?.[0]?.resolution?.value) {
                return parseInt(result[0].resolution.value, 10)
            }

            return null
        }

        if (lang === 'en-US') {
            if (text === 'last') return -1

            //@ts-ignore
            const result = NumberRecognizers.recognizeOrdinal(text, NumberRecognizers.Culture.English)

            if(result?.[0]?.resolution?.value) {
                return parseInt(result[0].resolution.value, 10)
            }

            return null
        }

        throw new Error('Unsupported language!')
    }
}

export class AutomataPaths {

    private static  printAllPathsUtil(
        graph: graphlib.Graph, u: number, d: number,
        isVisited: boolean[], localPathList: number[],
        results: number[][]
    ): (void | number) {
        if (u === d) {
            const sus = graph.successors(u.toString()) as string[]
            if (sus?.length && sus.includes(d.toString())) {
                return results.push([...localPathList, u])
            } else {
                return results.push([...localPathList])
            }
        }
    
        isVisited[u] = true
    
        for (const t of graph.successors(u.toString()) as string[]) {
            const i = parseInt(t, 10)
    
            if (!isVisited[i]) {
                localPathList.push(i)
                AutomataPaths.printAllPathsUtil(graph, i, d, isVisited, localPathList, results)
                localPathList.splice(localPathList.findIndex(a => a === i), 1)
            }
        }
    
        isVisited[u] = false
    }
    
    public static allPathsToFinalStates(graph: graphlib.Graph) {
        const finalStates = graph.nodes().filter((a) => graph.node(a).shape === 'doublecircle').map(a => parseInt(a, 10))
        const results: number[][] = []
        const isVisited = new Array()
        const pathList = new Array<number>()
    
        pathList.push(0)
    
        for (const finalState of finalStates) {
            AutomataPaths.printAllPathsUtil(graph, 0, finalState, isVisited, pathList, results)
        }
    
        const phrases = []
        for (const item of results) {
            const strItem = []
            for (let i = 0; i < item.length - 1; i++) {
                strItem.push(graph.edge(item[i].toString(), item[i + 1].toString()).label.trim())
            }
    
            phrases.push(strItem.join(' '))
        }
    
        return phrases
    }
}