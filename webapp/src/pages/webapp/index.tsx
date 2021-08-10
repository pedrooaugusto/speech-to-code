import React from 'react'
import Nav from '../@components/header'
import Editor from './editor'
import Speech2Code from './speech2code'
import Tutorial from './tutorial'
import Problems from './tutorial/problems'
import './style.scss'

export default function Webapp(props: any) {
    const [problemIndex, setProblemIndex] = React.useState(2)
    const lang = !true ? 'en-US' : 'pt-BR'
    const problem = makeProblem(Problems[problemIndex], lang)

    return (
        <React.Fragment>
            <Nav />
            <main className="webapp">
                <div className="tutorial">
                    <Tutorial
                        lang={lang}
                        problem={problem}
                        setProblemIndex={setProblemIndex}
                        problemIndex={problemIndex}
                    />
                </div>
                <div className="code-editor">
                    <Editor code={problem.code} problemIndex={problemIndex}/>
                </div>
                <div className="speech2code">
                    <Speech2Code />
                </div>
            </main>
        </React.Fragment>
    )
}

const makeProblem = (problem: { id: string; title: any; placeholder: any; statement: any; solution: any; code?: any }, lang: string) => ({
    get title() { return problem.title[lang] },
    get placeholder() { return problem.placeholder[lang] },
    get statement() { return problem.statement[lang] },
    get solution() { return problem.solution[lang] },
    get code() { return problem?.code?.[lang] ||'' }
})
