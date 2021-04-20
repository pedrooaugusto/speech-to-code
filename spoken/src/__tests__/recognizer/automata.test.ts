import Automata, { State } from '../../recognizer/automata'
import Modules, { Context } from '../../modules-loader'
import * as graphlib from '../../graphlib'

beforeAll(async () => {
    await Modules.load()
})

test('it is possible to go to the next state', async () => {
    let graph: graphlib.Graph | null = Get('grammar', 'declare_variable') as graphlib.Graph

    const phrase = 'declare constante chamada'.split(' ')
    const automata = new Automata(graph)

    let s = automata.nextState(phrase, 0) as State
    automata.setState(s)
    expect(automata.currentState).toMatchObject({id: '1', path: ['declare']})

    s = automata.nextState(phrase, 1) as State
    automata.setState(s)
    expect(automata.currentState).toMatchObject({id: '3', path: ['declare', { memType: 0 }]})

    s = automata.nextState(phrase, 2) as State
    automata.setState(s)
    expect(automata.currentState).toMatchObject({id: '5', path: ['declare', { memType: 0 }, 'chamada']})
})

test('it is able to exaust every transition before making the empty one', async() => {
    let graph: graphlib.Graph | null = Get('grammar', 'write', 'en-US') as graphlib.Graph

    const p = 'write it down who are'.split(' ')
    const automata = new Automata(graph)

    let s = automata.nextState(p, 0) as State
    automata.setState(s)
    expect(automata.currentState).toMatchObject({ path: ['write'] })

    s = automata.nextState(p, 1) as State
    automata.setState(s)
    expect(automata.currentState).toMatchObject({path: ['write', 'it'], isFinal: false })

    s = automata.nextState(p, 2) as State
    automata.setState(s)
    expect(automata.currentState).toMatchObject({ path: ['write', 'it', 'down'], isFinal: true})

    s = automata.nextState(p, 3) as State
    automata.setState(s)
    expect(automata.currentState).toMatchObject({ path: ['write', 'it', 'down', { text: 'who' }], isFinal: true})

    s = automata.nextState(p, 4) as State
    automata.setState(s)
    expect(automata.currentState).toMatchObject({
        path: [
            'write',
            'it',
            'down',
            { text: 'who' },
            { text: 'are' }
        ],
        isFinal: true
    })
})

test('it can tell if a phrase belongs to an automata', async () => {
    const graph: graphlib.Graph | null = Get('grammar', 'declare_variable') as graphlib.Graph

    const automata = new Automata(graph)
    const phrase = 'declare uma constante chamada bola'.split(' ')

    expect(automata.recognize(phrase)![1].path).toStrictEqual(['declare', {memType: 0}, 'chamada', {name: 'bola'}])

    expect(new Automata(graph).recognize(['test', 'it'])).toBe(null)
})

test('it can recognize multiple automatas in one sentence', async () => {
    const graph: graphlib.Graph | null = Get('grammar', 'new_variable', 'en-US') as graphlib.Graph

    let automata = new Automata(graph)
    let phrase = 'put the result of the string hello doctor string in a variable called phrase'.split(' ')

    expect(automata.recognize(phrase)![1].path).toMatchObject([
        'put',
        'result',
        {
            expression: {
                id: 'string',
                path: ['string', { string: 'hello' }, { string: 'doctor' }, 'string']
            }
        },
        'variable',
        'called',
        { varName: 'phrase' }
    ])

    automata = new Automata(graph)
    phrase = 'put the result of the number 42 in a new variable called answer'.split(' ')

    expect(automata.recognize(phrase)![1].path).toMatchObject([
        'put',
        'result',
        {
            expression: {
                id: 'number',
                path: ['number', { number: '42' }]
            }
        },
        'new',
        'variable',
        'called',
        { varName: 'answer' }
    ])
})

function Get(what: 'grammar' |  'module', id: string, lang: string = 'pt-BR') {
    if (what === 'grammar') return Modules.findAutomataById(id, lang)

    for (const mod of Modules.list) {
        if (mod.id === id) return mod
    }

    return null
}