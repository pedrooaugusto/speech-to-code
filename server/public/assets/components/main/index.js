import { html } from 'https://unpkg.com/htm@3.0.4/preact/index.mjs?module'
import { useState, useEffect } from 'https://unpkg.com/preact@10.3.2/hooks/dist/hooks.module.js?module'
import IpcRenderer from './electron-ipc.js'
import { useVoiceRecognition } from './voice-recognition.js'


export default function Main() {
    const [recording, setRecording] = useState(false)
    const [editorState, setEditorState] = useState([])

    const { results, start, stop, analyzeSentence } = useVoiceRecognition()

    const toggleRecording = () => {
        recording ? stop() : start()
        setRecording(!recording)
    }

    const changeEditor = (t) => {
        IpcRenderer.send('Config:changeEditor', t)
    }

    const analyze = (evt) => {
        const text = document.querySelector('.transcription-text.input').innerText
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

        IpcRenderer.send('Config:changeEditor', null)
    }, [])

    return html`
        <main class="main">
            <div class="editor-in-use">
                <div>Editors:</div>
                <ul>
                    ${editorState.map(({ name, current, status }) => {
                        const cls = (current ? 'selected ' : '') + (status === 'ON' ? 'on' : '')

                        return html`
                            <li
                                class="${cls}"
                                onClick=${() => changeEditor(name)}                                
                            >
                                ${name}
                            </li>
                        `
                    })}
                </ul>
            </div>
            <div class="record ${recording ? 'on' : 'off'}">
                <div class="btn" onClick=${toggleRecording}></div>
                <div class="label"><b>${recording ? 'Stop': 'Start'}</b> recording</div>
            </div>
            <div class="transcription">
                <label>Transcription:</label>
                <div class="transcription-text">${results}</div>
            </div>
            <div class="debug">
                <label>Debug:</label>
                <div class="transcription-text input" contentEditable></div>
                <button onClick=${analyze}>Analyze</button>
            </div>
        </main>
    `
}
