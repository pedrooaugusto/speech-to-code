import React from 'react'
import CodeMirror from 'codemirror'
import EditorService from '../../../services/chrome/editor'

import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/idea.css'
import 'codemirror/addon/selection/active-line.js'
import 'codemirror/mode/javascript/javascript.js'
import './style.scss'

let myCodeMirror: CodeMirror.Editor | null = null

export default React.memo(function Editor() {

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
                value: '// your code will be written here\n\nconst value = 42\n\nif(window.body == null) {\n\tconsole.log("hello")\n}'
            })

            EditorService.setEditor(myCodeMirror)
        }

        // Clean something...
        return () => {}
    }, [])

    return (
        <div className="code-editor-wrapper">
            <div className="filename">
                MyLittleDarkAge.js
            </div>
            <div id="code-editor"></div>
        </div>
    )
})