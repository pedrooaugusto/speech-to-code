import * as graphlib from '../graphlib'
import Transitions, { TransitionsTypes } from './transition' 
import { sortSucessors } from './utils'
import StopWordsEngine from '../stop-words-engine'
import Modules from '../modules-loader'

export type State = {
    id: string,
    isFinal: boolean,
    path: (TransitionsTypes | { [key: string]: TransitionsTypes })[]
}

/**
 * This class represents a automata, it is responsible for telling
 * if a given automata recognizes or not a given input string.
 */
export default class Automata {
    currentState: State = {
        id: '0',
        isFinal: false,
        path: []
    }

    graph: graphlib.Graph
    stopWordsEngine: StopWordsEngine | null

    constructor(graph: graphlib.Graph | string, lang?: string) {
        if (typeof graph === 'string') {
            if (typeof lang === 'undefined') throw new Error('Language is not defined!')

            const graph2 = Modules.findAutomataById(graph, lang)

            if (graph2 == null) throw new Error('Automata ' + graph + ' not found!')

            graph = graph2
        }

        if (lang == null) lang = graph.graph().lang

        this.stopWordsEngine = graph.graph().disableStopWords !== 'true' 
            ? new StopWordsEngine(Modules.context.stopWords[lang].words, Modules.context.stopWords[lang].expressions)
            : null

        this.graph = graph
    }

    recognize(inputString: string[], index = 0): (null | [graphlib.Graph, State, number]) {
        while(index < inputString.length) {

            if (this.stopWordsEngine != null) {
                const skip = this.stopWordsEngine.skipStopWords(index, inputString)

                if (skip !== 0) {
                    index += skip
                    continue
                }
            }

            const state = this.nextState(inputString, index)

            if (state == null) break

            index = state.index

            this.setState(state)
        }

        if (this.currentState.isFinal) return [this.graph, this.currentState, index]

        // @ts-ignore
        // console.log(this.currentState.path[2]?.operation)
        // console.log(inputString[index])

        return null
    }

    setState(state: State) {
        this.currentState = {
            id: state.id,
            isFinal: this.graph.node(state.id).shape === 'doublecircle',
            path: [...this.currentState.path, ...state.path]
        }
    }

    nextState(inputString: string[], index = 0): (State & { index: number } | null) {
        for (const sucessor of this.getSucessors()) {
            const transition = this.getTransitions(sucessor)

            const result = transition.accepts(inputString, index)

            if (result != null) {
                return { id: sucessor, index: result.index, path: result.consumed, isFinal: false }                
            }
        }

        return null
    }

    getSucessors() {
        const { id: current } = this.currentState

        return (this.graph.successors(current) || []).sort(sortSucessors(current, this.graph))
    }

    getTransitions(to: string) {
        // @ts-ignore
        const graph = { id: this.graph.graph().id, lang: this.graph.graph().lang }
        const transition = { ...this.graph.edge(this.currentState.id, to), graph }

        return new Transitions(transition)
    }
}