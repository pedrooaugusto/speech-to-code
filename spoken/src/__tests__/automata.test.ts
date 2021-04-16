import Recognizer, { Automata, State } from '../automata'
import * as graphlib from '../graphlib'
const fs = require('fs')
const path = require('path')

const modules: SpokenModule[] = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'grammar.json'), 'utf-8'))

test('it can sanitize a transition string', async () => {
    const graph: graphlib.Graph = Get('grammar', 'declare_variable') as graphlib.Graph

    const automata = new Automata(graph)

    const normalizer = (label: string) => automata.transitionStringNormalizer.normalizeTransition({ label })

    expect(normalizer('(the)')).toEqual(['the'])
    expect(normalizer('  (maybe)')).toEqual(['maybe'])
    expect(normalizer('(five, two)   ')).toEqual(['five', 'two'])
    expect(normalizer(' (of, λ)  ')).toEqual(['of', 'λ'])
    expect(normalizer(' ({term})  ')).toEqual([/(\S+)/])
    expect(normalizer(' ({any})  ')).toEqual([/(.*)/])
    expect(normalizer(' ({numeral})  ')).toEqual([/(\d+)/])
    expect(normalizer(' ({numeral}, hello)  ')).toEqual([/(\d+)/, 'hello'])
})

test('it is possible to make transitions', async () => {
    const graph: graphlib.Graph = Get('grammar', 'declare_variable') as graphlib.Graph

    const automata = new Automata(graph)
    const transitionIsPossible = (w: string, label: string, store?: string, normalize?: string) =>
        automata.transitionIsPossible(w, { label, store, normalize })

    expect(transitionIsPossible('the', '(the)')).toEqual('the')
    expect(transitionIsPossible('quick', '(quick, slow)')).toEqual('quick')
    expect(transitionIsPossible('slow', '(quick, slow)')).toEqual('slow')
    expect(transitionIsPossible('fuck', '(stopWord, λ)')).toEqual(null)
    expect(transitionIsPossible('42', '({numeral})')).toEqual('42')
    expect(transitionIsPossible('nop', '({numeral}, dont)')).toEqual(undefined)
    expect(transitionIsPossible('anything', '({term})')).toEqual('anything')
    expect(transitionIsPossible('money', '({term})', 'exchange')).toEqual({ exchange: 'money' })
    expect(transitionIsPossible('constant', '(variable, nothing, constant)', 'type')).toEqual({ type: 2 })
    expect(transitionIsPossible('segundo', '({term})', 'number', 'ordinalNumber')).toEqual({ number: '2' })
    expect(transitionIsPossible('último', '({term})', 'number', 'ordinalNumber')).toEqual({ number: '-1' })
    expect(transitionIsPossible('primeira', '({term})', 'number', 'ordinalNumber')).toEqual({ number: '1' })
    expect(transitionIsPossible('blba', '({term})', 'number', 'ordinalNumber')).toEqual(undefined)
})

test('it is possible to go to the next state', async () => {
    let graph: graphlib.Graph | null = Get('grammar', 'declare_variable') as graphlib.Graph

    if (graph == null) throw new Error('graph cannot be null')

    const automata = new Automata(graph)

    let s = automata.currentState
    expect(s = automata.nextState('declare') as State).toMatchObject({id: '1', args: ['declare']})
    automata.setState(s)
    expect(s = automata.nextState('uma') as State).toMatchObject({id: '2', args: ['declare', 'uma']})
    automata.setState(s)
    expect(automata.nextState('constante')).toMatchObject({id: '3', args: ['declare', 'uma', {memType: 0}]})
})

test('it is able to exaust every transition before making the empty one', async() => {
    let graph: graphlib.Graph | null = Get('grammar', 'write', 'en-US') as graphlib.Graph

    if (graph == null) throw new Error('graph cannot be null')

    const automata = new Automata(graph)

    let s = automata.currentState
    expect(s = automata.nextState('write') as State).toMatchObject({ args: ['write'] })
    automata.setState(s)

    expect(s = automata.nextState('it') as State).toMatchObject({args: ['write', 'it'], isFinal: false })
    automata.setState(s)

    expect(s = automata.nextState('down') as State).toMatchObject({ args: ['write', 'it', 'down'], isFinal: true})
    automata.setState(s)

    expect(s = automata.nextState('who') as State).toMatchObject({ args: ['write', 'it', 'down', { text: 'who' }], isFinal: true})
    automata.setState(s)

    expect(s = automata.nextState('are') as State).toMatchObject({
        args: [
            'write',
            'it',
            'down',
            { text: 'who' },
            { text: 'are' }
        ],
        isFinal: true
    })
    automata.setState(s)
})

