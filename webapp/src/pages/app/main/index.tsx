import React, { useState, useEffect } from 'react'
import ReactTooltip from 'react-tooltip'
import ErrorPanel, { LostConnectionError }  from './ErrorPanel'
import { MicrophoneButton } from './MicrophoneButton'
import IpcRenderer from '../../../services/electron-ipc'
import useAzureVoiceRecognition from '../../../services/azure/use-voice-recognition'
import { RecognitionRequest, VoiceRecognitionHook } from '../../../services/use-voice-recognition'
import { GlobalContext } from '../../../services/global-context'

export default function factory(useVoiceRecognition: VoiceRecognitionHook = useAzureVoiceRecognition) {
    return function Main() {
        const [recording, setRecording] = useState(false)

        const { results, start, stop, analyzeSentence, error, setError } = useVoiceRecognition()
        const context = React.useContext(GlobalContext)

        const toggleRecording = () => {
            recording ? stop() : start()
            setRecording(!recording)
            context.onToggleRecording?.(!recording)
        }

        const analyze = () => {
            const text = (document.querySelector('.transcription-text.input') as HTMLTextAreaElement)?.value
            setTimeout(() => analyzeSentence(text), 2000)
        }

        useEffect(() => {
            IpcRenderer.on('VoiceRecognition:toggleRecording', (r) => {
                r ? start() : stop()
                setRecording(r)
            })
            
            // @ts-ignore
            window.appcontext = context
 
            return () => {
                IpcRenderer.removeAllListeners('VoiceRecognition:toggleRecording')
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }, [])

        return (
            <main className={`main ${context.mode === 'widget' ? 'widget' : context.mode === 'modalx' ? 'modalx' : ''}`}>
                <LostConnectionError />
                {error && (
                    <ErrorPanel
                        {...error}
                        show={context.mode !== 'widget' && error != null}
                        showDetails={context.shadeIsOpen}
                        onShowDetails={context.toggleShade}
                    />
                )}
                <MicrophoneButton
                    recording={recording}
                    toggleRecording={toggleRecording}
                    active={context.mode === 'widget' || (context.connectedToVSCode && error == null)}
                    language={context.language}
                    mode={context.mode}
                    onOpen={context.onOpen}
                    changingLanguage={context.changingLanguage}
                    setError={setError}
                />
                <TranscriptionHistory
                    results={results as RecognitionRequest}
                    language={context.language}
                    recording={recording}
                    mode={context.mode}
                />
                <Debug show={context.__debug} analyze={analyze} mode={context.mode} language={context.language} />
            </main>
        )
    }
}

interface TranscriptionHistroyProps {
    results: RecognitionRequest,
    language: string,
    recording: boolean,
    mode?: string
}

function TranscriptionHistory(props: TranscriptionHistroyProps) {
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
                <span data-tip={i18n(props.language)('List of all voice commands said')()}>
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
                {history.map(item => <RecognizedPhrase key={item.id} item={item} language={props.language} />)}
            </div>
            <ReactTooltip multiline effect="solid" className="custom-tooltip" />
        </div>
    )
}

const base = 'https://github.com/pedrooaugusto/speech-to-code/tree/main/spoken/src/modules/typescript/'
function makeCommandUrl(command: RecognitionRequest, language: string): string {
    return base + command.command + '#' + (language === 'pt-BR' ? 'português' : 'english')
}

function RecognizedPhrase({item, language}: {item: RecognitionRequest, language: string}): JSX.Element {
    if (!item.recognized)
        return (
            <div key={item.id} className={`phrase ${item.isFinal ? 'final' : ''}`}>
                {item.text}
            </div>
        )

    return (
        <a
            key={item.id}
            className={`phrase ${item.isFinal ? 'final' : ''} recognized`}
            href={makeCommandUrl(item, language)}
            target="_blank"
            rel="noreferrer"
        >
            {item.text}
            <i className="fa fa-bolt" />
        </a>
    )
}

interface DebugProps {
    show: boolean,
    mode?: 'widget' | 'modalx',
    analyze: () => void,
    language: string
}

function Debug(props: DebugProps) {
    const [loading, setLoading] = React.useState(false)

    const analyze = () => {
        setLoading(true)

        props.analyze()
        setTimeout(() => setLoading(false), 5000)
    }

    if (!props.show || props.mode === 'widget') return null

    return (
        <div className="debug">
            <ReactTooltip multiline effect="solid" className="custom-tooltip" id="debug" />
            <label>
                Debug:
                <span data-tip={i18n(props.language)('debug_desc')()} data-for="debug">
                    <i className="fa fa-question-circle" />
                </span>
            </label>
            <textarea className="transcription-text input" style={{display: 'block', width: '100%'}}></textarea>
            <button style={{ cursor: loading ? 'progress' : 'pointer' }} onClick={analyze} disabled={loading}>Analyze</button>
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
                Alternatively, instead of saying a phrase, you can use the debug option below <b>to write it</b>.<br/><br/>
                The complete list of voice commands can be found on <i>Menu {'>>'} Modules</i>.
            </React.Fragment>
        ),
        'say-some': () => 'Experiment saying: "new constant answer equals number 42".',
        'debug_desc': () => 'Use this option to write voice commands instead of saying it.'
    },
    'pt-BR': {
        'empty-command-list': () => (
            <React.Fragment>
                O microfone acima é um botão, clique nele para começar a gravação.<br/><br/>
                Depois disso, você pode dizer um comando de voz e ele irá aparecer nessa lista.<br/><br/>
                Experimente dizer: "nova constante valor igual a número 42".<br/><br/>
                Alternativamente, você pode usar a secção de debug abaixo para <b>escrever</b> a frase.<br/><br/>
                A lista completa de comandos de voz pode ser encontrada em <i>Menu {'>>'} Modules</i>.
            </React.Fragment>
        ),
        'say-some': () => 'Experimente dizer: "nova constante valor igual a número 42".',
        'Dialog history': () => 'Histórico da conversa',
        'List of all voice commands said': () => 'Lista de todos os comandos ditos',
        'debug_desc': () => 'Utilize essa opção para escrever comandos de voz ao invés de dizê-los.'
    }
}

const i18n = (lang: string) => (textId: string) => texts[lang][textId] || (() => textId)