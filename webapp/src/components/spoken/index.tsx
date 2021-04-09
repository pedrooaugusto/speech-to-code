import React, { useState, useEffect } from 'react'
import Spoken from 'spoken'
import api from '../api'

type ModuleDefinition = {
    name: string,
    desc: string,
    commands: CommandDefinition[]
}

type ModalInfo = {
    module: ModuleDefinition,
    command: CommandDefinition
}

type CommandDefinition = {
    id: number,
    desc: string,
    phrases?: string[],
    impl: string
}


export default function SpokenModules() {
    const [modules, setModules] = useState<ModuleDefinition[]>([])
    const [modalInfo, setModalInfo] = useState<null | ModalInfo>(null)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        const modules = [{
            name: 'Typescript',
            desc: 'The default module for typescript - code with voice using TypeScript',
            commands: (Spoken.grammars?.langs?.['en-US'] || []).map(({ value }: Record<string, Record<string, unknown>>) => ({
                id: value.id,
                desc: value.label,
                impl: value.impl,
                phrases: (value.phrases as string).split(";")
            }))
        }]

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
                {modules.map(m => {
                    return (
                        <div className={`module ${open ? 'open' : ''}`} key={m.name}>
                            <div className="module__title">
                                {m.name}
                                <span onClick={() => setOpen(!open)}>❯</span>
                            </div>
                            <div className="module__desc">{m.desc}</div>
                            <div className="module__commands">
                                <ul>
                                    {Object.values(m.commands).map(c => {
                                        return (
                                            <li
                                                onClick={() => setModalInfo({ module: m, command: c })}
                                                key={c.id}
                                            >
                                                {c.desc}
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
                            <h2>{modalInfo.module.name}</h2>
                            <span title="close" onClick={() => setModalInfo(null)}>×</span>
                            <div>{modalInfo.module.desc}</div>
                        </div>
                        <div className="divider"></div>
                        <div className="module__main">
                            <h4>Command:</h4>
                            <div className="field">
                                <div className="label">#ID:</div>
                                <input type="text" readOnly className="value" value={modalInfo.command.id}/>
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
                                    {(modalInfo.command.phrases || []).map((value) => {
                                        return (
                                            <li className="idiom" key={value}>
                                                <input type="text" defaultValue={value} name="phrase"/>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="module__footer">
                        <button>Save</button>
                        <button>Remove</button>
                    </div>
                </div>
            )}
        </main>
    )
}