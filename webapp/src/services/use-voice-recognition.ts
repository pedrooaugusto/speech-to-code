export type VoiceRecognitionHook = () => ({
    results: RecognitionRequest | string | null,
    start: () => Promise<void>,
    stop: () => Promise<void>,
    error: RecognitionError | null,
    setError: (error: RecognitionError) => void,
    analyzeSentence: (phrase: string, timeout?: number | null) => Promise<void>
})

export type RecognitionRequest = {
    text: string,
    isFinal: boolean,
    id: number,
    recognized: boolean,
    command?: string
}

export type RecognitionError = {
    mainTitle: string
    title: string
    subTitle: string
    body: string | JSX.Element
    __error: Error
}