import { useState, useCallback, useEffect } from 'https://unpkg.com/preact@10.3.2/hooks/dist/hooks.module.js?module'
import socket from './socket.js'

export function useVoiceRecognition() {
    const [results, setResults] = useState({})
    const myRecorder = MyRecorder.getRecorder()

    console.log(socket)

    useEffect(async () => {
        console.log('did mount')

        myRecorder.init((data) => {
            socket.emit('VoiceRecognitionSession:data', { data })
        })

        socket.on('VoiceRecognitionSession:error', (err) => {
            console.error(err)
        })

        socket.on('VoiceRecognitionSession:results', (data) => {
            console.log(JSON.stringify(data))
            setResults(data)
        })

    }, [])

    const start = useCallback(async () => {
        //socket.emit('VoiceRecognitionSession:stop')
        socket.emit('VoiceRecognitionSession:start', {}, () => {
            myRecorder.start()  
        })
    })

    const stop = useCallback(async () => {
        myRecorder.stop().then(() => {
            setTimeout(() => socket.emit('VoiceRecognitionSession:stop'), 750)
        })
    })

    return {
        results,
        start,
        stop
    }
}

class MyRecorder {
    static recorder = null
    audioContextWrapper = null
    rawStream = null

    static getRecorder() {
        if (MyRecorder.recorder == null) {
            MyRecorder.recorder = new MyRecorder()
        }

        return MyRecorder.recorder
    }

    // Turns on the physic microphone
    // Also, asks for permission to use it
    async init(onAudioProcess) {
        this.rawStream = await navigator.mediaDevices.getUserMedia({
            audio: {
                echoCancellation: !false,
                noiseSuppression: false,
                autoGainControl: false
            },
            video: false
        })

        const audioContext = new AudioContext()

        // For some reasson it start 'running' (so we supend as soon we create)
        audioContext.suspend()

        // no idea what i am doing (just reverse engineering the source of google 'Try it' page (speech-to-text))
        const streamSource = audioContext.createMediaStreamSource(this.rawStream)
        const processor = audioContext.createScriptProcessor(4096, 1, 1)

        processor.connect(audioContext.destination)
        streamSource.connect(processor)

        processor.addEventListener('audioprocess', (data) => {
            // I got that code from google speech-to-text 'Try it' page
            data = data.inputBuffer.getChannelData(0) || new Float32Array(4096)

            for (var b = data.length, d = new Int16Array(b); b--; ) {
                d[b] = 32767 * Math.min(1, data[b])
            }

            onAudioProcess(d.buffer)
        })

        this.audioContextWrapper = {
            audioContext,
            streamSource,
            processor,
            mediaTrack: this.rawStream.getTracks()[0]
        }

        console.log('[MyRecorder.init] Microphone is on')
    }

    // Start recording
    async start() {
        console.log('[MyRecorder.start] Recording started')
        return this.audioContextWrapper.audioContext.resume()
    }

    // Stop recording
    async stop() {
        console.log('[MyRecorder.stop] Recording stoppped')
        return this.audioContextWrapper.audioContext.suspend()
    }
}
