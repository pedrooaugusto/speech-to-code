import Speech, { SpeechClient } from '@google-cloud/speech'

class VoiceRecognitionSession {
    handles: { [key: string]: (...args: any[]) => void } = {}
    recognizeStream: any = null
    client: SpeechClient

    constructor() {
        this.client = new Speech.SpeechClient()
    }

    start = () => {
        this.recognizeStream = this.client.streamingRecognize({
            config: {
                encoding: 'LINEAR16',
                sampleRateHertz: 48000,
                languageCode: 'pt-BR',
            },
            interimResults: false,
        })
        .on('error', this.handles['error'])
        .on('data', this.handles['data'])

        return this
    }

    end = () => {
        this.recognizeStream.end(() => {
            this.handles = {}
            this.recognizeStream.destroy()
        })
    }

    on = (evt: string, callback: (...args: any[]) => void) => {
        this.handles[evt] = callback
    }

    write(chunk: any, encoding?: string, cb?: Function) {
        this.recognizeStream.write(chunk)
    }
}

class Singleton {
    session: null | VoiceRecognitionSession = null

    newSession() {
        this.session = new VoiceRecognitionSession()

        return this.session
    }

    current() {
        if (this.session?.recognizeStream.writable) return this.session

        throw new Error('Session is closed')
    }
}

const instance = new Singleton()

export default (module.exports = instance)