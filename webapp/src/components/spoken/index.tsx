import React, { useState, useEffect } from 'react'
import api from '../api'

type ModuleDefinition = {
    name: string,
    desc: string,
    categories: {
        [key: string]:  {
            desc: string,
            commands: CommandDefinition[]
        }
    } | { desc: string, commands: CommandDefinition[] }
}

type ModalInfo = {
    module: ModuleDefinition,
    category: {
        [key: string]:  {
            desc: string,
            commands: CommandDefinition[]
        }
    },
    command: CommandDefinition
}

type CommandDefinition = {
    id: number,
    desc: string,
    phrases: {
        [key: string]: string[]
    }
    impl: string
}


export default function Spoken() {
    const [modules, setModules] = useState<ModuleDefinition[]>([])
    const [modalInfo, setModalInfo] = useState<null | ModalInfo>(null)
    const [open, setOpen] = useState(false)

    useEffect(() => {
        api.getSpokenModules().then((mods) => {
            setModules(mods)
            /*setModalInfo({
                module: mods[0],
                category: mods[0].categories.line,
                command: mods[0].categories.line.commands[0]
            })*/
        })
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
                        <div className={`module ${open ? 'open' : ''}`}>
                            <div className="module__title">
                                {m.name}
                                <span onClick={() => setOpen(!open)}>❯</span>
                            </div>
                            <div className="module__desc">{m.desc}</div>
                            <div className="module__commands">
                                <ul>
                                    {Object.values(m.categories).map(c => {
                                        return c.commands.map((co: CommandDefinition) => {
                                            return (
                                                <li
                                                    onClick={() => setModalInfo({ module: m, category: c, command: co })}
                                                >
                                                    {co.desc}
                                                </li>
                                            )
                                        })
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
                                <textarea>{modalInfo.command.desc}</textarea>
                            </div>
                            <div className="field impl">
                                <div className="label">Implementation:</div>
                                <textarea>{modalInfo.command.impl}</textarea>
                            </div>
                            <div className="field phrases">
                                <div className="label">Phrases:</div>
                                <ul className="idioms">
                                    {Object.entries(modalInfo.command.phrases).map(([key, value]) => {
                                        return (
                                            <li className="idiom">
                                                <input type="text" value={key} name="lang"/>
                                                <ul className="commands">
                                                    {value.map(f => <li><input type="text" value={f} name="phrase"/></li>)}
                                                </ul>
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