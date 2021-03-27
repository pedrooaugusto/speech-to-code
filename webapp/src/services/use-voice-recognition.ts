export type VoiceRecognitionHook = () => ({
    results: string,
    start: () => Promise<void>,
    stop: () => Promise<void>,
    analyzeSentence: (phrase: string) => Promise<void>
})
