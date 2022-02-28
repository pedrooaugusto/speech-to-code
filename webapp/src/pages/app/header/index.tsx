import React, { useState } from 'react'
import Spoken from 'spoken'
import ReactTooltip from 'react-tooltip'
import { GlobalContext } from '../../../services/global-context'

export default function Header() {
    const [open, setOpen] = useState(false)
    const [langs, setLangs] = useState<{ lang: any, langName: any}[]>([])
    const context = React.useContext(GlobalContext)
    const selectedEditor = (context.editorState || []).find((a: any) => (a.status === 'ON' && a.current)) || {}
    const [appVersion, setAppVersion] = React.useState(window.electronShellInfo?.appVersion)

    React.useEffect(() => {
        const langs_ = []

        for (const module of Spoken.modules) {
            for (const item of Object.values(module.grammar)) {
                langs_.push({ lang: item[0].value.lang, langName: item[0].value.langName })
            }
        }

        if (appVersion == null) {
            fetch(window.__HOME_PAGE__ + '/manifest.json').then(res => res.json()).then(manifest => {
                setAppVersion(manifest.version ? manifest.version : appVersion)
            })
        }

        setLangs(langs_)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (context.mode === 'widget') return null

    return (
        <header>
            <div className="menu">
                <div className="icon" onClick={() => setOpen(!open)}>
                    ☰
                </div>
            </div>
            <div className={`menu-items ${open ? 'open' : ''}`}>
                <div className="about">
                    <div className="title">
                        Speech2Code
                        <figure onClick={() => context.toggleDebug()}>
                            <img src={window.__HOME_PAGE__ + '/logo48x48.png'} width="25" height="25" alt="Speech2Code logo"/>
                        </figure>
                    </div>
                </div>
                <ul>
                    <li>
                        <a href="#/" onClick={() => setOpen(!open)}>
                            <span>{i18n(context.language)('Home')}</span>
                        </a>
                    </li>
                    <li><a href="#/spoken/" onClick={() => setOpen(!open)}>{i18n(context.language)('Modules')}</a></li>
                    <li><a href="#/help/" onClick={() => setOpen(!open)}>{i18n(context.language)('Help')}</a></li>
                    <li>
                        <a href="#/about/" onClick={() => setOpen(!open)}>
                            <span>{i18n(context.language)('About')}</span>
                        </a>
                    </li>
                </ul>
                <div className="divider"></div>
                <div className="settings">
                    <div className="title">
                        {i18n(context.language)('Settings')}
                    </div>
                    <div className="settings-list">
                        <div className="setting">
                            <label>
                                {i18n(context.language)('Current editor')}:
                                <span
                                    data-tip={i18n(context.language)('current_editor_exp')}
                                >
                                    <i className="fa fa-question-circle" />
                                </span>
                            </label>
                            <select
                                className="input"
                                value={selectedEditor?.name || ''}
                                onChange={(evt: any) => context.changeEditor(evt.target.value)}
                            >
                                {!selectedEditor.name && (
                                    <option label=" "></option>
                                )}
                                {(context.editorState || []).map((item: any) =>
                                    <option
                                        value={item.name}
                                        disabled={item.status !== 'ON' ? true : false}
                                        key={item.name}
                                    >
                                        {item.name}
                                    </option>
                                )}
                            </select>
                        </div>
                        <div className="setting">
                            <label>
                                {i18n(context.language)('Input language')}:
                                <span
                                    data-tip={i18n(context.language)('In what language are the voice commands be said ?')}
                                >
                                    <i className="fa fa-question-circle" />
                                </span>
                            </label>
                            <select
                                className="input"
                                value={context.language || ''}
                                onChange={(evt: any) => context.changeLanguage(evt.target.value)}
                            >
                                {langs.map((item) =>
                                    <option
                                        value={item.lang}
                                        key={item.lang}
                                    >
                                        {item.langName}
                                    </option>
                                )}
                            </select>
                        </div>
                        <div className="setting">
                            <label>
                                {i18n(context.language)('Enable debug')}:
                                <span
                                    data-tip={i18n(context.language)('Displays a text box where you can write commands instead of saying it')}
                                >
                                    <i className="fa fa-question-circle" />
                                </span>
                            </label>
                            <div>
                                <input
                                    type="checkbox"
                                    checked={context.__debug}
                                    name="debug"
                                    onChange={() => context.toggleDebug()}
                                />
                            </div>
                        </div>
                        <div className="setting">
                            <label>
                                Client version: <b><VersionLink version={appVersion} /></b>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`menu-items-shade ${open ? 'open' : ''}`} onClick={() => setOpen(!open)}></div>
            <div className="brand">
                <div className="title"><i className="fa fa-angle-right"></i> ./speech-to-code</div>
            </div>
            <ReactTooltip multiline effect="solid" className="custom-tooltip" />
        </header>
    )
}

function VersionLink(props: { version?: string }): JSX.Element {
    const { version } = props

    if (version == null) return <React.Fragment>error ??</React.Fragment>

    return (
        <a target="_blank" rel="noreferrer" href={`https://github.com/pedrooaugusto/speech-to-code/releases/tag/v${version}`}>
            {version}
        </a>
    )
}

const texts: Record<string, Record<string, any>> = {
    'en-US': {
        'current_editor_exp': 'Which code editor is Speech2Code controlling ? <br/><br/>Preferred option is Visual Studio Code.'
    },
    'pt-BR': {
        'Help': 'Ajuda',
        'Modules': 'Módulos',
        'Home': 'Início',
        'Article': 'Artigo',
        'About': 'Sobre',
        'Settings': 'Configurações',
        'Current editor': 'Editor atual',
        'Input language': 'Linguagem de entrada',
        'Enable debug': 'Ativar depuração',
        'Displays a text box where you can write commands instead of saying it':
            'Exibe uma caixa de texto onde você pode escrever comandos ao invés de dizêlos',
        'In what language are the voice commands be said ?': 'Em que idioma os comandos de voz serão ditos ?',
        'current_editor_exp':
            'Qual é o editor de código que está sendo controlado pelo Speech2Code ? <br/><br/>A opção preferida é o Visual Studio Code.'
    }
}

const i18n = (lang: string) => (textId: string) => texts[lang][textId] || textId