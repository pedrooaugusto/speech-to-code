import React from 'react'
import ReactDOM from 'react-dom'
import { GlobalContext as GC } from '../../services/global-context'

export default function Modal({
    isOpen,
    children
}: {
    isOpen: boolean
    children: React.ReactNode
}) {
    if (!isOpen) return null

    const el = document.querySelector('#modal .content')

    if (!el) return null

    return ReactDOM.createPortal(isOpen ? children : null, el)
}

export const ModalSection = () => {
    const { toggleShade, shadeIsOpen } = React.useContext(GC)
    const ref = React.useRef<HTMLDivElement>(null)

    React.useEffect(() => {
        let parent = ref.current?.parentElement

        if (!parent || !parent.classList.contains('window-content')) parent = window.document.body

        parent.style.overflow = shadeIsOpen ? 'hidden' : ''

    }, [shadeIsOpen])

    return (
        <div id="modal" ref={ref}>
            <div className={`shade ${shadeIsOpen ? 'open' : ''}`} onClick={() => toggleShade()}></div>
            <div className="content"></div>
        </div>
    )
}