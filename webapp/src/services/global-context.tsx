import React from 'react'
import Spoken, { SpokenCommand } from 'spoken'
import IpcRenderer from './electron-ipc'

export const GlobalContext = React.createContext<any>({})

export default function GloablContext(props: any) {
    const [state, setState] = React.useState<Record<string, any>>({ language: 'pt-BR' })

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

        IpcRenderer.on('Config:onChangeEditorState', (e) => {
            setState((sstate) => ({
                ...sstate,
                editorState: e
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