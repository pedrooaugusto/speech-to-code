import Automata, { State } from '../../recognizer/automata'
import Modules from '../../modules-loader'
import * as graphlib from '../../graphlib'

beforeAll(async () => {
    await Modules.load()
})

// test.only('it can sort multiple transitions to the same state', async () => {
//     let graph: graphlib.Graph | null = Get('grammar', 'function_call') as graphlib.Graph

//     const phrase = 'execute a função chamada * bola string *'.split(' ')
//     const automata = new Automata(graph)
//     automata.setState({ id: '13', path: [], isFinal: false })

//     let s = automata.nextState(phrase, 4) as State
//     console.log(s)
// })

test('it is possible to go to the next state', async () => {
    let graph: graphlib.Graph | null = Get('grammar', 'variable_assignment') as graphlib.Graph

    const phrase = 'declare constante chamada'.split(' ')
    const automata = new Automata(graph)

    let s = automata.nextState(phrase, 0) as State
    automata.setState(s)
    expect(automata.currentState).toMatchObject({id: '1', path: [{ isNew: true }]})

    s = automata.nextState(phrase, 1) as State
    automata.setState(s)
    expect(automata.currentState).toMatchObject({id: '2', path: [{ isNew: true }, { memType: 1 }]})

    s = automata.nextState(phrase, 2) as State
    automata.setState(s)
    expect(automata.currentState).toMatchObject({id: '3', path: [{ isNew: true }, { memType: 1 }, 'chamada']})
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
    const graph: graphlib.Graph | null = Get('grammar', 'variable_assignment') as graphlib.Graph

    const automata = new Automata(graph)
    const phrase = 'declare uma constante chamada wtf'.split(' ')

    expect(automata.recognize(phrase)![1].path).toStrictEqual(
        [
            { isNew: true },
            { memType: 1 },
            'chamada',
            { varName: 'wtf' }
        ]
    )

    expect(new Automata(graph).recognize(['test', 'it'])).toBe(null)
})

test('it can recognize multiple automatas in one sentence', async () => {
    const graph: graphlib.Graph | null = Get('grammar', 'variable_assignment', 'en-US') as graphlib.Graph

    let automata = new Automata(graph)
    let phrase = 'variable called * big phrase * equals string hello doctor string'.split(' ')

    expect(automata.recognize(phrase)![1].path).toMatchObject([
        { memType: 0 },
        'called',
        {
            varName: {
                id: 'multi_word_token',
                path: ['*', { words: 'big' }, { words: 'phrase' }, '*']
            }
        },
        'equals',
        {
            expression: {
                id: 'expressions',
                path: [{
                    expression: {
                        id: 'string',
                        path: ['string', { string: 'hello' }, { string: 'doctor' }, 'string']
                    }
                }]
            }
        }
    ])

    automata = new Automata(graph)
    phrase = 'new variable answer equals the number 42'.split(' ')

    expect(automata.recognize(phrase)![1].path).toMatchObject([
        { isNew: true },
        { memType: 0 },
        { varName: 'answer' },
        'equals',
        {
            expression: {
                id: 'expressions',
                path: [{
                    expression: {
                        id: 'number',
                        path: ['number', { number: '42' }]
                    }
                }]
            }
        }
    ])
})

function Get(what: 'grammar' |  'module', id: string, lang: string = 'pt-BR') {
    if (what === 'grammar') return Modules.findAutomataById(id, lang)

    for (const mod of Modules.list) {
        if (mod.id === id) return mod
    }

    return null
}