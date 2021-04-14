import React, { useState, useEffect } from 'react'
import IpcRenderer from '../../services/electron-ipc'
// import { useVoiceRecognition as useGoogleVoiceRecognition } from '../../services/google/use-voice-recognition'
import useAzureVoiceRecognition from '../../services/azure/use-voice-recognition'
import { MicrophoneButton } from './MicrophoneButton'
import { RecognitionRequest } from '../../services/use-voice-recognition'

export default function Main() {
    const [recording, setRecording] = useState(false)

    const { results, start, stop, analyzeSentence } = useAzureVoiceRecognition()

    const toggleRecording = () => {
        recording ? stop() : start()
        setRecording(!recording)
    }

    const analyze = () => {
        const text = (document.querySelector('.transcription-text.input') as HTMLElement)?.innerText
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
    }, [])

    return (
        <main className="main">
            <MicrophoneButton
                recording={recording}
                toggleRecording={toggleRecording}
            />
            <TranscriptionHistory results={results as RecognitionRequest} />
            {/* <div className="debug">
                <label>Debug:</label>
                <div className="transcription-text input" contentEditable></div>
                <button onClick={analyze}>Analyze</button>
            </div> */}
        </main>
    )
}

function TranscriptionHistory(
    props: {
        results: RecognitionRequest
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
    }, [props.results?.id])

    return (
        <div className="transcription-history">
            <div className="content phrases">
                {history.map(item => {
                    return (
                        <div key={item.id} className={`phrase ${item.isFinal ? 'final' : ''} ${item.recognized ? 'recognized' : ''}`}>
                            {item.text}
                            {item.recognized && <i className="fa fa-bolt" />}
                        </div>
                    )
                })}
            </div>
            {/* <label>Transcription:</label>
            <div className="transcription-text">{props.results}</div> */}
        </div>
    )
}