import React, { useEffect, useState } from 'react'
import Header from './header'
import Main from './main'
import Modules from './spoken'
import About from './about'
import Help from './help'
import { ModalSection } from './Modal'
import GloablContext from '../../services/global-context'
import { VoiceRecognitionHook } from '../../services/use-voice-recognition'
import './index.scss'

interface Props {
    initialLang?: string,
    mode?: 'widget' | 'modalx',
    onOpen?: Function
    onClose?: Function
    onToggleRecording?: Function
}
export function factory(useVoiceRecognition?: VoiceRecognitionHook) {
    const main = Main(useVoiceRecognition)

    return function App(props: Props) {
        return (
            <GloablContext
                lang={props.initialLang}
                mode={props.mode}
                onOpen={props.onOpen}
                onClose={props.onOpen}
                onToggleRecording={props.onToggleRecording}
            >
                <div>
                    <Header />
                    <Router
                        pages={[
                            { hash: '', component: main },
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
}

export default factory()

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