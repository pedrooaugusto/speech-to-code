import React from 'react'
import CodeMirror from 'codemirror'
import EditorService from '../../../services/chrome/editor'

import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/idea.css'
import 'codemirror/addon/selection/active-line.js'
import 'codemirror/mode/javascript/javascript.js'
import './style.scss'

let myCodeMirror: CodeMirror.Editor | null = null

export default React.memo(function Editor(props: { code: string; problemIndex: number }) {
    const [result, setResult] = React.useState('')
    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
        if (myCodeMirror == null) {
            myCodeMirror = CodeMirror(document.querySelector('#code-editor')!, {
                lineNumbers: true,
                mode: 'javascript',
                styleActiveLine: true,
                // @ts-ignore
                matchBrackets: true,
                theme: 'idea',
                indentUnit: 4,
                value: '// your code will be written here\n' + props.code
                // value: '// your code will be written here\n\nconst value = 42\n\nif(window.body == null) {\n\tconsole.log("hello")\n}'
            })

            EditorService.setEditor(myCodeMirror)
        }

        // Clean something...
        return () => {}
    }, [])

    React.useEffect(() => {
        myCodeMirror?.setValue('// your code will be written here\n' + props.code)
        setResult('')
    }, [props.problemIndex, props.code])

    const run = () => {
        setLoading(true)

        const code = myCodeMirror!.getValue()

        try {
            eval(`
                console.defaultLog = console.log.bind(console);
                console.logs = [];
                console.log = function() {
                    console.defaultLog.apply(console, arguments);
                    console.logs.push(Array.from(arguments));
                }

                ${code}
            `)
            
            // @ts-ignore
            setResult(console.logs.map(item => item.join(' ')).join('\n'))
        } catch (ex) {
            setResult(ex.toString())
        } finally {
            // @ts-ignore
            if (console.defaultLog) {
                // @ts-ignore
                console.log = console.defaultLog.bind(console)
                // @ts-ignore
                delete console['defaultLog']
            }
        }

        // @ts-ignore
        delete console['logs']

        setTimeout(() => setLoading(false), 1500)
    }

    return (
        <div>
            <div className="code-editor-wrapper">
                <div className="filename">
                    MyLittleDarkAge.js
                    <span
                        onClick={run}
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