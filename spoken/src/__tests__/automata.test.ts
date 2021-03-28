import Recognizer, { Automata, State } from '../automata'
import * as graphlib from '../graphlib'
const fs = require('fs')
const path = require('path')

const grammars: GrammarCollection = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', 'grammar.json'), 'utf-8'))

test('it can sanitize a transition string', async () => {
    const graph: graphlib.Graph = graphlib.json.read(grammars.langs['pt-BR'][0])

    const automata = new Automata(graph)

    const normalizer = (label: string) => automata.normalizeTransitionInput({ label })

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
    const graph: graphlib.Graph = graphlib.json.read(grammars.langs['pt-BR'][0])

    const automata = new Automata(graph)
    const transitionIsPossible = (w: string, label: string, store?: string) => automata.transitionIsPossible(w, { label, store })

    expect(transitionIsPossible('the', '(the)')).toEqual('the')
    expect(transitionIsPossible('quick', '(quick, slow)')).toEqual('quick')
    expect(transitionIsPossible('slow', '(quick, slow)')).toEqual('slow')
    expect(transitionIsPossible('fuck', '(stopWord, λ)')).toEqual(null)
    expect(transitionIsPossible('42', '({numeral})')).toEqual('42')
    expect(transitionIsPossible('nop', '({numeral}, dont)')).toEqual(undefined)
    expect(transitionIsPossible('anything', '({term})')).toEqual('anything')
    expect(transitionIsPossible('money', '({term})', 'exchange')).toEqual({ exchange: 'money' })
    expect(transitionIsPossible('constant', '(variable, nothing, constant)', 'type')).toEqual({ type: 'constant' })
})

test('it is possible to go to the next state', async () => {
    const graph: graphlib.Graph = graphlib.json.read(grammars.langs['pt-BR'][0])

    const automata = new Automata(graph)

    let s = automata.currentState
    expect(s = automata.nextState('declare') as State).toMatchObject({id: '1', args: ['declare']})
    automata.setState(s, '')
    expect(s = automata.nextState('uma') as State).toMatchObject({id: '2', args: ['declare', 'uma']})
    automata.setState(s, '')
    expect(automata.nextState('constante')).toMatchObject({id: '3', args: ['declare', 'uma', {memType: 'constante'}]})
})

test('it can detect if a phrase belongs to a grammar', async () => {
    const recoginizer = new Recognizer(grammars.langs['pt-BR'])
    let r = recoginizer.recoginize('declare uma constante chamada bola')[0]
    expect(r.length).toEqual(2)
    expect(r[1].args).toEqual(["declare", "uma", {"memType": "constante"}, "chamada", {"name": "bola"}])

    r = recoginizer.recoginize('declare uma variável chamada azul do tipo inteiro')[0]
    expect(r.length).toEqual(2)
    expect(r[1].args).toEqual([
        "declare", "uma", {"memType": "variável"},
        "chamada", {"name": "azul"}, "do", "tipo",
        {"type": "inteiro"}
    ])

    r = recoginizer.recoginize('declare variável chamada azul tipo inteiro')[0]
    expect(r.length).toEqual(2)
    expect(r[1].args).toEqual([
        "declare", {"memType": "variável"},
        "chamada", {"name": "azul"},
        "tipo", {"type": "inteiro"}
    ])

    r = recoginizer.recoginize('declare variável chamada azul tipo inteiro com o valor 50')[0]
    expect(r.length).toEqual(2)
    expect(r[1].args).toEqual([
        "declare", {"memType": "variável"},
        "chamada", {"name": "azul"},
        "tipo", {"type": "inteiro"},
        "com", "o", "valor",
        {"value": "50"}
    ])

    r = recoginizer.recoginize('declare variável chamada azul do tipo inteiro igual 50')[0]
    expect(r.length).toEqual(2)
    expect(r[1].args).toEqual([
        "declare", {"memType": "variável"},
        "chamada", {"name": "azul"},
        "do", "tipo", {"type": "inteiro"},
        "igual", {"value": "50"}
    ])
})

test('it can tolerate small speell errors and still find the correct match', async () => {
    const recoginizer = new Recognizer(grammars.langs['pt-BR'])
    let r = recoginizer.recoginize('declarar uma constant chamada bola')[0]

    expect(r.length).toEqual(2)
    expect(r[1].args).toEqual([
        "declarar", "uma", {"memType": "constant"},
        "chamada", {"name": "bola"}
    ])

    r = recoginizer.recoginize('declara uma variável chamada azul d tip inteiro')[0]
    expect(r.length).toEqual(2)
    expect(r[1].args).toEqual([
        "declara", "uma", {"memType": "variável"},
        "chamada", {"name": "azul"}, "d", "tip",
        {"type": "inteiro"}
    ])
})