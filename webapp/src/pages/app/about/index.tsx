import React from 'react'

export default function About() {
    return (
        <main className="about">
            <div className="wrapper">
                <div className="title">
                    <h2>About</h2>
                    <div className="sub">Some information about Speech2Code</div>
                </div>
                <div className="body">
                    Speech2Code is an application developed by me, <a rel="noreferrer" href="https://github.com/pedrooaugusto" target="_blank">Pedro Augusto</a>,
                    as part of my undergraduate thesis in computer science at UNICARIOCA university.
                    The purpose of this application is to help programmers suffering from
                    RSI (repetitive strain injury) to continue exercising their main activity: programming.<br/><br/>
                    If you speak portuguese you can read all about my <ThesisLink>dissertation here</ThesisLink>.<br/><br/>
                    Big thanks to everyone involved in the development of the following open source projects ({'❤︎'}):
                    Graphviz, Visual Studio Code, Graphviz (DOT) for VSCode, Graphlib, Graphlib-DOT, @hpcc-js/wasm,
                    svg2img, jest and node-ipc.<br/><br/>

                    Again, if you wanna know how this works read <ThesisLink>my dissertation</ThesisLink>{' '}
                    or watch <RickLink>this <b>simple</b> video</RickLink>.<br/><br/>

                    Github: <a rel="noreferrer" target="_blank" href="https://github.com/pedrooaugusto/speech-to-code"><small>https://github.com/pedrooaugusto/speech-to-code</small></a><br/><br/>

                    That is all, I guess. <br/><br/>
                </div>
            </div>
        </main>
    )
}

const ThesisLink = (props: { children: any }) => (
    <a
        rel="noreferrer"
        href="https://pedrooaugusto.github.io/Programming With Voice - Assistive Technology Tool For Programming In JavaScript Using Voice - Pedro Silva.pdf"
        target="_blank"
    >
        {props.children}
    </a>
)

const RickLink = (props: { children: any }) => (
    <a
        rel="noreferrer"
        href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        target="_blank"
    >
        {props.children}
    </a>
)