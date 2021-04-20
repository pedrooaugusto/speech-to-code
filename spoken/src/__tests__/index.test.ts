import Spoken from '../index'
import * as graphlib from '../graphlib'
// import { allRecognizablePhrases } from '../build/build-utils'

beforeAll(async () => {
    await Spoken.init()
})

test('it can load the grammar', async () => {
    expect(Spoken.modules).not.toBeNull()
})

/*test('it can generate the power set off all phrases of a given commands', async () => {
    const graph: graphlib.Graph = getGraph('write', 'en-US') as graphlib.Graph
    const s = allRecognizablePhrases(graph, Spoken.context.templates)

    expect(s.length).not.toBe(0)
})*/

test('it can search for a command given an id', async () => {
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

    command = Spoken.recognizePhrase('write hello how are you ?', 'en-US')
    expect(command![0]).toMatchObject({
        id: 'write',
        path: [
            'write',
            null,
            { text: 'hello' },
            { text: 'how' },
            { text: 'are' },
            { text: 'you' },
            { text: '?' }
        ]
    })

    command = Spoken.recognizePhrase('write it hello friend', 'en-US')
    expect(command![0]).toMatchObject({
        id: 'write',
        path: ['write', 'it', null, { text: 'hello' }, { text: 'friend' }]
    })
    
    command = Spoken.recognizePhrase('write down hello friend', 'en-US')
    expect(command![0]).toMatchObject({
        id: 'write',
        path: ['write', 'down', { text: 'hello' }, { text: 'friend' }]
    })
})

test('it can remove some stop words', async () => {
    expect(
        Spoken.recognizePhrase('write it down hello friend', 'en-US')![0]
    ).toMatchObject({
        path: ['write', 'it', 'down', { text: 'hello' }, { text: 'friend' }]
    })

    expect(
        Spoken.recognizePhrase('create a constant called max of the type number with the value 72', 'en-US')![0]
    ).toMatchObject({
        path: [
            'create', { memType: 0 }, 'called', { name: 'max' }, 'type', { type: 'number' }, 'value', { value: '72' }
        ]
    })

    expect(
        Spoken.recognizePhrase('declare uma variável chamada valor do tipo número', 'pt-BR')![0]
    ).toMatchObject({
        path: [
            'declare', { memType: 1 }, 'chamada', { name: 'valor' }, 'tipo', { type: 'number' }
        ]
    })

    expect(
        Spoken.recognizePhrase('por favor declare uma variável chamada valor', 'pt-BR')![0]
    ).toMatchObject({
        path: ['declare', { memType: 1 }, 'chamada', { name: 'valor' }]
    })

    expect(
        Spoken.recognizePhrase('escreva por favor hello', 'pt-BR')![0]
    ).toMatchObject({
        path: ['escreva', { text: 'por' }, { text: 'favor' }, { text: 'hello' }]
    })

    expect(
        Spoken.recognizePhrase('ponteiro vá para a letra a por favor', 'pt-BR')![0]
    ).toMatchObject({
        path: ['ponteiro', 'letra', { symbol: 'a' }]
    })
})
