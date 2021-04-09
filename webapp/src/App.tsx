import React, { useEffect, useState } from 'react'
import Header from './components/header'
import Main from './components/main'
import Spoken from './components/spoken'

export default function App (props: any) {
    return (
        <div>
            <Header />
            <Router
                pages={[
                    { hash: '', component: Main },
                    { hash: '#/spoken', component: Spoken }
                ]}
            />
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