import * as graphlib from 'graphlib'
import { SerializedTransition } from './transition'


type Trt = {
    label: string,
    store?: string,
    normalizer?: string,
    graph: {
        id: string,
        lang: string
    }
}

export function normalizeTransition(rawTransition: Trt): SerializedTransition[] {
    const options = parseTransitionLabel(rawTransition.label)

    return options.map((item, index) => ({
        options: { ...rawTransition, choiceIndex: index },
        type: getTransitionType(item),
        text: item
    }))
}

export function parseTransitionLabel(str: string) {
    return str.trim().replace(/\(/, '').replace(/\)$/, '').split(/, |,/)
}

export function getTransitionType(str: string) {
    if (/\{(.*)\}/.test(str)) return 'REGEX'
    if (/\[(.*)\]/.test(str)) return 'AUTOMATA'

    return 'STRING'
}

export function sortSucessors(current: string, graph: graphlib.Graph) {

    function priorityOf(transition: string) {
        if (transition.includes('λ')) return 6
        if (transition.includes('[')) return 4
        if (transition.includes('{')) return 2

        return 1
    }

    return (a: string, b: string) => {
        const pa = priorityOf(graph.edge(current, a).label)
        const pb = priorityOf(graph.edge(current, b).label)

        if (pa < pb) return -1
        else if (pa > pb) return 1

        return 0
    }
}