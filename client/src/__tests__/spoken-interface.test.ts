/*  PLAYGROUND REGION - THIS REGION OF THE FILE WILL
    BE ALTERED BY THE THIS TEST.




*/

import Spoken, { SpokenCommand } from 'spoken'
import { IpcMainEvent } from 'electron'
import SpokenInterface from '../spoken-interface'
import EditorService from '../editors/editor-service'


function execute(text: string, lang: string = 'en-US') {
    return new Promise((res, rej) => {
        const result = findComand({ text }, lang)

        if (result == null) return rej('Not found 404')

        return SpokenInterface.onComand((new FakeIPCEvent(res, rej) as unknown as IpcMainEvent), result)
    })
}

async function Main() {
    try {
        EditorService.onStateChange((s) => console.log(s))
        EditorService.init()
        await Spoken.init()
        await selectTest()
        await newVariableTest()
        await mathExpressionTest()
        await executeFunctionTest()
    } catch(err) {
        console.log(err.toString())
    } finally {
        EditorService.stop()
    }
}

async function executeFunctionTest()  {
    await wait(1000)
    await execute('go to line 4')
    await execute('execute a função bola com 3 argumentos chamada pela string hello string', 'pt-BR')
    await execute('go to line 5')
    await execute('execute a função bola com os argumentos número 4 e número 8', 'pt-BR')
    await execute('go to line 6')
    await execute('execute a função thing com os argumentos número 4 e número 8 e string hello string chamada pelo número 10', 'pt-BR')
    await wait(3000)
    await execute('select from line 4 to line 6')
    await execute('write it down')
    await execute('new line')
    await execute('new line')
    await execute('go to line 4')
    await execute('execute a função chamada * to string * com 2 argumentos chamada pela variável console', 'pt-BR')
    await execute('go to line 5')
    await execute('execute a função chamada * to integer * com os argumentos número 2 e número 5 no número 83', 'pt-BR')
    await execute('go to line 6')
    await execute('call function log with arguments string hello world string on variable console')
    await wait(3000)
    await execute('select from line 4 to line 6')
    await execute('write it down')
    await execute('new line')
    await execute('new line')
}

async function newVariableTest() {
    await wait(1000)
    await execute('go to line 4')
    await execute('new variable phrase equals string hello doctor who are you string')
    await wait(2000)
    await execute('select from line 4 to line 4')
    await execute('write it down')

    await execute('variável bola igual a texto olá eu sou o doutor texto', 'pt-BR')
    await wait(2000)
    await execute('select from line 4 to line 4')
    await execute('write it down')

    await execute('go to line 4')
    await execute('variável bola igual a tudo', 'pt-BR')
    await wait(3000)
    await execute('string minha bola é quadradade string', 'pt-BR')
    await wait(3000)
    await execute('select from line 4 to line 4')
    await execute('write it down')

    await execute('go to line 4')
    await execute('nova constante chamada bola igual a número 98', 'pt-BR')
    await wait(3000)
    await execute('go to line 5')
    await execute('variável bola igual a string hello doctor string', 'pt-BR')
    await wait(3000)
    await execute('go to line 6')
    await execute('nova variável chamada * bola gorda * igual a tudo', 'pt-BR')
    await wait(3000)
    await execute('string Mrs. Robinson string', 'pt-BR')
    await wait(3000)
    await execute('select from line 4 to line 6', 'en-US')
    await execute('write it down')
    await execute('new line')
    await execute('new line')

}

async function selectTest() {
    await execute('go to line 4', 'en-US')
    await execute('write it down I am a the green doctor', 'en-US')
    await execute('new line below', 'en-US')
    await execute('write it down no! you are not', 'en-US')
    await execute('select from line 4 to line 6', 'en-US')
    await wait(2000)
    await execute('go to line 4', 'en-US')
    await execute('select the word a')
    await wait(1000)
    await execute('please select the word green')
    await wait(1000)
    await execute('select from second symbol a to r')

    await execute('select from line 4 to line 6', 'en-US')
    await execute('write it down', 'en-US')
    await execute('new line below', 'en-US')
    await execute('go to line 4', 'en-US')
}

async function mathExpressionTest() {
    await wait(3000)
    await execute('go to line 4')
    await execute('expression number 4 plus string bola string minus variable value')
    await execute('go to line 5')
    await execute('new variable value equals anything')
    await wait(3000)
    await execute('expression string your age is string plus number 22')
    await wait(3000)
    await execute('go to line 6')
    await execute('new constant age equals expression number 2021 minus number 1998')
    await wait(3000)
    await execute('new line')
    await execute('new variable called * big bob * equals expression anything plus anything times number 4')
    await wait(4000)
    await execute('new line')
    await execute('expression anything plus anything times number 4 plus string hello doctor string')
    await wait(4000)
    await execute('select from line 4 to line 8')
    await execute('write it down')
    await execute('new line')
    await execute('new line')
}

const wait = (t: number) => new Promise((res, rej) => setTimeout(res, t))

class FakeIPCEvent {
    constructor(public res: Function, public rej: Function) {
        this.res = res
        this.rej = rej
    }

    reply(channel: string, result: any) {
        if (result.err) return this.rej(result.err)

        return this.res(result.result)
    }
}

function findComand(voiceToTextResponse: { text: string }, language: string): SpokenCommand | null {
    const text = sanitizePonctuation(voiceToTextResponse.text)
    const result = Spoken.recognizePhrase(text.toLocaleLowerCase(), language)

    if (result != null) {
        result.extra._rawVoiceToTextResponse = voiceToTextResponse
        result.extra.phrase = text

        console.log('\nArgs:')
        console.log(result.args)
        console.log('\n')
    }

    return result
}

function sanitizePonctuation(text: string) {
    return text.replace(/(?<! )(:|\*|,|\.|\?|!)/gi, ' $1')
}

Main()