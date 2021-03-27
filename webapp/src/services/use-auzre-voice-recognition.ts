import { useState, useCallback, useEffect } from 'react'
import * as SpeechSDK from 'microsoft-cognitiveservices-speech-sdk'
import { VoiceRecognitionHook } from './use-voice-recognition'
import IpcRenderer from '../components/main/electron-ipc'
// @ts-ignore
import Spoken from 'spoken'

const useAzureVoiceRecognition: VoiceRecognitionHook = () => {
    const [results, setResults] = useState('')
    const recognizer = MyRecognizer.getRecognizer()

    useEffect(() => {
        console.log('[webapp.services.azure-voice-recognition]: Initialized')

        recognizer
            .on('results', (result: SpeechSDK.SpeechRecognitionResult) => {
                // setResults(result.text)
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

    const analyzeSentence = async (phrase: string) => {
        const w = { text: phrase }
        setTimeout(() => IpcRenderer.send('Spoken:analyze', findComand(w as unknown as SpeechSDK.SpeechRecognitionResult)), 3000)
    }

    return {
        results,
        start,
        stop,
        analyzeSentence
    }
}

class MyRecognizer {
    static recognizer : MyRecognizer | null = null
    private speechConfig: SpeechSDK.SpeechConfig | null = null
    private audioConfig: SpeechSDK.AudioConfig | null = null
    private recognizer: SpeechSDK.SpeechRecognizer | null = null
    private handlers = new Map<string, Function>()

    static getRecognizer(): MyRecognizer {
        if (MyRecognizer.recognizer == null) {
            MyRecognizer.recognizer = new MyRecognizer()
        }

        return MyRecognizer.recognizer
    }

    constructor() {}

    init() {
        // THIS IS BAD!
        // https://github.com/Azure-Samples/AzureSpeechReactSample
        // https://github.com/Azure-Samples/cognitive-services-speech-sdk/blob/master/quickstart/javascript/browser/from-microphone/index.html
        this.speechConfig = SpeechSDK.SpeechConfig.fromSubscription('PEDRO_AUG', 'brazilsouth')
        this.speechConfig.speechRecognitionLanguage = 'pt-BR'
        this.speechConfig.setServiceProperty('punctuation', 'explicit', SpeechSDK.ServicePropertyChannel.UriQueryParameter);
        this.audioConfig  = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput()
        this.recognizer = new SpeechSDK.SpeechRecognizer(this.speechConfig, this.audioConfig)
    }

    start() {
        if (this.recognizer == null) return console.error('[webapp.services.azure-voice-recognition]: Session is closed!')

        this.recognizer.recognizeOnceAsync(result => {
            console.log('[webapp.services.azure-voice-recognition]: Results ', result)
            if(result.reason == SpeechSDK.ResultReason.RecognizedSpeech) {
                const h = this.handlers.get('results')

                if(h != null) h(result)
            } else {
                const h = this.handlers.get('error')

                if(h != null) h({ err: new Error('Something went wrong!'), result })
            }
        }, (err) => {
            console.log('[webapp.services.azure-voice-recognition]: Err ' + err.toString())

            const h = this.handlers.get('error')

            if(h != null) h({ err: new Error('Something went wrong!'), result: null })
        })
    }

    stop() {
        if (this.recognizer == null) return console.error('[webapp.services.azure-voice-recognition]: Session is closed!')

        // this.recognizer.close()
    }

    destroy () {
        this.recognizer?.close()
        this.recognizer = null
        this.audioConfig = null
        this.handlers.clear()
    }

    on(event: string, fn: (...args: any) => void) {
        this.handlers.set(event, fn)

        return this
    }
}


function findComand(voiceToTextResponse: SpeechSDK.SpeechRecognitionResult) {
    console.log('[webapp.services.azure-voice-recognition] Warn: Ignoring other matches!')

    const trsc = voiceToTextResponse.text
    const matchedCommand = Spoken.matchPhrase(trsc, 'pt_br')

    return {
        _rawVoiceToTextResponse: voiceToTextResponse,
        phrase: [trsc],
        command: matchedCommand ? {
            ...matchedCommand.command,
            commandArgs: matchedCommand.commandArgs,
        } : null
    }
}

export default useAzureVoiceRecognition
