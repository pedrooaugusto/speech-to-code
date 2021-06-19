import React from 'react'
import Spoken, { SpokenCommand } from 'spoken'
import IpcRenderer from './electron-ipc'

export type MyContextType = {
    changeEditor: (name: string) => void
    changeLanguage: (lang: string) => any,
    toggleShade: (value?: boolean) => void,
    toggleDebug: () => void,
    executeInternalCommand: (command: SpokenCommand) => void
} & State

type State = {
    language: string
    shadeIsOpen: boolean
    editorState: Record<string, any>[]
    spokenIsLoaded: boolean
    connectedToVSCode: boolean
    __debug: boolean
}

// @ts-ignore
export const GlobalContext = React.createContext<MyContextType>({})

export default function GloablContext(props: { children: any }) {
    const [state, setState] = React.useState<State>({
        language: 'pt-BR',
        shadeIsOpen: false,
        __debug: false,
        spokenIsLoaded: false,
        connectedToVSCode: false,
        editorState: []
    })

    const changeEditor = (t: string) => {
        IpcRenderer.send('Config:changeEditor', t)
    }

    const toggleShade = (t?: boolean) => {
        setState((sstate) => ({
            ...sstate,
            shadeIsOpen: t ?? !state.shadeIsOpen
        }))
    }

    const toggleDebug = () => {
        setState((sstate) => ({
            ...sstate,
            __debug: !sstate.__debug
        }))
    }

    const changeLanguage = (lang: string) => setState((s) => ({...s, language: lang}))

    const executeInternalCommand = (command: SpokenCommand) => {
        if (command.id === '__change_lang') {
            IpcRenderer.send('VoiceRecognition:setRecording', false)
            // fix that, should support more languages
            setTimeout(() => changeLanguage(command.lang === 'pt-BR' ? 'en-US' : 'pt-BR'), 1500)
            setTimeout(() => IpcRenderer.send('VoiceRecognition:setRecording', true), 3000)
        }
    }

    React.useEffect(() => {
        Spoken.init().then(() => {
            setState((state) => ({ ...state, spokenIsLoaded: true }))
        })

        IpcRenderer.on('Config:onChangeEditorState', (editorState) => {
            const connected = editorState?.find(({ name }: { name: string }) => name.toLowerCase() === 'vscode')?.status === 'ON'

            if (!connected) IpcRenderer.send('VoiceRecognition:setRecording', false)

            setState((sstate) => ({
                ...sstate,
                editorState: editorState,
                connectedToVSCode: connected
            }))
        })

        // Request the current editor
        IpcRenderer.send('Config:changeEditor', null)
    }, [])

    return (
        <GlobalContext.Provider
            value={{
                ...state,
                changeEditor,
                changeLanguage,
                toggleShade,
                toggleDebug,
                executeInternalCommand
            }}
        >
            {state.spokenIsLoaded ? props.children : (<div>Loading...</div>)}
        </GlobalContext.Provider>
    )
}