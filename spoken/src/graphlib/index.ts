import GraphlibType from 'graphlib'
const graphlib = require('./graphlib')

export type Graph = {
    graph: () => Record<string, string>
} & GraphlibType.Graph

export const Graph: Graph = graphlib.Graph

export const alg = graphlib.alg
export const json = graphlib.json