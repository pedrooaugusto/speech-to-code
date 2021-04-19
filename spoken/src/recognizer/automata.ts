import * as graphlib from 'graphlib'
import { Transitions } from './transition' 
import { sortSucessors } from './utils'


const Modules: any = {}

type State = {
    id: string,
    isFinal: boolean,
    path: (null | string | { [key: string]: unknown })[]
}

export default class Automata {
    currentState: State = {
        id: '0',
        isFinal: false,
        path: []
    }

    graph: graphlib.Graph

    constructor(graph: graphlib.Graph, lang: string) {
        if (typeof graph === 'string') {
            graph = Modules.getInstance().findAutomataById(graph, lang)
        }

        this.graph = graph
    }

    recognize(inputString: string[], index = 0) {
        while(index < inputString.length) {
            const state = this.nextState(inputString, index)

            if (state == null) break

            index = state.index

            this.setState(state)
        }
        
        if (this.currentState.isFinal) return [this.graph, this.currentState, index]

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