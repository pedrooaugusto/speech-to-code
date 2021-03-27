import React, { useState } from 'react'

export default function Header() {
    const [open, setOpen] = useState(false)

    return (
        <header>
            <div className="menu">
                <div className="icon" onClick={() => setOpen(!open)}>
                    ☰
                </div>
            </div>
            <div className={`menu-items ${open ? 'open' : ''}`}>
                <div className="about">
                    <div className="title">Speech To Code</div>
                    <div className="sub">by Pedro Augusto</div>
                </div>
                <div className="divider"></div>
                <ul>
                    <li><a href="/#" onClick={() => setOpen(!open)}>Home</a></li>
                    <li><a href="/#/spoken" onClick={() => setOpen(!open)}>Spoken</a></li>
                </ul>
            </div>
            <div className={`menu-items-shade ${open ? 'open' : ''}`} onClick={() => setOpen(!open)}></div>
            <div className="brand">
                <div className="title">{'>'} ./speech-to-code</div>
            </div>
        </header>
    )
}