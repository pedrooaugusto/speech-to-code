const Speech = require('@google-cloud/speech')

class VoiceRecognitionSession {
    handles = {}
    recognizeStream = null
    client = null

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

    recognizeFile = async (audio) => {
        const response = await this.client.recognize({
            config: {
                enableAutomaticPunctuation: false,
                encoding: 'FLAC',
                languageCode: "pt-BR",
                model: "default",
                sampleRateHertz: 48000
            },
            audio
        })

        console.log(JSON.stringify(response[0].results))
    }

    end = () => {
        this.recognizeStream.end(() => {
            // this.handles = {}
            // this.recognizeStream.destroy()
        })
    }

    on = (evt, callback) => {
        this.handles[evt] = callback

        return this
    }

    write(chunk, encoding, cb) {
        this.recognizeStream.write(chunk)
    }
}

class Singleton {
    session = null

    newSession() {
        this.session = new VoiceRecognitionSession()

        return this.session
    }

    current() {
        if (true || this.session?.recognizeStream?.writable) return this.session

        throw new Error('Session is closed')
    }

    close() {
        if (this.session != null) {
            this.session.end()
            // this.session = null
        }
    }
}

const instance = new Singleton()

module.exports = instance