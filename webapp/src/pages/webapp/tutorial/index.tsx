import React from 'react'
import Problems from './problems'
import './style.scss'

export default function Tutorial() {
    const [problemIndex, setProblemIndex] = React.useState(0)
    const lang = true ? 'en-US' : 'pt-BR'
    const problem = makeProblem(Problems[problemIndex], lang)

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
                <div>{problem.statement}</div>
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
                    <button onClick={() => setProblemIndex((d) => d + 1)}>Next {'>>'}</button>
                </div>
            </div>
        </div>
    )
}

const makeProblem = (problem: { id?: string; title: any; placeholder: any; statement: any; solution: any }, lang: string) => ({
    get title() { return problem.title[lang] },
    get placeholder() { return problem.placeholder[lang] },
    get statement() { return problem.statement[lang] },
    get solution() { return problem.solution[lang] },
})

const fmt = (str: string) => {
    return str.replace(/"(.*)"/gi, '<b>$1</b>')
}