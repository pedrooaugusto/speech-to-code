import { useState, useCallback, useEffect } from 'react'
import * as SpeechSDK from 'microsoft-cognitiveservices-speech-sdk'
import Spoken from 'spoken'
import { VoiceRecognitionHook } from '../use-voice-recognition'
import MyRecognizer from './voice-recognizer'
import IpcRenderer from '../electron-ipc'

const useAzureVoiceRecognition: VoiceRecognitionHook = () => {
    const [results, setResults] = useState('')
    const recognizer = MyRecognizer.getRecognizer()

    useEffect(() => {
        console.log('[webapp.services.azure-voice-recognition]: Initialized')

        Spoken.init()

        recognizer
            .on('results', (result: SpeechSDK.SpeechRecognitionResult) => {
                setResults(result.text)
                setTimeout(() => IpcRenderer.send('Spoken:analyze', findComand(result)), 1000)
            })
            .on('error', (err) => {
                console.error('[webapp.services.azure-voice-recognition.onResultError]: Error', err.toString())
            })
            .init()

        // Inter process comunication: listen to node context requests
        IpcRenderer.on('Spoken:analysisResults', (data) => {
            setResults(data.phrase)
        })

        return () => {
            recognizer.destroy()
        }
    }, [])

    const start = async () => {
        recognizer.start()
    }

    const stop = async () => {
        recognizer.stop()
    }

    const analyzeSentence = async (phrase: string, timeout:number | null = 3000) => {
        const w = { text: phrase }
        const fn = () => IpcRenderer.send('Spoken:analyze', findComand(w as unknown as SpeechSDK.SpeechRecognitionResult))

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


function findComand(voiceToTextResponse: SpeechSDK.SpeechRecognitionResult): SpokenSearchResponse {
    console.log('[webapp.services.azure-voice-recognition] Warn: Ignoring other matches!')

    const trsc = voiceToTextResponse.text
    const sResult = Spoken.recognizePhrase(trsc.toLocaleLowerCase(), 'pt-BR')
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
