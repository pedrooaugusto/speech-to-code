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
    await execute('put the result of the string hello doctor who are you string in a new variable called phrase please')
    await wait(2000)
    await execute('select from line 4 to line 4')
    await execute('write it down')

    await execute('ponha o valor do texto olá eu sou o doutor texto na variável bola', 'pt-BR')
    await wait(2000)
    await execute('select from line 4 to line 4')
    await execute('write it down')
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