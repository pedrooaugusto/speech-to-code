import { html, render } from 'https://unpkg.com/htm@3.0.4/preact/index.mjs?module'
import { useState, useCallback, useEffect } from 'https://unpkg.com/preact@10.3.2/hooks/dist/hooks.module.js?module'
import Main from './components/main/index.js'
import Header from './components/header/index.js'
import Spoken from './components/spoken/index.js'

function App (props) {
    return html`
        <div>
            <${Header} />
            <${Router}
                pages=${[
                    { hash: '', component: Main },
                    { hash: '#/spoken', component: Spoken }
                ]}
            />
        </div>
    `
}

function Router(props) {
    const [hash, setHash] = useState(location.hash)

    useEffect(() => {
        function hashchange() {
            setHash(location.hash)
        }

        window.addEventListener('hashchange', hashchange)

        return () => {
            window.removeEventListener('hashchange', hashchange)
        }

    }, [])

    const page = props.pages.find(page => page.hash == hash)

    return page ? html`<${page.component} />` : null
}

render(html`<${App} />`, document.getElementById("preact-root"))