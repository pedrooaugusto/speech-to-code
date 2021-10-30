import React from 'react'
import Problems from './problems'
import { GlobalContext } from '../services/global-context'
import './style.scss'

interface Props {}

export default function Tutorial(props: Props) {
    const { language: lang, problem, changeProblem } = React.useContext(GlobalContext)

    return (
        <div className="tutorial-problem">
            <div className="title">
                {problem.title}&nbsp;<span style={{fontSize: '14px'}}>{(problem.index + 1)}/5</span>
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
                        {problem.solution.map((item: string, index: number) => (
                            <li key={index} dangerouslySetInnerHTML={{__html: fmt(item)}}></li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="footer">
                <div className="prev">
                    {problem.index <= 0 ? null : (
                        <button
                            onClick={() => {
                                window.ipcRenderer.send('VoiceRecognition:toggleRecording', false)
                                changeProblem(problem.index - 1)
                            }}
                        >
                            {'<<'} {lang === 'pt-BR' ? 'Anterior' : 'Previous'}
                        </button>
                    )}
                </div>
                <div className="next">
                    {!(problem.index < Problems.length - 1) ? null : (
                        <button
                            onClick={() => {
                                window.ipcRenderer.send('VoiceRecognition:toggleRecording', false)
                                changeProblem(problem.index + 1)
                            }}
                        >
                            {lang === 'pt-BR' ? 'Próximo' : 'Next'} {'>>'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}

const fmt = (str: string) => {
    return str.replace(/"(.*)"/gi, '<b>$1</b>')
}
