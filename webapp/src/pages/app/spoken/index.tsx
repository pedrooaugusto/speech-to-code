import React, { useState, useContext } from 'react'
import Modal from '../Modal'
import Spoken, { SpokenModule } from 'spoken'
import { GlobalContext } from '../../../services/global-context'

type ModalInfo = {
    module: SpokenModule,
    command: CommandDefinition
}

type CommandDefinition = {
    id: string,
    label: string,
    phrases: string[],
    impl: string,
    desc: string,
    langName: string
}

const DOC_LINK = 'https://github.com/pedrooaugusto/speech-to-code/tree/main/spoken/src/modules'

export default function SpokenModules() {
    const [modalInfo, setModalInfo] = useState<null | ModalInfo>(null)
    const [open, setOpen] = useState(!false)
    const context = useContext(GlobalContext)
    const lang = context.language

    return (
        <main className="spoken">
            <div className="wrapper">
                <div className="title">
                    <h2>{i18n(lang)('Modules')()}</h2>
                    <div className="sub">{i18n(lang)('modules_exp')()}.</div>
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
            {(modalInfo != null) && (<Modal isOpen={context.shadeIsOpen}>
                <div className="modal-content command__details">
                    <div className="wrapper">
                        <div className="main-header">
                            <h2>{modalInfo!.command.label}</h2>
                            <a
                                target="_blank"
                                rel="noreferrer"
                                href={`${DOC_LINK}/${modalInfo.module.id}/${modalInfo.command.id}#${capitalize(modalInfo.command.langName)}`}
                                title="More information about this command"
                            >
                                <i className="fa fa-info-circle info" />
                            </a>
                            <div>{modalInfo!.command.desc}</div>
                        </div>
                        <div className="divider"></div>
                        <div className="body">
                            <div className="label">{i18n(lang)('Accepted phrases')()}:</div>
                            <ul className="highlight">
                                {modalInfo.command.phrases.map(item => {
                                    return (
                                        <li key={item}>{item}</li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </Modal>)}
        </main>
    )
}

const capitalize = (s: string) => {
    return s.charAt(0).toLowerCase() + s.slice(1)
}

const texts: Record<string, Record<string, any>> = {
    'en-US': {
        'modules_exp': () => <>
            Each module represents a set of commands that can be said out loud.&nbsp;
            <a href={DOC_LINK + '/typescript#readme'}>Click here to see the complete list.</a>
    </>,
    },
    'pt-BR': {
        'Help': () => 'Ajuda',
        'Modules': () => 'Módulos',
        'modules_exp': () => <>
            Cada módulo representa um conjunto de comandos que podem ser ditos em voz alta.&nbsp;
            <a href={DOC_LINK + '/typescript#readme'}>Clique aqui para a lista completa.</a>
        </>,
        'Accepted phrases': () => 'Frases reconhecidas'
    }
}

const i18n = (lang: string) => (textId: string) => texts[lang][textId] || (() => textId)