test('it can detect if a phrase belongs to a grammar', async () => {
    const recoginizer = new Recognizer((Get('module', 'typescript') as SpokenModule).grammar['pt-BR'])
    let r = recoginizer.recoginize('declare uma constante chamada bola')[0]
    expect(r.length).toEqual(2)
    expect(r[1].args).toEqual(["declare", "uma", {"memType": 0}, "chamada", {"name": "bola"}])

    r = recoginizer.recoginize('declare uma variável chamada azul do tipo inteiro')[0]
    expect(r.length).toEqual(2)
    expect(r[1].args).toEqual([
        "declare", "uma", {"memType": 1},
        "chamada", {"name": "azul"}, "do", "tipo",
        {"type": "inteiro"}
    ])

    r = recoginizer.recoginize('declare variável chamada azul tipo inteiro')[0]
    expect(r.length).toEqual(2)
    expect(r[1].args).toEqual([
        "declare", {"memType": 1},
        "chamada", {"name": "azul"},
        "tipo", {"type": "inteiro"}
    ])

    r = recoginizer.recoginize('declare variável chamada azul tipo inteiro com o valor 50')[0]
    expect(r.length).toEqual(2)
    expect(r[1].args).toEqual([
        "declare", {"memType": 1},
        "chamada", {"name": "azul"},
        "tipo", {"type": "inteiro"},
        "com", "o", "valor",
        {"value": "50"}
    ])

    r = recoginizer.recoginize('declare variável chamada azul do tipo inteiro igual 50')[0]
    expect(r.length).toEqual(2)
    expect(r[1].args).toEqual([
        "declare", {"memType": 1},
        "chamada", {"name": "azul"},
        "do", "tipo", {"type": "inteiro"},
        "igual", {"value": "50"}
    ])
})

test('it can tolerate small speell errors and still find the correct match', async () => {
    const recoginizer = new Recognizer((Get('module', 'typescript') as SpokenModule).grammar['pt-BR'])
    let r = recoginizer.recoginize('declarar uma constant chamada bola')[0]

    expect(r.length).toEqual(2)
    expect(r[1].args).toEqual([
        "declarar", "uma", {"memType": 0},
        "chamada", {"name": "bola"}
    ])

    r = recoginizer.recoginize('declara uma variável chamada azul d tip inteiro')[0]
    expect(r.length).toEqual(2)
    expect(r[1].args).toEqual([
        "declara", "uma", {"memType": 1},
        "chamada", {"name": "azul"}, "d", "tip",
        {"type": "inteiro"}
    ])
})

test('it can normalize ordinal numbers in the sentence', async () => {
    function recogn(phrase: string, lang: string) {
        const recoginizer = new Recognizer((Get('module', 'typescript') as SpokenModule).grammar[lang])
        return recoginizer.recoginize(phrase)[0][1].args
    }

    expect(recogn('cursor terceiro letra j', 'pt-BR')).toMatchObject(['cursor', {leapSize: '3'}, 'letra', {symbol: 'j'}])
    expect(recogn('cursor primeira letra j', 'pt-BR')).toMatchObject(['cursor', {leapSize: '1'}, 'letra', {symbol: 'j'}])
    expect(recogn('cursor nona letra j', 'pt-BR')).toMatchObject(['cursor', {leapSize: '9'}, 'letra', {symbol: 'j'}])
    expect(recogn('cursor última letra j', 'pt-BR')).toMatchObject(['cursor', {leapSize: '-1'}, 'letra', {symbol: 'j'}])
    expect(recogn('cursor 14ª letra j', 'pt-BR')).toMatchObject(['cursor', {leapSize: '14'}, 'letra', {symbol: 'j'}])
    expect(recogn('cursor 11ª letra j', 'pt-BR')).toMatchObject(['cursor', {leapSize: '11'}, 'letra', {symbol: 'j'}])

    expect(recogn('pointer third letter j', 'en-US')).toMatchObject(['pointer', {leapSize: '3'}, 'letter', {symbol: 'j'}])
    expect(recogn('pointer fourth letter j', 'en-US')).toMatchObject(['pointer', {leapSize: '4'}, 'letter', {symbol: 'j'}])
    expect(recogn('pointer tenth letter j', 'en-US')).toMatchObject(['pointer', {leapSize: '10'}, 'letter', {symbol: 'j'}])
    expect(recogn('pointer last letter j', 'en-US')).toMatchObject(['pointer', {leapSize: '-1'}, 'letter', {symbol: 'j'}])
    expect(recogn('pointer 32º letter j', 'en-US')).toMatchObject(['pointer', {leapSize: '32'}, 'letter', {symbol: 'j'}])
    expect(recogn('pointer 12º letter j', 'en-US')).toMatchObject(['pointer', {leapSize: '12'}, 'letter', {symbol: 'j'}])
})

function Get(what: 'grammar' |  'module', id: string, lang: string = 'pt-BR') {
    let graph: graphlib.Graph | null = null

    for (const mod of modules) {
        if (what === 'module' && mod.id === id) return mod
        else if (what  === 'grammar') {
            for (let item of mod.grammar[lang]) {
                graph = graphlib.json.read(item) as graphlib.Graph

                if (graph.graph().id === id) return graph
            }
        }
    }

    return null
}