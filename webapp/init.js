import { html, render } from 'https://unpkg.com/htm@3.0.4/preact/index.mjs?module'
import { useState } from 'https://unpkg.com/preact@10.3.2/hooks/dist/hooks.module.js?module'
import { useVoiceRecognition } from './voice-recognition.js'

function App (props) {
    return html`
        <div>
            <${Header} />
            <${Main} />
        </div>
    `
}

function Header() {
    return html`
        <header>
            <div class="title">Speech to Code</div>
        </header>
    `
}

function Main() {
    const [recording, setRecording] = useState(false)
    const vr = useVoiceRecognition()
    const toggleRecording = () => {
        if (recording) {
            vr.stop()
        } else {
            vr.start()
        }
        setRecording(!recording)
    }

    return html`
        <main>
            <div class="record ${recording ? 'on' : 'off'}">
                <div class="btn" onClick=${toggleRecording}></div>
                <div class="label"><b>${recording ? 'Stop': 'Start'}</b> recording</div>
            </div>
            <div class="transcription">
                <label>Transcription</label>
                <div class="transcription-text"></div>
            </div>
        </main>
    `
}

render(html`<${App} />`, document.getElementById("preact-root"))