import React from 'react'
import Nav from '../@components/header'
import './style.scss'

const url_spoken = 'https://github.com/pedrooaugusto/speech-to-code/tree/main/spoken-vscode-driver#vscode-spoken-driver'

export default React.memo(function Webapp(props: { lang: string }) {
    return (
        <React.Fragment>
            <Nav />
            <main className="home">
                <div className="content">
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/X61A9e8TuKc" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    <h1>Speech2Code</h1>
                    {/*<p>
                        Speech2Code is a web application that converts speech to code (<u><i><small>copilot suggested that</small></i></u>).
                    </p>*/}
                    <p>
                        Speech2Code is an application developed to help programmers suffering from RSI continue
                        to exercise their main activity by using voice commands instead of the hands to type code.
                        The ideia is that instead of typing <code>let value = 7;</code> you can just say <span>“new variable value equals number 7”</span>.
                    </p>
                    <p>
                        Speech2Code also comes with an extension for VSCode called {' '}
                        <a target='_blank' rel='noreferrer' href={url_spoken}>Spoken</a>{' '}, 
                        is through that extension that it can communicate and control VSCode.
                    </p>
                    <p>
                        Currently, it only has support for the JavaScript programming language
                        in the Visual Studio Code Editor.
                    </p>
                    <p>
                        Check out the <a rel='noreferrer' href='/webapp'>demo</a> to see it working.
                    </p>
                </div>
            </main>
        </React.Fragment>
    )
})
