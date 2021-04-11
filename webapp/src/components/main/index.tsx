import React, { useState, useEffect } from 'react'
import IpcRenderer from '../../services/electron-ipc'
import { useVoiceRecognition as useGoogleVoiceRecognition } from '../../services/google/use-voice-recognition'
import useAzureVoiceRecognition from '../../services/azure/use-voice-recognition'

export default function Main() {
    const [recording, setRecording] = useState(false)
    const [editorState, setEditorState] = useState([])

    const { results, start, stop, analyzeSentence } = useAzureVoiceRecognition()

    const toggleRecording = () => {
        recording ? stop() : start()
        setRecording(!recording)
    }

    const changeEditor = (t: string) => {
        IpcRenderer.send('Config:changeEditor', t)
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

        IpcRenderer.on('Config:onChangeEditorState', (e) => {
            setEditorState(e)
        })

        // Request the current editor
        IpcRenderer.send('Config:changeEditor', null)
    }, [])

    return (
        <main className="main">
            <div className="editor-in-use">
                <div>Editors:</div>
                <ul>
                    {editorState.map(({ name, current, status }) => {
                        const cls = (current ? 'selected ' : '') + (status === 'ON' ? 'on' : '')

                        return (
                            <li
                                key={name}
                                className={cls}
                                onClick={() => changeEditor(name)}                                
                            >
                                {name}
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className={`record ${recording ? 'on' : 'off'}`}>
                <div className="btn" onClick={toggleRecording}></div>
                <div className="label"><b>{recording ? 'Stop': 'Start'}</b> recording</div>
            </div>
            <div className="transcription">
                <label>Transcription:</label>
                <div className="transcription-text">{results}</div>
            </div>
            <div className="debug">
                <label>Debug:</label>
                <div className="transcription-text input" contentEditable></div>
                <button onClick={analyze}>Analyze</button>
            </div>
        </main>
    )
}
