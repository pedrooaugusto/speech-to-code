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

    async init(lang: string) {
        const [authConfig, err] = await getAuthToken(lang)

        if (authConfig == null) {
            // @ts-ignore
            return this.handlers.has('error') && this.handlers.get('error')(err)
        }

        SpeechSDK.Recognizer.enableTelemetry(false)

        this.speechConfig = SpeechSDK.SpeechConfig.fromAuthorizationToken(authConfig.token, authConfig.region)
        this.speechConfig.endpointId = authConfig.endpointId

        this.speechConfig.speechRecognitionLanguage = lang
        this.speechConfig.setServiceProperty('punctuation', 'explicit', SpeechSDK.ServicePropertyChannel.UriQueryParameter)
        this.audioConfig  = SpeechSDK.AudioConfig.fromDefaultMicrophoneInput()
        this.recognizer = new SpeechSDK.SpeechRecognizer(this.speechConfig, this.audioConfig)

        this.recognizer.recognizing = throttle((sender: SpeechSDK.Recognizer, event: SpeechSDK.SpeechRecognitionEventArgs) => {
            const fn = this.handlers.get('results')

            if(fn != null) fn(event.result, false)
        }, 1000)

        this.recognizer.recognized = (sender, event) => {
            const fn = this.handlers.get('results')

            if(fn != null) fn(event.result, true)
        }
    }

    start() {
        if (this.recognizer == null) return console.error('[webapp.services.azure-voice-recognition]: Session is closed!')

        this.recognizer.startContinuousRecognitionAsync(() => {
            console.log('[webapp.services.azure-voice-recognition]: Started')
        }, (err) => {
            console.error(err)
        })

    }

    stop() {
        if (this.recognizer == null) return console.error('[webapp.services.azure-voice-recognition]: Session is closed!')

        this.recognizer.stopContinuousRecognitionAsync(() => {
            console.info('[webapp.services.azure-voice-recognition]: Stopped')
        })
        // this.recognizer.close()
    }

    destroy () {
        console.log('destroyed')
        this.recognizer?.close()
        this.audioConfig?.close()
        this.speechConfig?.close()

        this.recognizer = null
        this.audioConfig = null
        this.speechConfig = null
        this.handlers.clear()
    }

    on(event: string, fn: (...args: any) => void) {
        this.handlers.set(event, fn)

        return this
    }
}

async function getAuthToken(lang: string = ''): Promise<[{ token: string; region: string; endpointId: string } | null, Error | null]> {
    try {
        const hn = process.env.REACT_APP_HN
        const hv = process.env.REACT_APP_HV
        const sttEndpoint = process.env.REACT_APP_STT_ENDPOINT || ''

        const headers = new Headers()

        if (hn && hv) {
            headers.append(hn, hv)
        }

        const res = await fetch(sttEndpoint + '/api/azure/token?lang=' + lang, { headers })

        return [await res.json(), null]
    } catch(e) {
        console.error(e)

        return [null, e as Error]
    } 
}

function throttle<T extends CallableFunction>(fn: T, time: number) {
    let lastCall = 0

    return (...args: any) => {
        if (Date.now() - lastCall >= time) {
            lastCall = Date.now()

            return fn(...args)
        }
    }
}