import { html, render } from 'https://unpkg.com/htm@3.0.4/preact/index.mjs?module'
import { useState, useCallback, useEffect } from 'https://unpkg.com/preact@10.3.2/hooks/dist/hooks.module.js?module'
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
    const { results, start, stop, analyzeSentence } = useVoiceRecognition()

    const toggleRecording = () => {
        recording ? stop() : start()
        setRecording(!recording)
    }

    const analyze = (evt) => {
        const text = document.querySelector('.transcription-text').innerText
        setTimeout(() => analyzeSentence(text), 4000)
    }

    useEffect(() => {
		ipcRenderer.on('VoiceRecognition:toggleRecording', (r) => {
            r ? start() : stop()
            setRecording(r)
        })
    }, [])

    return html`
        <main>
            <div class="record ${recording ? 'on' : 'off'}">
                <div class="btn" onClick=${toggleRecording}></div>
                <div class="label"><b>${recording ? 'Stop': 'Start'}</b> recording</div>
            </div>
            <div class="transcription">
                <label>Transcription</label>
                <div class="transcription-text">${results}</div>
                <!--<button onClick=${analyze}>Analyze</button> -->
            </div>
        </main>
    `
}

render(html`<${App} />`, document.getElementById("preact-root"))