
export default class MyRecognizer {
    static instance: MyRecognizer | null = null
    public recognizing = false
    private recognizer: SpeechRecognition | null = null
    private handlers = new Map<string, Function>()

    static getRecognizer(): MyRecognizer {
        if (MyRecognizer.instance == null) {
            MyRecognizer.instance = new MyRecognizer()
        }

        return MyRecognizer.instance
    }

    async init(lang: string) {
        // @ts-ignore
        this.recognizer = new webkitSpeechRecognition()

        if (this.recognizer == null) {
            // @ts-ignore
            return this.handlers.get('error') != null ? this.handlers.get('error')() : null
        }

        // @ts-ignore
        const speechRecognitionList: SpeechGrammarList = new webkitSpeechGrammarList()
        speechRecognitionList.addFromString('#JSGF V1.0; grammar one; public <gap> = gap;', 1)
        speechRecognitionList.addFromString('#JSGF V1.0; grammar one; public <string> = string;', 1)

        this.recognizer.grammars = speechRecognitionList
        this.recognizer.continuous = true
        this.recognizer.lang = lang
        this.recognizer.interimResults = false
        this.recognizer.maxAlternatives = 1

        this.recognizer.onresult = (event) => {
            console.log('Results', event.results)

            const fn = this.handlers.get('results')

            if (fn != null) fn(event.results, true)
        }

        this.recognizer.onspeechend = () => {
            this.recognizer!.stop()
        }

        this.recognizer.onnomatch = (event) => {
            console.log('could not recognize that!')
        }

        this.recognizer.onerror = (event) => {
            const fn = this.handlers.get('error')

            if (fn != null) fn(event.error)
        }
    }

    start() {
        if (this.recognizer == null) return console.error('[webapp.services.chrome-voice-recognition]: Session is closed!')

        this.recognizer.start()

        this.recognizing = true

        console.log('[webapp.services.azure-voice-recognition]: Started')
    }

    stop() {
        if (this.recognizer == null) return console.error('[webapp.services.chrome-voice-recognition]: Session is closed!')

        this.recognizer.stop()

        this.recognizing = false

        console.info('[webapp.services.chrome-voice-recognition]: Stopped')
    }

    destroy() {
        console.log('destroyed')
        this.recognizer?.stop()
        this.recognizer?.abort()

        this.recognizer = null
        this.handlers.clear()
    }

    on(event: string, fn: (...args: any) => void) {
        this.handlers.set(event, fn)

        return this
    }
}
