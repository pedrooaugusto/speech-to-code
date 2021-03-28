import Spoken from '../index2'

beforeAll(async () => {
    await Spoken.init()
})

test('it can load the grammar', async () => {
    expect(Spoken.grammars).not.toBeNull()
})

test('it can search for a command given a id', async () => {
    const graph = Spoken.findById('declare_variable', 'pt-BR')
    expect(graph).not.toBe(null)
    expect((graph || {}).id).toBe('declare_variable')
})

test('it can search for a command given a phrase', async () => {
    const command = Spoken.recognizePhrase('declarar constante chamada bola', 'pt-BR')

    expect(command).toMatchObject([{
        id: 'declare_variable',
        args: {
            memType: 'constante',
            name: 'bola'
        }
    }])
})
