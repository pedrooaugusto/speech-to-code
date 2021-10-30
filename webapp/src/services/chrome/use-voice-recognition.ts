import { useState, useEffect, useContext } from 'react'
import Spoken from 'spoken'
import IpcRenderer from '../electron-ipc'
import { VoiceRecognitionHook, RecognitionRequest, RecognitionError } from '../use-voice-recognition'
import MyRecognizer from './voice-recognizer'
import { GlobalContext } from '../global-context'

const useChromeVoiceRecognition: VoiceRecognitionHook = () => {
    const [results, setResults] = useState<RecognitionRequest | null>(null)
    const [error, setError] = useState<RecognitionError | null>(null)
    const { language = 'pt-BR', executeInternalCommand } = useContext(GlobalContext)
    const recognizer = MyRecognizer.getRecognizer()

    useEffect(() => {
        IpcRenderer.on('Spoken:executeCommandResult', (result: any) => {
            // console.log('[webapp.services.chrome-voice-recognition.onResultError]: Execute command result: ', result)
        })

        return () => {
            IpcRenderer.removeAllListeners('Spoken:executeCommandResult')
        }
    }, [])

    useEffect(() => {
        console.log('[webapp.services.chrome-voice-recognition]: Initializing')

        recognizer
            .on('results', (results: SpeechRecognitionResultList, isFinal: boolean) => {
                const result = results[results.length - 1][0] as SpeechRecognitionAlternative & { text: string }

                if (!result.transcript || result.transcript.trim() === '') return

                result.text = result.transcript.trim()

                const attempt: RecognitionRequest = {
                    text: sanitizePonctuation(result.text, language),
                    isFinal,
                    id: Date.now(),
                    recognized: false
                }

                if (isFinal) {
                    const match = findComand(result, language)

                    attempt.recognized = !!match
                    attempt.command = match?.id

                    if (attempt.recognized) {
                        if (match?.id?.startsWith('__')) executeInternalCommand(match)
                        else IpcRenderer.send('Spoken:executeCommand', match)
                    }
                }

                setResults(attempt)
            })
            .on('error', (err) => {
                setError({
                    __error: err,
                    mainTitle: 'Chrome STT provider is vendor specific',
                    title: 'This browser does not support the SpeechRecognition API',
                    subTitle: 'Try switching STT provider to Azure or accessing this website using Chrome or Edge',
                    body: `Not all browsers support the <i>webkitSpeechRecognition</i> API which powers this project, currently only Google Chrome,
                    MS Edge and Safari* have support to it. Try viewing this website on a supported browser or change the STT provider to Azure on
                    top bar menu.<br/><br/>
                    <b>You can still use the debug option to write comands instead saying them.</b>`
                })
                console.error('[webapp.services.chrome-voice-recognition.onResultError]: Error', err)
            })
            .init(language)

        return () => {
            recognizer.destroy()
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [language])

    const start = async () => {
        recognizer.start()
    }

    const stop = async () => {
        recognizer.stop()
    }

    const analyzeSentence = async (phrase: string, timeout:number | null = 3000) => {        
        const match = findComand({ text: sanitizePonctuation(phrase, language) }, language)

        const attempt: RecognitionRequest = {
            text: phrase,
            isFinal: true,
            id: Date.now(),
            recognized: !!match,
            command: match?.id
        }

        const fn = () => {
            setResults(attempt)
            if (attempt.recognized) {
                if (match?.id?.startsWith('__')) executeInternalCommand(match)
                else IpcRenderer.send('Spoken:executeCommand', match)
            }
        }

        if (timeout) setTimeout(fn, timeout)
        else fn()
    }

    return {
        results,
        start,
        stop,
        error,
        setError,
        analyzeSentence
    }
}

function findComand(voiceToTextResponse: { text: string }, language: string) {
    const text = sanitizePonctuation(voiceToTextResponse.text, language)
    const result = Spoken.recognizePhrase(text.toLocaleLowerCase(), language)

    if (result != null) {
        result.extra._rawVoiceToTextResponse = voiceToTextResponse
        result.extra.phrase = text
    }

    return result
}

function sanitizePonctuation(text: string, language: string) {
    text = text.replace(/(?<! )(:|\*|,|\.|\?|!)/gi, ' $1')

    // sorry...
    // TODO: FIXME
    if (language === 'pt-BR') {
        return text.replaceAll(/aspa(s|)/gi, '*')
    } else {
        return text.replaceAll(/quote(s|)/gi, '*')
    }

}

export default useChromeVoiceRecognition
