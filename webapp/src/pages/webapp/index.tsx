import React from 'react'
import Nav from '../@components/header'
import Editor from './editor'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Speech2Code from './speech2code'
import Tutorial from './tutorial'
import GlobalContext from './services/global-context'
import './style.scss'

export default React.memo(function Webapp(props: { lang: string }) {
    return (
        <GlobalContext lang={props.lang}>
            <Nav />
            <main className="webapp">
                <div className="tutorial">
                    <Tutorial />
                </div>
                <div className="code-editor">
                    <Editor />
                </div>
                <div className="speech2code">
                    <Speech2Code />
                </div>
            </main>
        </GlobalContext>
    )
})
