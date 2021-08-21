import React from 'react'
import Problems from './problems'
import { GlobalContext } from '../services/global-context'
import './style.scss'

interface Props {}

console.error('ARRUMAR ao dizer igual vira "="')

export default function Tutorial(props: Props) {
    const { language: lang, problem, changeProblem } = React.useContext(GlobalContext)

    return (
        <div className="tutorial-problem">
            <div className="title">
                {(problem.index + 1)}. {problem.title}
            </div>
            <div className="placeholder" dangerouslySetInnerHTML={{__html: problem.placeholder}}>
            </div>
            <div className="statement">
                <div>
                    <b>{lang === 'pt-BR' ? 'Problema' : 'Problem'}</b>
                </div>
                <div dangerouslySetInnerHTML={{__html: problem.statement}}></div>
            </div>
            <div className="solution">
                <div>
                    <b>{lang === 'pt-BR' ? 'Possível solução' : 'Possible solution'}</b>
                </div>
                <div>
                    <ul>
                        {problem.solution.map((item: string, index: number) => <li key={index} dangerouslySetInnerHTML={{__html: fmt(item)}}></li>)}
                    </ul>
                </div>
            </div>
            <div className="footer">
                <div className="prev">
                    {problem.index > 0 ? <button onClick={() => changeProblem(problem.index - 1)}>{'<<'} Prev</button> : null}
                </div>
                <div className="next">
                    {problem.index < Problems.length - 1 ? <button onClick={() => changeProblem(problem.index + 1)}>Next {'>>'}</button> : null}
                </div>
            </div>
        </div>
    )
}

const fmt = (str: string) => {
    return str.replace(/"(.*)"/gi, '<b>$1</b>')
}

// @ts-ignore
function happy(value, visited) {
    if (value === 1) {
        return true
    }

    if (visited.has(value)) {
        return false
    }

    visited.add(value)

    let sum = 0
    for (const item of value.toString()) {
        sum = sum + item * item
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return happy(sum, visited)
}

/*

// your code will be written here
var mostrar = console.log

function feliz(valor, visitados) {
    if(valor === 1) {
        return true
    }
    if(visitados.gap(valor)) {
        return true
    }
    visitados.gap(valor)
    let soma = 0
    for(const item of valor + "") {
        soma = soma + item * item
    }
    return feliz(soma, visitados)
}

mostrar(23, feliz(23, new Set()))
mostrar(4, feliz(4, new Set()))
mostrar(440, feliz(440, new Set()))
mostrar(3, feliz(3, new Set()))


*/