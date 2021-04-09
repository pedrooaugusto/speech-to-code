import Spoken from '../index'
import * as graphlib from '../graphlib'

beforeAll(async () => {
    await Spoken.init()
})

test('it can load the grammar', async () => {
    expect(Spoken.grammars).not.toBeNull()
})

test('it can generate the power set off all commands', async () => {
    const graph: graphlib.Graph = getGraph('declare_variable') as graphlib.Graph

    const finalStates = graph.nodes().filter(a => graph.node(a).shape === 'doublecircle')
    const paths = graphlib.alg.dijkstra(graph, '0')

    expect(mountTree(finalStates, paths, graph).length).not.toEqual(0)
})

test('it can search for a command given a id', async () => {
    const graph = Spoken.findById('declare_variable', 'pt-BR')
    expect(graph).not.toBe(null)
    expect((graph || {}).id).toBe('declare_variable')
})

test('it can search for a command given a phrase', async () => {
    let command = Spoken.recognizePhrase('declarar constante chamada bola', 'pt-BR')

    expect(command).toMatchObject([{
        id: 'declare_variable',
        args: {
            memType: 0,
            name: 'bola'
        }
    }])

    command = Spoken.recognizePhrase('THE', 'pt-BR')

    expect(command).toBeNull()
})

function mountTree(finalStates: string[], paths: Record<string, { distance: number, predecessor: string }>, graph: graphlib.Graph) {
    function trace(current: string, previous: string): string[] {
        if (previous === '0') return [graph.edge(previous, current).label]

        return trace(previous, paths[previous].predecessor).concat(graph.edge(previous, current).label)
    }

    return finalStates.map(item => trace(item, paths[item].predecessor))
}

function getGraph(id: string) {
    let graph: graphlib.Graph | null = null

    // @ts-ignore
    for (let item of Spoken.grammars.langs['pt-BR']) {
        graph = graphlib.json.read(item) as graphlib.Graph

        if (graph.graph().id === id) break
    }

    return graph
}
