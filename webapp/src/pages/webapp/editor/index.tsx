import React from 'react'
import CodeMirror from 'codemirror'
import EditorService from '../services/editor'
import { GlobalContext } from '../services/global-context'

import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/idea.css'
import 'codemirror/addon/selection/active-line.js'
import 'codemirror/mode/javascript/javascript.js'
import './style.scss'

interface Props {}

let myCodeMirror: CodeMirror.Editor | null = null

export default React.memo(function Editor(props: Props) {
    const [result, setResult] = React.useState('')
    const [loading, setLoading] = React.useState(false)

    const { problem } = React.useContext(GlobalContext)

    React.useEffect(() => {
        myCodeMirror = CodeMirror(document.querySelector('#code-editor')!, {
            lineNumbers: true,
            mode: 'javascript',
            styleActiveLine: true,
            // @ts-ignore
            matchBrackets: true,
            theme: 'idea',
            indentUnit: 4,
            value: '// your code will be written here\n' + problem.code
        })

        EditorService.setEditor(myCodeMirror)

        EditorService.onRunCode({
            before: () => setLoading(true),
            success: (result: string) => setResult(result),
            error: (ex: Error) => setResult(ex.toString()),
            after: () => setLoading(false)
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    React.useEffect(() => {
        myCodeMirror?.setValue('// your code will be written here\n' + problem.code)
        setResult('')
    }, [problem.index, problem.code])

    return (
        <div>
            <div className="code-editor-wrapper">
                <div className="filename">
                    MyLittleDarkAge.js
                    <span
                        onClick={() => EditorService.runCode()}
                        title="Click here to run this file"
                        className={`${loading ? 'loading' : ''}`}
                    >
                        {loading && <i className="fa fa-circle-o-notch fa-spin fa-3x"></i>}
                        {!loading && <i className="fa fa-caret-right"/>}
                    </span>
                </div>
                <div id="code-editor"></div>
            </div>
            <div className={`output ${loading ? 'loading' : ''}`}>
                <div>
                    <i className="fa fa-angle-right"></i>
                    {loading && <span className="fa-3x"><i className="fa fa-circle-o-notch fa-spin"></i></span>}
                </div>
                {!loading && <pre>{result === '' ? 'empty output' : result}</pre>}
            </div>
        </div>

    )
})