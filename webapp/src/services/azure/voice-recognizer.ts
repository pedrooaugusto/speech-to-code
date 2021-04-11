import * as SpeechSDK from 'microsoft-cognitiveservices-speech-sdk'

export default class MyRecognizer {
    static recognizer : MyRecognizer | null = null
    private speechConfig: SpeechSDK.SpeechConfig | null = null
    private audioConfig: SpeechSDK.AudioConfig | null = null
    private recognizer: SpeechSDK.SpeechRecognizer | null = null
    private handlers = new Map<string, Function>()

    static getRecognizer(): MyRecognizer {
        if (MyRecognizer.recognizer == null) {
            MyRecognizer.recognizer = new MyRecognizer()
        }

        return MyRecognizer.recognizer
    }

    constructor() {}

    async init() {
        // THIS IS BAD!
        // https://github.com/Azure-Samples/AzureSpeechReactSample
        // https://github.com/Azure-Samples/cognitive-services-speech-sdk/blob/master/quickstart/javascript/browser/from-microphone/index.html

        const res = await fetch('/azure/token')
        const { key } = await res.json()

        this.speechConfig = SpeechSDK.SpeechConfig.fromSubscription(key, 'brazilsouth')
        this.speechConfig.speechRecognitionLanguage = 'pt-BR'
        this.speechConfig.setServiceProperty('punctuation', 'explicit', SpeechSDK.ServicePropertyChannel.UriQueryParameter);
        this.audioConfig  = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput()
        this.recognizer = new SpeechSDK.SpeechRecognizer(this.speechConfig, this.audioConfig)
    }

    start() {
        if (this.recognizer == null) return console.error('[webapp.services.azure-voice-recognition]: Session is closed!')

        const wavFragments: { [id: number]: ArrayBuffer } = []
        let wavFragmentCount: number = 0
        SpeechSDK.Connection.fromRecognizer(this.recognizer).messageSent = function(args) {
            if (args.message.path === 'audio' && args.message.isBinaryMessage && args.message.binaryMessage !== null) {
                wavFragments[wavFragmentCount++] = args.message.binaryMessage;
            }
        }

        // this.recognizer.startContinuousRecognitionAsync

        this.recognizer.recognizeOnceAsync(result => {
            console.log('[webapp.services.azure-voice-recognition]: Results ', result)
            if(result.reason == SpeechSDK.ResultReason.RecognizedSpeech) {

                {
                    let byteCount: number = 0;
                    for (let i: number = 0; i < wavFragmentCount; i++) {
                        byteCount += wavFragments[i].byteLength;
                    }
                
                    // Output array.
                    const sentAudio: Uint8Array = new Uint8Array(byteCount);
                
                    byteCount = 0;
                    for (let i: number = 0; i < wavFragmentCount; i++) {
                        sentAudio.set(new Uint8Array(wavFragments[i]), byteCount);
                        byteCount += wavFragments[i].byteLength;
                    }
                
                    // Set the file size in the wave header:
                    /*const view = new DataView(sentAudio.buffer);
                    view.setUint32(4, byteCount, true);
                    view.setUint32(40, byteCount, true);*/

                    // @ts-ignore
                    window.sentAudio = sentAudio
                    new AudioContext().decodeAudioData(sentAudio.buffer, (buffer) => {
                        console.log(buffer)
                    })
                }

                const h = this.handlers.get('results')

                if(h != null) h(result)
            } else {
                const h = this.handlers.get('error')

                if(h != null) h({ err: new Error('Something went wrong!'), result })
            }
        }, (err) => {
            console.log('[webapp.services.azure-voice-recognition]: Err ' + err.toString())

            const h = this.handlers.get('error')

            if(h != null) h({ err: new Error('Something went wrong!'), result: null })
        })
    }

    stop() {
        if (this.recognizer == null) return console.error('[webapp.services.azure-voice-recognition]: Session is closed!')

        // this.recognizer.close()
    }

    destroy () {
        this.recognizer?.close()
        this.recognizer = null
        this.audioConfig = null
        this.handlers.clear()
    }

    on(event: string, fn: (...args: any) => void) {
        this.handlers.set(event, fn)

        return this
    }
}
