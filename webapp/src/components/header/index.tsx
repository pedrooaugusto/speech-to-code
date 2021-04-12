import React, { useState } from 'react'
import { GlobalContext } from '../../services/global-context'

export default function Header() {
    const [open, setOpen] = useState(false)
    const context = React.useContext(GlobalContext)
    const selectedEditor = (context.editorState || []).find((a: any) => (a.status === 'ON' && a.current)) || {}

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
                        <figure>
                            <img src="/logo48x48.png" width="25" height="25" alt="Speech2Code logo"/>
                        </figure>
                    </div>
                </div>
                <ul>
                    <li><a href="/#" onClick={() => setOpen(!open)}>Home</a></li>
                    <li><a href="/#/spoken" onClick={() => setOpen(!open)}>Modules</a></li>
                    <li><a href="/#/about" onClick={() => setOpen(!open)}>About</a></li>
                </ul>
                <div className="divider"></div>
                <div className="settings">
                    <div className="title">Settings</div>
                    <div className="settings-list">
                        <div className="setting">
                            <label>Current editor:</label>
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
                            <label>Input language:</label>
                            <select className="input">
                                <option value="default">English</option>
                                <option value="default">Português</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`menu-items-shade ${open ? 'open' : ''}`} onClick={() => setOpen(!open)}></div>
            <div className="brand">
                <div className="title"><i className="fa fa-angle-right"></i> ./speech-to-code</div>
            </div>
        </header>
    )
}