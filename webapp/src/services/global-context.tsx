import React from 'react'
import Spoken from 'spoken'
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

    const changeLanguage = (lang: string) => setState((s) => ({...s, language: lang}))

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
                toggleShade
            }}
        >
            {state.spokenIsLoaded ? props.children : (<div>Loading...</div>)}
        </GlobalContext.Provider>
    )
}