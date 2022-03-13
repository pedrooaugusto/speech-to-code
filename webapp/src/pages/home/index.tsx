import React from 'react'
import Nav from '../@components/header'
import './style.scss'

const url_spoken = 'https://github.com/pedrooaugusto/speech-to-code/tree/main/spoken-vscode-driver#vscode-spoken-driver'

export default React.memo(function Webapp(props: { lang: 'en-US' | 'pt-BR' | string }) {
    const i18n = i18n_[props.lang as ('en-US' | 'pt-BR')]

    return (
        <React.Fragment>
            <Nav />
            <main className="home">
                <div className="content">
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/I71ETEeqa5E" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                    <h1>Speech2Code</h1>
                    {/*<p>
                        Speech2Code is a web application that converts speech to code (<u><i><small>copilot suggested that</small></i></u>).
                    </p>*/}
                    <p>
                        {i18n['desc']}
                    </p>
                    <p>
                        {i18n['extension']}
                    </p>
                    <p>
                        {i18n['limit']}
                    </p>
                    <p>
                        {i18n['source']}
                    </p>
                </div>
            </main>
        </React.Fragment>
    )
})

const i18n_ = {
    'en-US': {
        'desc': <>
            Speech2Code is an application developed to help programmers suffering from Repetitive Strain Injury
            to continue exercising their main activity by using voice commands instead of hands to type code.
            The ideia is that instead of typing <code>let value = 7;</code> in the IDE you can just say&nbsp;
            <span>“new variable value equals number 7”</span>.
        </>,
        'extension': <>
            Speech2Code also comes with a companion VSCode extension called {' '}
            <a target='_blank' rel='noreferrer' href={url_spoken}>Spoken</a>{' '}, 
            is through that extension that it can communicate with and control VSCode.
        </>,
        'limit': <>
            Currently, it only has support for the JavaScript programming language and the Visual Studio Code Editor.
        </>,
        'source': <>
            Check out the <a rel='noreferrer' href={process.env.PUBLIC_URL + '/en/webapp'}>demo</a> to see it working or read more about it at&nbsp;
            <a target='_blank' rel='noreferrer' href={'https://pedrooaugusto.github.io/Programming%20With%20Voice%20-%20Assistive%20Technology%20Tool%20For%20Programming%20In%20JavaScript%20Using%20Voice%20-%20Pedro%20Silva.pdf'}>article</a>.
        </>
    },
    'pt-BR': {
        'desc': <>
            Speech2Code é uma aplicação desenvolvida para auxiliar programadores que sofrem de lesão por esforço repetitivo
            a continuar exercendo sua atividade principal usando comandos de voz ao invés das mãos para escrever código.
            A ideia é que em vez de escrever <code>let valor = 7;</code> na IDE você pode simplesmente dizer&nbsp;
            <span>“nova variável valor igual a número 7”</span>.
        </>,
        'extension': <>
            Speech2Code é acompanhado de uma extensão para VSCode chamada <a target='_blank' rel='noreferrer' href={url_spoken}>Spoken</a>{' '},
            que permite que ele se comunique e controle o VSCode.
        </>,
        'limit': <>
            Atualmente só existe suporte para a linaguagem de programação JavaScript e o editor Visual Studio Code.
        </>,
        'source': <>
            Confira a <a rel='noreferrer' href={process.env.PUBLIC_URL + '/pt/webapp'}>demonstração</a> ou leia mais no&nbsp;
            <a target='_blank' rel='noreferrer' href={'https://pedrooaugusto.github.io/Programming%20With%20Voice%20-%20Assistive%20Technology%20Tool%20For%20Programming%20In%20JavaScript%20Using%20Voice%20-%20Pedro%20Silva.pdf'}>artigo</a>.
        </>
    }
}
