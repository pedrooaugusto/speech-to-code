import { useState, useCallback, useEffect } from 'https://unpkg.com/preact@10.3.2/hooks/dist/hooks.module.js?module'
import socket from './socket.js'

export function useVoiceRecognition() {
    const [results, setResults] = useState({})
    const myRecorder = MyRecorder.getRecorder()

    console.log(socket)

    useEffect(async () => {
        console.log('did mount')

        //const r = await Microphone.getMediaRecorder()
        //const r = await Microphone.getAudioContext()

        /*r.ondataavailable = (event) => {
            console.log('eoi')
            var blob = new Blob([event.data], { 'type' : 'audio/ogg; codecs=opus' })
            var audioURL = URL.createObjectURL(blob)
            console.log(audioURL)
            var audio = document.createElement('audio')
            audio.setAttribute('controls', '')
            audio.controls = true
            audio.src = audioURL
            document.body.appendChild(audio)
            socket.emit('VoiceRecognitionSession:data', { data: event.data })
        }*/

        /*r.processor.onaudioprocess = (data) => {
            console.log('eoi')
            console.log(data)

            data = data.inputBuffer.getChannelData(0) || new Float32Array(4096)
            
            for (var b = data.length, d = new Int16Array(b); b--; ) {
                d[b] = 32767 * Math.min(1, data[b])
            }
    
            this.socket.send(d.buffer)

            socket.emit('VoiceRecognitionSession:data', { data: d.buffer })
        }*/

        myRecorder.init((data) => {
            socket.emit('VoiceRecognitionSession:data', { data })
        })

        socket.on('VoiceRecognitionSession:error', (err) => {
            console.error(err)
        })

        socket.on('VoiceRecognitionSession:results', (data) => {
            console.log(`Transcription: ${data.results[0].alternatives[0].transcript}`)
            setResults(data)
        })

    }, [])

    const start = useCallback(async () => {
        //socket.emit('VoiceRecognitionSession:stop')
        socket.emit('VoiceRecognitionSession:start', {}, () => {
            myRecorder.start()  
        })

        //const r = await Microphone.getMediaRecorder()

        //r.start()
        // setTimeout(() => myRecorder.start(), 700)
    })

    const stop = useCallback(async () => {
        //const r = await Microphone.getMediaRecorder()

        //r.stop()

        myRecorder.stop().then(() => {
            socket.emit('VoiceRecognitionSession:stop')
        })
    })

    return {
        results,
        start,
        stop
    }
}


class Microphone {
    static stream = null
    static mediaRecorder = null
    static audioContext = null

    static async getMicrophone() {
        try {
            if (Microphone.stream == null) {
                Microphone.stream = await navigator.mediaDevices.getUserMedia({
                    audio: {
                        echoCancellation: !false,
                        noiseSuppression: false,
                        autoGainControl: false
                    },
                    video: false
                })
            }

            return Microphone.stream
        } catch(err) {
            console.error(err)

            Microphone.stream = null
            Microphone.mediaRecorder = null
            Microphone.audioContext = null

            return null
        }
    }

    static async getMediaRecorder() {
        try {
            if (Microphone.mediaRecorder == null) {
                await Microphone.getMicrophone()

                Microphone.mediaRecorder = new MediaRecorder(Microphone.stream)

                return Microphone.mediaRecorder
            }

            return Microphone.mediaRecorder
        } catch(err) {
            console.error(err)

            Microphone.stream = null
            Microphone.mediaRecorder = null
            Microphone.audioContext = null

            return null
        }
    }

    static async getAudioContext() {
        try {
            if (Microphone.audioContext == null) {
                const stream = await Microphone.getMicrophone()

                const audioContext = new AudioContext()
                audioContext.suspend()

                const streamSource = audioContext.createMediaStreamSource(stream)
                const processor = audioContext.createScriptProcessor(4096, 1, 1)

                processor.connect(audioContext.destination)
                streamSource.connect(processor)

                Microphone.audioContext = {
                    audioContext,
                    streamSource,
                    processor,
                    mediaTrack: stream.getTracks()[0]
                }

                return Microphone.audioContext
            }

            return Microphone.audioContext

        } catch(err) {
            console.error(err)

            Microphone.stream = null
            Microphone.mediaRecorder = null
            Microphone.audioContext = null

            return null
        }        
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