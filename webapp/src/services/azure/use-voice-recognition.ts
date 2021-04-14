import { useState, useEffect, useContext } from 'react'
import * as SpeechSDK from 'microsoft-cognitiveservices-speech-sdk'
import Spoken from 'spoken'
import { VoiceRecognitionHook, RecognitionRequest } from '../use-voice-recognition'
import MyRecognizer from './voice-recognizer'
import IpcRenderer from '../electron-ipc'
import { GlobalContext } from '../global-context'

const useAzureVoiceRecognition: VoiceRecognitionHook = () => {
    const [results, setResults] = useState<RecognitionRequest | null>(null)
    const { language = 'pt-BR' } = useContext(GlobalContext)
    const recognizer = MyRecognizer.getRecognizer()

    useEffect(() => {
        IpcRenderer.on('Spoken:executeCommandResult', (command: SpokenSearchResponse, result: any) => {
            console.log('[webapp.services.azure-voice-recognition.onResultError]: Execute command result: ' + result)
        })

        return () => {
            IpcRenderer.removeAllListeners('Spoken:executeCommandResult')
        }
    }, [])

    useEffect(() => {
        console.log('[webapp.services.azure-voice-recognition]: Initializing')

        recognizer
            .on('results', (result: SpeechSDK.SpeechRecognitionResult, isFinal: boolean) => {
                if (!result.text || result.text.trim() === '') return

                const attempt = { text: result.text, isFinal, id: Date.now(), recognized: false }

                if (isFinal) {
                    const match = findComand(result, language)

                    attempt.recognized = !!match.command

                    if (attempt.recognized) IpcRenderer.send('Spoken:executeCommand', match)
                }

                setResults(attempt)
            })
            .on('error', (err) => {
                console.error('[webapp.services.azure-voice-recognition.onResultError]: Error', err.toString())
            })
            .init(language)

        return () => {
            recognizer.destroy()
        }
    }, [language])

    const start = async () => {
        recognizer.start()
    }

    const stop = async () => {
        recognizer.stop()
    }

    const analyzeSentence = async (phrase: string, timeout:number | null = 3000) => {
        const w = { text: phrase }
        const fn = () => IpcRenderer.send('Spoken:analyze', findComand(w as unknown as SpeechSDK.SpeechRecognitionResult, language))

        if (timeout) setTimeout(fn, timeout)
        else fn()
    }

    return {
        results,
        start,
        stop,
        analyzeSentence
    }
}


function findComand(voiceToTextResponse: SpeechSDK.SpeechRecognitionResult, language: string): SpokenSearchResponse {
    console.log('[webapp.services.azure-voice-recognition] Warn: Ignoring other matches!')

    const trsc = voiceToTextResponse.text
    const sResult = Spoken.recognizePhrase(trsc.toLocaleLowerCase(), language)
    const wrapper = sResult ? sResult[0] : null

    return {
        _rawVoiceToTextResponse: voiceToTextResponse,
        phrase: [trsc],
        command: wrapper ? {
            id: wrapper.id,
            desc: wrapper.desc,
            commandArgs: wrapper.args,
            impl: wrapper.impl,
            lang: wrapper.lang,
            path: wrapper.path
        } : null
    }
}

type SpokenSearchResponse = {
    _rawVoiceToTextResponse: any,
    phrase: string[],
    command: {
        id: string,
        desc: string,
        commandArgs: Record<string, string | number>,
        impl: string,
        lang: string,
        path: (string | Record<string, string | number> | null)[]
    } | null
}

export default useAzureVoiceRecognition
