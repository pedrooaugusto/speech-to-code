import React, { useEffect, useState } from 'react'
import Header from './components/header'
import Main from './components/main'
import Modules from './components/spoken'
import About from './components/about'
import Help from './components/help'
import { ModalSection } from './components/Modal'
import GloablContext from './services/global-context'
import './app.scss'

export default function App(props: any) {
    return (
        <GloablContext>
            <div>
                <Header />
                <Router
                    pages={[
                        { hash: '', component: Main },
                        { hash: 'spoken', component: Modules },
                        { hash: 'help', component: Help },
                        { hash: 'about', component: About }
                    ]}
                />
            </div>
            <ModalSection />
        </GloablContext>
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

    const page = props.pages.find((page) => new RegExp('^(#|#/|)' + page.hash + '(/|)$').test(hash))

    return page ? <page.component /> : null
}