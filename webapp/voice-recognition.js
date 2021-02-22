import { useState, useCallback } from 'https://unpkg.com/preact@10.3.2/hooks/dist/hooks.module.js?module'
const session = require('../src/voice-recognition-session')

let mediaRecorder = null

navigator.mediaDevices.getUserMedia({
    audio: {
        echoCancellation: !false,
        noiseSuppression: false,
        autoGainControl: false
    },
    video: false
}).then(stream => {
    mediaRecorder = new MediaRecorder(stream)
})

export function useVoiceRecognition() {
    const [results, setResults] = useState({})

    console.log(session)

    const start = useCallback(() => {
        // session.close()
        session.newSession()
            .on('error', err => {
                console.error(err)
            })
            .on('data', data => {
                console.log(`Transcription: ${data.results[0].alternatives[0].transcript}`)
            })

        mediaRecorder.ondataavailable = (event) => {
            console.log(event.data)
            session.current().write(event.data)
        }

        session.start()
        mediaRecorder.start()
    })

    const stop = useCallback(() => {
        mediaRecorder.stop()
        session.end()
    })

    return {
        results,
        start,
        stop
    }
}

export function start() {
    mediaRecorder.ondataavailable = (event) => {
        console.log(event.data)
        // send to server - socket.io
    }
    mediaRecorder.onstop = (event) => {
        // send to sever
    }
    mediaRecorder.start()
}

export function stop() {
    mediaRecorder.stop()
}