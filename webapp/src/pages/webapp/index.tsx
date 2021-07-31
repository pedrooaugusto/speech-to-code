import React from 'react'
import Nav from '../@components/header'
import Editor from './editor'
import Speech2Code from './speech2code'
import Tutorial from './tutorial'
import './style.scss'

export default function Webapp(props: any) {

    return (
        <React.Fragment>
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
        </React.Fragment>
    )
}