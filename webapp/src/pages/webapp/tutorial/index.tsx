import React from 'react'
import Problems from './problems'
import './style.scss'

interface Props {
    setProblemIndex: (fn: (index: number) => number) => void
    problemIndex: number
    problem: {
        title: string,
        statement: string,
        code: string,
        placeholder: string,
        solution: string[]
    }
    lang: string
}
console.error('ARRUMAR preposição ao ---> igual "ao"')
console.error('ARRUMAR preposição por --> dividido "por"')
console.error('ARRUMAR ao dizer igual vira "="')
console.error('ARRUMAR ao dizer if/else for deve continuar na mesma linha')

export default function Tutorial(props: Props) {

    const { problemIndex, problem, lang, setProblemIndex } = props

    return (
        <div className="tutorial-problem">
            <div className="title">
                {(problemIndex + 1)}. {problem.title}
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
                    {problemIndex > 0 ? <button onClick={() => setProblemIndex((d) => d - 1)}>{'<<'} Prev</button> : null}
                </div>
                <div className="next">
                    {problemIndex < Problems.length - 1 ? <button onClick={() => setProblemIndex((d) => d + 1)}>Next {'>>'}</button> : null}
                </div>
            </div>
        </div>
    )
}

const fmt = (str: string) => {
    return str.replace(/"(.*)"/gi, '<b>$1</b>')
}