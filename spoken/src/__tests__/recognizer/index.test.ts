import recognizer from '../../recognizer'
import Modules, { Context } from '../../modules-loader'

beforeAll(async () => {
    await Modules.load()
})

test('it can detect if a phrase belongs to a grammar', async () => {
    function recoginize(text: string, lang: string = 'pt-BR') {
        return recognizer.recognize(text, lang)![1]
    }

    let r = recoginize('declare uma constante chamada bola')

    expect(r.path).toEqual([
        'declare',
        { memType: 0 },
        'chamada',
        { name: 'bola' },
    ])

    r = recoginize('declare uma variável chamada azul do tipo data')
    expect(r.path).toEqual([
        'declare',
        { memType: 1 },
        'chamada',
        { name: 'azul' },
        'tipo',
        { type: 'Date' },
    ])

    r = recoginize('declare variável chamada azul tipo lógic')
    expect(r.path).toEqual([
        'declare',
        { memType: 1 },
        'chamada',
        { name: 'azul' },
        'tipo',
        { type: 'boolean' },
    ])

    r = recoginize('declare variável chamada azul tipo texto com o valor 50')

    expect(r.path).toEqual([
        'declare',
        { memType: 1 },
        'chamada',
        { name: 'azul' },
        'tipo',
        { type: 'string' },
        'valor',
        { value: '50' },
    ])

    r = recoginize('declare variável chamada azul do tipo númer igual 50')
    expect(r.path).toEqual([
        'declare',
        { memType: 1 },
        'chamada',
        { name: 'azul' },
        'tipo',
        { type: 'number' },
        'igual',
        { value: '50' },
    ])
})

test('it can tolerate small speell errors and still find the correct match', async () => {
    function recoginize(text: string, lang: string = 'pt-BR') {
        return recognizer.recognize(text, lang)![1]
    }

    let r = recoginize('declarar uma constant chamada bola')

    expect(r.path).toEqual([
        'declarar',
        { memType: 0 },
        'chamada',
        { name: 'bola' },
    ])

    r = recoginize('declara uma variável chamada azul do tip número')
    expect(r.path).toEqual([
        'declara',
        { memType: 1 },
        'chamada',
        { name: 'azul' },
        'tip',
        { type: 'number' },
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

    expect(recogn('o resultado do número 1998 na nova variável anos', 'pt-BR')).toMatchObject([
        'resultado',
        {
            expression: {
                id: 'number',
                path: ['número', { number: '1998' }]
            }
        },
        'nova',
        'variável',
        { varName: 'anos' }
    ])
})