import React from 'react'
import ReactDOM from 'react-dom'

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
