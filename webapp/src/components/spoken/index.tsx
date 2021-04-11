import React, { useState, useEffect } from 'react'
import Spoken from 'spoken'
import api from '../api'

type GraphJsonView = {
    [key: string]: unknown,
    value: {
        id: string,
        label: string,
        impl: string,
        phrases: string,
        desc: string
    }
}

type SpokenModule = {
    id: string,
    desc: string,
    label: string,
    grammar: Record<string, GraphJsonView[]>
}

type ModalInfo = {
    module: SpokenModule,
    command: CommandDefinition
}

type CommandDefinition = {
    id: string,
    label: string,
    phrases: string,
    impl: string,
    desc: string
}


export default function SpokenModules() {
    const [modules, setModules] = useState<SpokenModule[]>([])
    const [modalInfo, setModalInfo] = useState<null | ModalInfo>(null)
    const [open, setOpen] = useState(false)
    const lang = 'en-US'

    useEffect(() => {
        const modules = Spoken.modules

        console.log(modules)

        setModules(modules)

    }, [])

    return (
        <main className="spoken">
            <div className="wrapper">
                <h2>Modules</h2>
                {/*<div className="search-box">
                    <input type="text" name="search" autocomplete="off" />
                </div>*/}
                {modules.map(mod => {
                    return (
                        <div className={`module ${open ? 'open' : ''}`} key={mod.id}>
                            <div className="module__title">
                                {mod.label}
                                <span onClick={() => setOpen(!open)}>❯</span>
                            </div>
                            <div className="module__desc">{mod.desc}</div>
                            <div className="module__commands">
                                <ul>
                                    {mod.grammar[lang].map((c) => {
                                        return (
                                            <li
                                                onClick={() => setModalInfo({ module: mod, command: c.value })}
                                                key={c.value.id}
                                            >
                                                {c.value.label}
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                    )
                })}
            </div>
            {modalInfo !== null && (
                <div className="module__details">
                    <div className="module__details__wrapper">
                        <div className="module__main-header">
                            <h2>{modalInfo.module.label}</h2>
                            <span title="close" onClick={() => setModalInfo(null)}>×</span>
                            <div>{modalInfo.module.desc}</div>
                        </div>
                        <div className="divider"></div>
                        <div className="module__main">
                            <h4>Command:</h4>
                            <div className="field">
                                <div className="label">#ID:</div>
                                <input type="text" readOnly className="value" value={modalInfo.command.id} />
                            </div>
                            <div className="field desc">
                                <div className="label">Description:</div>
                                <textarea defaultValue={modalInfo.command.desc} />
                            </div>
                            <div className="field impl">
                                <div className="label">Implementation:</div>
                                <textarea defaultValue={modalInfo.command.impl} />
                            </div>
                            <div className="field phrases">
                                <div className="label">Phrases:</div>
                                <ul className="idioms">
                                    {(modalInfo.command.phrases.split(';') || []).map((value) => {
                                        return (
                                            <li className="idiom" key={value}>
                                                <input type="text" defaultValue={value} name="phrase" readOnly />
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                    {/*<div className="module__footer">
                        <button>Save</button>
                        <button>Remove</button>
                    </div>*/}
                </div>
            )}
        </main>
    )
}