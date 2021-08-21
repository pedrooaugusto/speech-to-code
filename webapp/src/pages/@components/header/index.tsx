import React from 'react'
import { parseRoute } from '../utils'
import './style.scss'

export default function Header(props: any) {
    const { root, lang, route } = parseRoute()
    const makeUrl = (path: string) => `/${root}${ !root ? '' : '/' }${path}`

    return (
        <nav id="top-nav">
            <figure>
                <img src="/logo-purple.png" alt="logo" height="40" title="Brand logo"/>
            </figure>
            <a href={makeUrl('')} className={route === 'index' ? 'selected' : ''}>Home</a>
            <a href={makeUrl('webapp/')} className={route === 'webapp' ? 'selected' : ''}>Demo</a>
            <a rel="noreferrer" href={ARTICLE_LINK} target="_blank">Article</a>
            <a href={makeUrl('about/')} className={route === 'about' ? 'selected' : ''}>About</a>
            <div className="language">
                <a href="/en/webapp/" className={lang === 'en-US' ? `selected` : ''}>en-US</a>&nbsp;/&nbsp;
                <a href="/pt/webapp/" className={lang === 'pt-BR' ? `selected` : ''}>pt-BR</a>
            </div>
        </nav>
    )
}

const ARTICLE_LINK = "https://pedrooaugusto.github.io/Programming With Voice - Assistive Technology Tool For Programming In JavaScript Using Voice - Pedro Silva.pdf"
