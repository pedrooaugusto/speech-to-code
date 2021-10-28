import { useState, useCallback, useEffect } from 'react'
import { VoiceRecognitionHook } from '../use-voice-recognition'
import socket from '../socket-io'
import IpcRenderer from '../electron-ipc'

/**
 * @deprecated Now we use Azure voice recognition service, maybe in the future
 * we can make google STT work again.
 * @returns VoiceRecognitionHook
 */
export const useVoiceRecognition: VoiceRecognitionHook = () => {
    const [results, setResults] = useState('')
    const [error, setError] = useState<any>(null)
    const myRecorder = MyRecorder.getRecorder()

    useEffect(() => {
        console.log('[server.webapp.main.useVoiceRecognition] Initialization')

        myRecorder.init((data) => {
            socket.emit('VoiceRecognitionSession:data', { data })
        })

        socket.on('VoiceRecognitionSession:error', (err) => {
            console.error(err)
        })

        socket.on('VoiceRecognitionSession:results', (data) => {
            setTimeout(() => IpcRenderer.send('Spoken:analyze', data), 3000)
        })

        // Inter process comunication: listen to node context requests
        IpcRenderer.on('Spoken:analysisResults', (data) => {
            setResults(data.phrase)
        })

    }, [])

    const start = useCallback(async () => {
        // socket.emit('VoiceRecognitionSession:stop')
        socket.emit('VoiceRecognitionSession:start', {}, () => {
            myRecorder.start()  
        })
    }, [])

    const stop = useCallback(async () => {
        myRecorder.stop().then(() => {
            setTimeout(() => socket.emit('VoiceRecognitionSession:stop'), 750)
        })
    }, [])

    const analyzeSentence = useCallback(async (phrase: string) => {
        const w = {
            results: [{
                alternatives: [{
                    transcript: phrase
                }]
            }]
        }
        socket.emit('VoiceRecognitionSession:byPass', w)
    }, [])

    return {
        results,
        start,
        stop,
        error,
        setError,
        analyzeSentence
    }
}


type AudioContextWrapper = {
    audioContext: AudioContext,
    streamSource: MediaStreamAudioSourceNode,
    processor: ScriptProcessorNode,
    mediaTrack: MediaStreamTrack
}

class MyRecorder {
    static recorder: MyRecorder | null = null
    audioContextWrapper: AudioContextWrapper | null  = null
    rawStream: MediaStream | null = null

    static getRecorder(): MyRecorder {
        if (MyRecorder.recorder == null) {
            MyRecorder.recorder = new MyRecorder()
        }

        return MyRecorder.recorder
    }

    // Turns on the physic microphone
    // Also, asks for permission to use it
    async init(onAudioProcess: (buffer: ArrayBufferLike) => void) {
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
            const channelData = data.inputBuffer.getChannelData(0) || new Float32Array(4096)

            for (var b = channelData.length, d = new Int16Array(b); b--; ) {
                d[b] = 32767 * Math.min(1, channelData[b])
            }

            onAudioProcess(channelData.buffer)
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
        return (this.audioContextWrapper as AudioContextWrapper).audioContext.resume()
    }

    // Stop recording
    async stop() {
        console.log('[MyRecorder.stop] Recording stoppped')
        return (this.audioContextWrapper as AudioContextWrapper).audioContext.suspend()
    }
}
