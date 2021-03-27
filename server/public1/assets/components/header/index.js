import { html } from 'https://unpkg.com/htm@3.0.4/preact/index.mjs?module'
import { useState } from 'https://unpkg.com/preact@10.3.2/hooks/dist/hooks.module.js?module'

export default function Header() {
    const [open, setOpen] = useState(false)

    return html`
        <header>
            <div class="menu">
                <div class="icon" onClick=${() => setOpen(!open)}>
                    ☰
                </div>
            </div>
            <div class="menu-items ${open ? 'open' : ''}">
                <div class="about">
                    <div class="title">Speech To Code</div>
                    <div class="sub">by Pedro Augusto</div>
                </div>
                <div class="divider"></div>
                <ul>
                    <li><a href="/#" onClick=${() => setOpen(!open)}>Home</a></li>
                    <li><a href="/#/spoken" onClick=${() => setOpen(!open)}>Spoken</a></li>
                </ul>
            </div>
            <div class="menu-items-shade ${open ? 'open' : ''}" onClick=${() => setOpen(!open)}></div>
            <div class="brand">
                <div class="title">> ./speech-to-code</div>
            </div>
        </header>
    `
}