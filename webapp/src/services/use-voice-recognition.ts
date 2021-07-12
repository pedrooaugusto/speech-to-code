export type VoiceRecognitionHook = () => ({
    results: RecognitionRequest | string | null,
    start: () => Promise<void>,
    stop: () => Promise<void>,
    analyzeSentence: (phrase: string, timeout?: number | null) => Promise<void>
})

export type RecognitionRequest = {
    text: string,
    isFinal: boolean,
    id: number,
    recognized: boolean
}

class UseVoiceRecognitionService {
    
}