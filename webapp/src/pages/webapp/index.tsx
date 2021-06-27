import React from 'react'
import Nav from '../@components/header'

export default function Webapp(props: any) {

    return (
        <React.Fragment>
            <Nav />
            <main className="webapp">
                <div className="code-editor">
                    CODE HERE!
                </div>
                <div className="speech2code">
                    TOOL HERE!
                </div>
            </main>
        </React.Fragment>
    )
}