import React, { useState, useEffect } from 'react'
import ReactTooltip from 'react-tooltip'
import LostConnectionError  from './LostConnectionError'
import { MicrophoneButton } from './MicrophoneButton'
import IpcRenderer from '../../../services/electron-ipc'
import useAzureVoiceRecognition from '../../../services/azure/use-voice-recognition'
import { RecognitionRequest, VoiceRecognitionHook } from '../../../services/use-voice-recognition'
import { GlobalContext } from '../../../services/global-context'

export default function factory(useVoiceRecognition: VoiceRecognitionHook = useAzureVoiceRecognition) {
    return function Main() {
        const [recording, setRecording] = useState(false)

        const { results, start, stop, analyzeSentence } = useVoiceRecognition()
        const context = React.useContext(GlobalContext)

        const toggleRecording = () => {
            recording ? stop() : start()
            setRecording(!recording)
        }

        const analyze = () => {
            const text = (document.querySelector('.transcription-text.input') as HTMLTextAreaElement)?.value
            setTimeout(() => analyzeSentence(text), 4000)
        }

        useEffect(() => {
            IpcRenderer.on('VoiceRecognition:toggleRecording', (r) => {
                r ? start() : stop()
                setRecording(r)
            })
 
            return () => {
                IpcRenderer.removeAllListeners('VoiceRecognition:toggleRecording')
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])

        console.log(context)

        return (
            <main className="main">
                <LostConnectionError />
                <MicrophoneButton
                    recording={recording}
                    toggleRecording={toggleRecording}
                    connectedToVSCode={context.connectedToVSCode}
                    language={context.language}
                />
                <TranscriptionHistory
                    results={results as RecognitionRequest}
                    language={context.language}
                    recording={recording}
                />
                {context.__debug && (<div className="debug">
                    <label>Debug:</label>
                    <textarea className="transcription-text input" style={{display: 'block', width: '100%'}}></textarea>
                    <button onClick={analyze}>Analyze</button>
                </div>)}
            </main>
        )
    }
}

function TranscriptionHistory(
    props: {
        results: RecognitionRequest,
        language: string,
        recording: boolean
    }
) {
    const [history, setHistory] = React.useState<RecognitionRequest[]>([])

    useEffect(() => {
        const h = document.querySelector('.transcription-history .content')

        if (h != null)
            h.scrollTop = h.scrollHeight

    }, [history.length])

    useEffect(() => {
        if (props.results?.id && props.results?.text) setHistory((h) => h.concat(props.results))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.results?.id])

    return (
        <div className="transcription-history">
            <label>
                {i18n(props.language)('Dialog history')()}:
                <span
                    data-tip={i18n(props.language)('List of all voice commands said')()}
                >
                    <i className="fa fa-question-circle" />
                </span>
            </label>
            <div className="content phrases">
                {history.length === 0 && !props.recording && (
                    <div className="phrase final help">
                        {i18n(props.language)('empty-command-list')()}
                    </div>
                )}
                {history.length === 0 && props.recording && (
                    <div className="phrase final help">
                        {i18n(props.language)('say-some')()}
                    </div>
                )}
                {history.map(item => {
                    return (
                        <div key={item.id} className={`phrase ${item.isFinal ? 'final' : ''} ${item.recognized ? 'recognized' : ''}`}>
                            {item.text}
                            {item.recognized && <i className="fa fa-bolt" />}
                        </div>
                    )
                })}
            </div>
            <ReactTooltip multiline effect="solid" className="custom-tooltip" />
        </div>
    )
}

const texts: Record<string, Record<string, any>> = {
    'en-US': {
        'empty-command-list': () => (
            <React.Fragment>
                The microphone above is a button, click on it to start recording.<br/><br/>
                After that, you can say a voice command and it will appear on this list.<br/><br/>
                Experiment saying: "new constant answer equals number 42".<br/><br/>
                The complete list of voice commands can be found on <i>Menu {'>>'} Modules</i>.
            </React.Fragment>
        ),
        'say-some': () => 'Experiment saying: "new constant answer equals number 42".'
    },
    'pt-BR': {
        'empty-command-list': () => (
            <React.Fragment>
                O microfone acima é um botão, clique nele para começar a gravação.<br/><br/>
                Depois disso, você pode dizer um comando de voz e ele irá aparecer nessa lista.<br/><br/>
                Experimente dizer: "nova constante valor igual a número 42".<br/><br/>
                A lista completa de comandos de voz pode ser encontrada em <i>Menu {'>>'} Modules</i>.
            </React.Fragment>
        ),
        'say-some': () => 'Experimente dizer: "nova constante valor igual a número 42".',
        'Dialog history': () => 'Histórico da conversa',
        'List of all voice commands said': () => 'Lista de todos os comandos ditos'
    }
}

const i18n = (lang: string) => (textId: string) => texts[lang][textId] || (() => textId)