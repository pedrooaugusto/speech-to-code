import React from 'react'
import { isRoute } from '../utils'
import './style.scss'

export default function Header(props: any) {

    return (
        <nav id="top-nav">
            <figure>
                <img src="/logo-purple.png" alt="logo" height="40" title="Brand logo"/>
            </figure>
            <a href="/" className={isRoute('') ? 'selected' : ''}>Home</a>
            <a href="/webapp/" className={isRoute('webapp') ? 'selected' : ''}>Demo</a>
            <a rel="noreferrer" href={ARTICLE_LINK} target="_blank">Article</a>
            <a href="/about/" className={isRoute('about') ? 'selected' : ''}>About</a>
        </nav>
    )
}

const ARTICLE_LINK = "https://pedrooaugusto.github.io/Programming With Voice - Assistive Technology Tool For Programming In JavaScript Using Voice - Pedro Silva.pdf"
