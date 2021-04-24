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

        if (result == null) return

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
    } catch(err) {
        console.log(err.toString())
    } finally {
        EditorService.stop()
    }
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
    await execute('variável bola igual a expressão', 'pt-BR')
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
    await execute('nova variável chamada * bola gorda * igual a expressão', 'pt-BR')
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
    const text = voiceToTextResponse.text
    const result = Spoken.recognizePhrase(text.toLocaleLowerCase(), language)

    if (result != null) {
        result.extra._rawVoiceToTextResponse = voiceToTextResponse
        result.extra.phrase = text

        console.log(result.args)
    }

    return result
}

Main()