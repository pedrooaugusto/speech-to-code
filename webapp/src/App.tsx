import React, { useEffect, useState } from 'react'
import Header from './components/header'
import Main from './components/main'
import Modules from './components/spoken'
import About from './components/about'
import Help from './components/help'
import GloablContext, { GlobalContext as GC } from './services/global-context'

export default function App(props: any) {
    return (
        <GloablContext>
            <div>
                <Header />
                <Router
                    pages={[
                        { hash: '', component: Main },
                        { hash: '#/spoken', component: Modules },
                        { hash: '#/help', component: Help },
                        { hash: '#/about', component: About }
                    ]}
                />
            </div>
            <ModalSection />
        </GloablContext>
    )
}

const ModalSection = () => {
    const { toggleShade, shadeIsOpen } = React.useContext(GC)

    React.useEffect(() => {
        document.body.style.overflow = shadeIsOpen ? 'hidden' : ''
    }, [shadeIsOpen])

    return (
        <div id="modal">
            <div className={`shade ${shadeIsOpen ? 'open' : ''}`} onClick={() => toggleShade()}></div>
            <div className="content"></div>
        </div>
    )
}

function Router(props: { pages: { hash: string, component: React.FC }[] }) {
    const [hash, setHash] = useState(window.location.hash)

    useEffect(() => {
        function hashchange() {
            setHash(window.location.hash)
        }

        window.addEventListener('hashchange', hashchange)

        return () => {
            window.removeEventListener('hashchange', hashchange)
        }

    }, [])

    const page = props.pages.find((page) => page.hash === hash)

    return page ? <page.component /> : null
}