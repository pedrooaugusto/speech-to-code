import { html } from 'https://unpkg.com/htm@3.0.4/preact/index.mjs?module'
import { useState, useEffect } from 'https://unpkg.com/preact@10.3.2/hooks/dist/hooks.module.js?module'
import { useVoiceRecognition } from './voice-recognition.js'


export default function Main() {
    const [recording, setRecording] = useState(false)
    const { results, start, stop, analyzeSentence } = useVoiceRecognition()

    const toggleRecording = () => {
        recording ? stop() : start()
        setRecording(!recording)
    }

    const analyze = (evt) => {
        const text = document.querySelector('.transcription-text.input').innerText
        setTimeout(() => analyzeSentence(text), 4000)
    }

    useEffect(() => {
        if (typeof ipcRenderer !== 'undefined')
            ipcRenderer.on('VoiceRecognition:toggleRecording', (r) => {
                r ? start() : stop()
                setRecording(r)
            })
        else
            console.error('[Init.Main] Error: ipcRenderer not defined!')
    }, [])

    return html`
        <main class="main">
            <div class="record ${recording ? 'on' : 'off'}">
                <div class="btn" onClick=${toggleRecording}></div>
                <div class="label"><b>${recording ? 'Stop': 'Start'}</b> recording</div>
            </div>
            <div class="transcription">
                <label>Transcription</label>
                <div class="transcription-text">${results}</div>
                <div class="transcription-text input" contentEditable></div>
                <button onClick=${analyze}>Analyze</button>
            </div>
        </main>
    `
}
