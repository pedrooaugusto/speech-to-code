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

// test.only('it can search for a command given a phrase 2', async () => {
//     let command = Spoken.recognizePhrase('expression anything not less or equal than anything', 'en-US')
//     console.log(command?.args.operation?.args)
// })

test('it can search for a command given an id', async () => {
    const graph = Spoken.findById('variable_assignment', 'pt-BR')
    expect(graph).not.toBe(null)
    expect((graph || {}).id).toBe('variable_assignment')
})

test('it can search for a command given a phrase', async () => {
    let command = Spoken.recognizePhrase('declarar constante chamada bola', 'pt-BR')
    expect(command).toMatchObject({
        id: 'variable_assignment',
        args: {
            memType: 1,
            varName: 'bola'
        }
    })

    command = Spoken.recognizePhrase('THE', 'pt-BR')
    expect(command).toBeNull()

    command = Spoken.recognizePhrase('write hello how are you ?', 'en-US')
    expect(command).toMatchObject({
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
    expect(command).toMatchObject({
        id: 'write',
        path: ['write', 'it', null, { text: 'hello' }, { text: 'friend' }]
    })
    
    command = Spoken.recognizePhrase('write down hello friend', 'en-US')
    expect(command).toMatchObject({
        id: 'write',
        path: ['write', 'down', { text: 'hello' }, { text: 'friend' }],
        args: { text: 'hello friend'.split(' ') }
    })

    command = Spoken.recognizePhrase('string who are you string', 'en-US')
    expect(command).toMatchObject({
        id: 'string',
        path: ['string', { string: 'who' }, { string: 'are' }, { string: 'you' }, 'string'],
        args: { string: 'who are you'.split(' ') }
    })
})

test('it can remove some stop words', async () => {
    expect(
        Spoken.recognizePhrase('write it down hello friend', 'en-US')
    ).toMatchObject({
        path: ['write', 'it', 'down', { text: 'hello' }, { text: 'friend' }]
    })

    expect(
        Spoken.recognizePhrase('create a constant called max equals the number 72', 'en-US')
    ).toMatchObject({
        path: [
            { isNew: true },
            { memType: 1 },
            'called',
            { varName: 'max' },
            'equals',
            {
                expression: {
                    id: 'expressions',
                    path: [{
                        expression: {
                            id: 'number',
                            path: ['number', { number: '72' }]
                        }
                    }]
                }
            }
        ]
    })

    expect(
        Spoken.recognizePhrase('por favor declare uma variável chamada valor', 'pt-BR')
    ).toMatchObject({
        path: [
            { isNew: true },
            { memType: 0 },
            'chamada',
            { varName: 'valor' }
        ]
    })

    expect(
        Spoken.recognizePhrase('escreva por favor hello', 'pt-BR')
    ).toMatchObject({
        path: ['escreva', { text: 'por' }, { text: 'favor' }, { text: 'hello' }]
    })

    expect(
        Spoken.recognizePhrase('ponteiro vá para a letra a por favor', 'pt-BR')
    ).toMatchObject({
        path: ['ponteiro', 'letra', { symbol: 'a' }]
    })
})

test('it can organize the command arguments', async () => {
    expect(
        Spoken.recognizePhrase('write it down hello friend', 'en-US')
    ).toMatchObject({
        args: { text: ['hello', 'friend'] }
    })

    expect(
        Spoken.recognizePhrase('the variable phrase equals the string hello man string', 'en-US')!.args
    ).toMatchObject({
        expression: {
            id: 'expressions',
            args: {
                expression: {
                    id: 'string',
                    args: { string: ['hello', 'man'] },
                    path: ['string', { string: 'hello' }, { string: 'man' }, 'string']
                }
            }
        },
        varName: 'phrase'
    })

    expect(
        Spoken.recognizePhrase('nova variável chamada * bola quadrada * igual número 42 por favor', 'pt-BR')!.args
    ).toMatchObject({
        expression: {
            id: 'expressions',
            args: {
                expression: {
                    id: 'number',
                    args: { number: '42' },
                    path: [
                        'número',
                        { number: '42' }
                    ]
                }
            }
        },
        varName: {
            id: 'multi_word_token',
            args: {
                words: ['bola', 'quadrada']
            }
        }
    })

    expect(
        Spoken.recognizePhrase('nova variável bola igual a string de da você por favor string por favor', 'pt-BR')!.args
    ).toMatchObject({
        expression: {
            id: 'expressions',
            args: {
                expression: {
                    id: 'string',
                    args: { string: 'de da você por favor'.split(' ') },
                    path: [
                        'string',
                        { string: 'de' },
                        { string: 'da' },
                        { string: 'você' },
                        { string: 'por' },
                        { string: 'favor' },
                        'string'
                    ]
                }
            }
        },
        isNew: true,
        varName: 'bola'
    })

    expect(
        Spoken.recognizePhrase('nova variável bola igual a gap por favor', 'pt-BR')!.args
    ).toMatchObject({
        expression: {
            id: 'expressions',
            args: {
                wildCard: 'gap'
            }
        },
        isNew: true,
        varName: 'bola'
    })

    expect(
        Spoken.recognizePhrase('execute a função bola com um argumentos', 'pt-BR')!.args
    ).toMatchObject({
        functionName: 'bola',
        argsNumber: '1',
        extra: { lang: 'pt-BR' }
    })

    expect(Spoken.recognizePhrase('execute a função bola com três argumentos', 'pt-BR')!.args).toMatchObject({ argsNumber: '3'})

    expect(Spoken.recognizePhrase('call function log with one argument', 'en-US')!.args).toMatchObject({ argsNumber: '1'})

    expect(Spoken.recognizePhrase('go to line one', 'en-US')!.args).toMatchObject({ line: '1' })

    expect(Spoken.recognizePhrase('#45', 'en-US')!.args).toMatchObject({ number: '45' })
    expect(Spoken.recognizePhrase('number 45', 'en-US')!.args).toMatchObject({ number: '45' })
    expect(Spoken.recognizePhrase('number #45', 'en-US')!.args).toMatchObject({ number: '45' })
})