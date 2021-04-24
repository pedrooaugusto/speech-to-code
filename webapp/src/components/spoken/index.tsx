import React, { useState, useContext } from 'react'
import ReactDOM from 'react-dom'
import Spoken from 'spoken'
import { GlobalContext } from '../../services/global-context'

type GraphJsonView = {
    [key: string]: unknown,
    value: CommandDefinition
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
    phrases: string[],
    impl: string,
    desc: string
}

const DOC_LINK = 'https://github.com/pedrooaugusto/speech-to-code/tree/main/spoken/src/modules'

export default function SpokenModules() {
    // const [modules, setModules] = useState<SpokenModule[]>([])
    const [modalInfo, setModalInfo] = useState<null | ModalInfo>(null)
    const [open, setOpen] = useState(false)
    const context = useContext(GlobalContext)

    return (
        <main className="spoken">
            <div className="wrapper">
                <div className="title">
                    <h2>Modules</h2>
                    <div className="sub">Each module represents a set of commands that can be said out loud.</div>
                </div>
                <div className="modules">
                    {Spoken.modules.map(mod => {
                        return (
                            <div className={`module ${open ? 'open' : ''}`} key={mod.id}>
                                <div className="module__title">
                                    {mod.id}
                                    <i onClick={() => setOpen(!open)} className="fa fa-angle-down angle" />
                                    <a
                                        target="_blank"
                                        rel="noreferrer"
                                        href={`${DOC_LINK}/${mod.id}#${mod.label.replaceAll(' ', '-')}`}
                                        title="More information about this command"
                                    >
                                        <i className="fa fa-info-circle info" />
                                    </a>
                                </div>
                                <div className="module__desc">{mod.desc}</div>
                                <div className="divider"></div>
                                <div className="module__commands">
                                    <ul>
                                        {mod.grammar[context.language].map((c: any) => {
                                            return (
                                                <li
                                                    onClick={() => {
                                                        setModalInfo({ module: mod, command: c.value })
                                                        context.toggleShade()
                                                    }}
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
            </div>
            {(modalInfo != null) && (<DetailsModal isOpen={context.shadeIsOpen}>
                <div className="command__details">
                    <div className="wrapper">
                        <div className="main-header">
                            <h2>{modalInfo!.command.label}</h2>
                            <a
                                target="_blank"
                                rel="noreferrer"
                                href={`${DOC_LINK}/${modalInfo.module.id}/${modalInfo.command.id}#${modalInfo.command.label.replaceAll(' ', '-')}`}
                                title="More information about this command"
                            >
                                <i className="fa fa-info-circle info" />
                            </a>
                            <div>{modalInfo!.command.desc}</div>
                        </div>
                        <div className="divider"></div>
                        <div className="body">
                            <div className="label">Phrases:</div>
                            <ul>
                                {modalInfo.command.phrases.map(item => {
                                    return (
                                        <li key={item}>{item}</li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </DetailsModal>)}
        </main>
    )
}

const DetailsModal = ({ isOpen, children }: { isOpen: boolean, children: React.ReactNode }) => {
    if (!isOpen) return null

    const el = document.querySelector('#modal .content')

    if (!el) return null

    return ReactDOM.createPortal(isOpen ? children : null, el)
}