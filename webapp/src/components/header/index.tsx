import React, { useState } from 'react'
import Spoken from 'spoken'
import ReactTooltip from 'react-tooltip';
import { GlobalContext } from '../../services/global-context'

export default function Header() {
    const [open, setOpen] = useState(false)
    const [langs, setLangs] = useState<{ lang: any, langName: any}[]>([])
    const context = React.useContext(GlobalContext)
    const selectedEditor = (context.editorState || []).find((a: any) => (a.status === 'ON' && a.current)) || {}

    React.useEffect(() => {
        const langs_ = []
        for (const module of Spoken.modules as { grammar: Record<string, Record<string, any>> }[]) {
            for (const item of Object.values(module.grammar)) {
                langs_.push({ lang: item[0].value.lang, langName: item[0].value.langName,})
            }
        }

        setLangs(langs_)
    }, [])

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
                            <img src="/logo48x48.png" width="25" height="25" alt="Speech2Code logo"/>
                        </figure>
                    </div>
                </div>
                <ul>
                    <li><a href="/#" onClick={() => setOpen(!open)}>Home</a></li>
                    <li><a href="/#/spoken" onClick={() => setOpen(!open)}>{i18n(context.language)('Modules')()}</a></li>
                    <li><a href="/#/help" onClick={() => setOpen(!open)}>{i18n(context.language)('Help')()}</a></li>
                    <li><a href="/#/about" onClick={() => setOpen(!open)}>About</a></li>
                </ul>
                <div className="divider"></div>
                <div className="settings">
                    <div className="title">Settings</div>
                    <div className="settings-list">
                        <div className="setting">
                            <label>
                                Current editor:
                                <span
                                    data-tip="Which code editor is Speech2Code controlling ? <br/><br/>Preferred option is Visual Studio Code."
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
                                Input language:
                                <span
                                    data-tip="In what language are the voice commands be said ?"
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
                                Enable Debug:
                                <span
                                    data-tip="Displays a text box where you can write commands instead of saying it"
                                >
                                    <i className="fa fa-question-circle" />
                                </span>
                            </label>
                            <input
                                type="checkbox"
                                checked={context.__debug}
                                name="debug"
                                onChange={() => context.toggleDebug()}
                            />
                        </div>
                        <div className="setting">
                            <label>
                                Client version: <b>{window.electronShellInfo?.appVersion || 'error ??'}</b>
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

const texts: Record<string, Record<string, any>> = {
    'en-US': {

    },
    'pt-BR': {
        'Help': () => 'Ajuda',
        'Modules': () => 'Módulos'
    }
}

const i18n = (lang: string) => (textId: string) => texts[lang][textId] || (() => textId)