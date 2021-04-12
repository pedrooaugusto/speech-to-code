import React from 'react'
import IpcRenderer from './electron-ipc'

export const GlobalContext = React.createContext<any>({})

export default function GloablContext(props: any) {
    const [state, setState] = React.useState<Record<string, any>>({})

    const changeEditor = (t: string) => {
        IpcRenderer.send('Config:changeEditor', t)
    }

    const toggleShade = (t?: boolean) => {
        setState({
            ...state,
            shadeIsOpen: t ?? !state.shadeIsOpen
        })
    }

    React.useEffect(() => {
        IpcRenderer.on('Config:onChangeEditorState', (e) => {
            setState({
                ...state,
                editorState: e
            })
        })

        // Request the current editor
        IpcRenderer.send('Config:changeEditor', null)
    }, [])

    return (
        <GlobalContext.Provider
            value={{
                ...state,
                changeEditor,
                toggleShade
            }}
        >
            {props.children}
        </GlobalContext.Provider>
    )
}