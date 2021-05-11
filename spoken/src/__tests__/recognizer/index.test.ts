import recognizer from '../../recognizer'
import Modules from '../../modules-loader'

beforeAll(async () => {
    await Modules.load()
})

test('it can detect if a phrase belongs to a grammar', async () => {
    function recoginize(text: string, lang: string = 'pt-BR') {
        return recognizer.recognize(text, lang)![1]
    }

    let r = recoginize('declare uma constante chamada bola')

    expect(r.path).toEqual([
        { isNew: true },
        { memType: 1 },
        'chamada',
        { varName: 'bola' }
    ])

    r = recoginize('declare uma variável chamada azul igual a número 7')
    expect(r.path).toMatchObject([
        { isNew: true },
        { memType: 0 },
        'chamada',
        { varName: 'azul' },
        'igual',
        {
            expression: {
                id: 'expressions',
                path: [{
                    expression: {
                        id: 'number',
                        path: ['número', { number: '7' }]
                    }
                }]
            }
        }
    ])

    r = recoginize('declare uma variável chamada * meu nome * igual a string olá pedro string')

    expect(r.path).toEqual([
        { isNew: true },
        { memType: 0 },
        'chamada',
        {
          varName: {
            id: 'multi_word_token',
            lang: 'pt-BR',
            impl: expect.stringContaining('MultiWordTokens'),
            path: ['*', { words: 'meu' }, { words: 'nome' }, '*'],
            extraArgs: '{"case": "camel"}'
          }
        },
        'igual',
        {
          expression: {
            id: 'expressions',
            lang: 'pt-BR',
            impl: expect.stringContaining('Expression'),
            path: [{
                expression: {
                    id: 'string',
                    lang: 'pt-BR',
                    impl: expect.stringContaining('WriteString'),
                    path: ['string', { string: 'olá' }, { string: 'pedro' }, 'string']
                }
            }],
            extraArgs: undefined
          }
        }
    ])

    r = recoginize('declare variável chamada azul igual númer 50')
    expect(r.path).toMatchObject([
        { isNew: true },
        { memType: 0 },
        'chamada',
        { varName: 'azul' },
        'igual',
        {
            expression: {
                id: 'expressions',
                path: [{
                    expression: {
                        id: 'number',
                        path: ['númer', { number: '50' }]
                    }
                }]
            }
        }
    ])
})

test('it can tolerate small speell errors and still find the correct match', async () => {
    function recoginize(text: string, lang: string = 'pt-BR') {
        return recognizer.recognize(text, lang)![1]
    }

    let r = recoginize('declar uma constant chamad bola')

    expect(r.path).toEqual([
        { isNew: true },
        { memType: 1 },
        'chamad',
        { varName: 'bola' },
    ])
})

test('it can normalize ordinal numbers in the sentence', async () => {
    function recogn(phrase: string, lang: string) {
        return recognizer.recognize(phrase, lang)![1].path
    }

    expect(recogn('cursor terceiro letra j', 'pt-BR')).toMatchObject([
        'cursor',
        { leapSize: '3' },
        'letra',
        { symbol: 'j' },
    ])
    expect(recogn('cursor primeira letra j', 'pt-BR')).toMatchObject([
        'cursor',
        { leapSize: '1' },
        'letra',
        { symbol: 'j' },
    ])
    expect(recogn('cursor nona letra j', 'pt-BR')).toMatchObject([
        'cursor',
        { leapSize: '9' },
        'letra',
        { symbol: 'j' },
    ])
    expect(recogn('cursor última letra j', 'pt-BR')).toMatchObject([
        'cursor',
        { leapSize: '-1' },
        'letra',
        { symbol: 'j' },
    ])
    expect(recogn('cursor 14ª letra j', 'pt-BR')).toMatchObject([
        'cursor',
        { leapSize: '14' },
        'letra',
        { symbol: 'j' },
    ])
    expect(recogn('cursor 11ª letra j', 'pt-BR')).toMatchObject([
        'cursor',
        { leapSize: '11' },
        'letra',
        { symbol: 'j' },
    ])

    expect(recogn('pointer third letter j', 'en-US')).toMatchObject([
        'pointer',
        { leapSize: '3' },
        'letter',
        { symbol: 'j' },
    ])
    expect(recogn('pointer fourth letter j', 'en-US')).toMatchObject([
        'pointer',
        { leapSize: '4' },
        'letter',
        { symbol: 'j' },
    ])
    expect(recogn('pointer tenth letter j', 'en-US')).toMatchObject([
        'pointer',
        { leapSize: '10' },
        'letter',
        { symbol: 'j' },
    ])
    expect(recogn('pointer last letter j', 'en-US')).toMatchObject([
        'pointer',
        { leapSize: '-1' },
        'letter',
        { symbol: 'j' },
    ])
    expect(recogn('pointer 32º letter j', 'en-US')).toMatchObject([
        'pointer',
        { leapSize: '32' },
        'letter',
        { symbol: 'j' },
    ])
    expect(recogn('pointer 12º letter j', 'en-US')).toMatchObject([
        'pointer',
        { leapSize: '12' },
        'letter',
        { symbol: 'j' },
    ])
})

test('it can recognzie an automata inside another automata', async () => {
    function recogn(phrase: string, lang: string) {
        return recognizer.recognize(phrase, lang)![1].path
    }

    expect(recogn('nova variável chamada anos igual a número 1998', 'pt-BR')).toMatchObject([
        { isNew: true },
        { memType: 0 },
        'chamada',
        { varName: 'anos' },
        'igual',
        {
            expression: {
                id: 'expressions',
                path: [{
                    expression: {
                        id: 'number',
                        path: ['número', { number: '1998' }]
                    }
                }]
            }
        }
    ])
})

test('it can sort and omit graphs based on priority and use', async () => {
    const mod = Modules.list[0]

    const r = recognizer.graphs(mod, 'en-US').map(a => ({
        id: a.value.id,
        alias: a.value.alias,
        priority: a.value.priority
    }))

    expect(r.findIndex(a => a.alias)).toBe(-1)
    expect(r[ r.length - 1 ].priority).toBe('2')
})