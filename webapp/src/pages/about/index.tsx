import React from 'react'
import Nav from '../@components/header'
import './style.scss'
import diagram from './inner-workings-diagram-en-us.png'

export default React.memo(function Webapp(props: { lang: string }) {
    return (
        <React.Fragment>
            <Nav />
            <main className="about">
                <div className="content">
                    <div className="main-title">
                        <h1>
                            About
                        </h1>
                        <div>What is this website</div>
                    </div>
                    <p>
                        Speech2Code is an desktop application that let's you control your favorite IDE using just voice commands, <br/>
                        that means you can write programs using just your voice, without typing on the keyboard. It was developed <br/>
                        as part of my undergraduate dissertation in Computer Science, in which I proposed and developed<br/> an assistive
                        technology tool to help programmers suffering from Repetitive Strain Injury (RSI).
                    </p>
                    <p>
                        This demo website allows you test Speech2Code in the browser without installing it
                        on your local machine.<br />This is possible because this entire application is developed in JavaScript.
                    </p>
                    <div className="main-title">
                        <h3>
                            Resources
                        </h3>
                        <div>Useful links</div>
                    </div>
                    <ul>
                        <li>
                            <a href="https://github.com/pedrooaugusto/speech-to-code/releases">
                                Download Speech2Code Binaries
                            </a>
                        </li>
                        <li>
                            <a href="https://github.com/pedrooaugusto/speech-to-code/">Github</a>
                        </li>
                        <li>
                            <a href="https://github.com/pedrooaugusto/speech-to-code/tree/main/spoken/src/modules/typescript">List of Commands</a>
                        </li>
                        <li>
                            <a href="https://pedrooaugusto.github.io/Programming%20With%20Voice%20-%20Assistive%20Technology%20Tool%20For%20Programming%20In%20JavaScript%20Using%20Voice%20-%20Pedro%20Silva.pdf">
                                Dissertation (pt-br)
                            </a>
                        </li>
                        <li>
                            <a href="https://www.figma.com/file/glanqRtfVtW2Va1wybr5pkCh/TCC?node-id=18%3A2">
                                Application UI Design (Figma)
                            </a>
                        </li>
                    </ul>
                </div>
                <div className="pic">
                    <figure>
                        <img src={diagram} alt="System Inner Workings" />
                        <figcaption>How does this application works in a picture.</figcaption>
                    </figure>
                </div>
            </main>
        </React.Fragment>
    )
})
