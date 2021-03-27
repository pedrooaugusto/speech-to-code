import { html } from 'https://unpkg.com/htm@3.0.4/preact/index.mjs?module'
import { useState, useEffect } from 'https://unpkg.com/preact@10.3.2/hooks/dist/hooks.module.js?module'
import api from '../api.js'

export default function Spoken() {
    const [modules, setModules] = useState([])
    const [modalInfo, setModalInfo] = useState(null)
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

    return html`
        <main class="spoken">
            <div class="wrapper">
                <h2>Modules</h2>
                <!--<div class="search-box">
                    <input type="text" name="search" autocomplete="off" />
                </div>-->
                ${modules.map(m => {
                    return html`
                        <div class="module ${open ? 'open' : ''}">
                            <div class="module__title">
                                ${m.name}
                                <span onClick=${() => setOpen(!open)}>❯</span>
                            </div>
                            <div class="module__desc">${m.desc}</div>
                            <div class="module__commands">
                                <ul>
                                    ${Object.values(m.categories).map(c => {
                                        return c.commands.map(co => {
                                            return html`
                                                <li
                                                    onClick=${() => setModalInfo({ module: m, category: c, command: co })}
                                                >
                                                    ${co.desc}
                                                </li>`
                                        })
                                    })}
                                </ul>
                            </div>
                        </div>
                    `
                })}
            </div>
            ${modalInfo != null && (html`
                <div class="module__details">
                    <div class="module__details__wrapper">
                        <div class="module__main-header">
                            <h2>${modalInfo.module.name}</h2>
                            <span title="close" onClick=${() => setModalInfo(null)}>×</span>
                            <div>${modalInfo.module.desc}</div>
                        </div>
                        <div class="divider"></div>
                        <div class="module__main">
                            <h4>Command:</h4>
                            <div class="field">
                                <div class="label">#ID:</div>
                                <input type="text" readonly class="value" value=${modalInfo.command.id}/>
                            </div>
                            <div class="field desc">
                                <div class="label">Description:</div>
                                <textarea>${modalInfo.command.desc}</textarea>
                            </div>
                            <div class="field impl">
                                <div class="label">Implementation:</div>
                                <textarea>${modalInfo.command.impl}</textarea>
                            </div>
                            <div class="field phrases">
                                <div class="label">Phrases:</div>
                                <ul class="idioms">
                                    ${Object.entries(modalInfo.command.phrases).map(([key, value]) => {
                                        return html`
                                            <li class="idiom">
                                                <input type="text" value=${key} name="lang"/>
                                                <ul class="commands">
                                                    ${value.map(f => html`<li><input type="text" value=${f} name="phrase"/></li>`)}
                                                </ul>
                                            </li>
                                        `;
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="module__footer">
                        <button>Save</div>
                        <button>Remove</div>
                    </div>
                </div>
            `)}
        </main>
    `
}