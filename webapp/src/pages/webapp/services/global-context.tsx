import React from 'react'
import { concretize } from '../tutorial/problems'

declare global {
    interface Console { logs?: string[][], defaultLog?: Function }
}

export type MyContextType = {
    changeProblem: (id: number) => void
    changeLanguage: (lang: string) => any
    problem: ReturnType<typeof concretize>,
    isMobile: boolean
} & State

type State = {
    language: string
    problemIndex: number
}

// @ts-ignore
export const GlobalContext = React.createContext<MyContextType>({})

export default function GloablContext(props: { children: any, lang: string }) {
    const [state, setState] = React.useState<State>({
        language: props.lang,
        problemIndex: 0
    })

    const changeLanguage = React.useCallback((lang: string) => setState((s) => ({...s, language: lang})), [])

    const changeProblem = React.useCallback((id: number) => setState((s) => ({ ...s, problemIndex: id })), [])

    const isMobile = window.matchMedia("only screen and (max-width: 900px)").matches

    const value = React.useMemo(() => ({
        language: state.language,
        problemIndex: state.problemIndex,
        changeProblem,
        changeLanguage,
        isMobile,
        problem: concretize(state.problemIndex, state.language as 'en-US' | 'pt-BR'),
    }), [state.language, state.problemIndex, changeLanguage, changeProblem, isMobile])

    return (
        <GlobalContext.Provider value={value}>
            {props.children}
        </GlobalContext.Provider>
    )
}