import CodeMirror from 'codemirror'
import { Editor } from 'spoken'

/**
 * CodeMirror implementation of https://github.com/pedrooaugusto/speech-to-code/blob/main/spoken-vscode-driver/src/robot-vscode.ts
 * 
 * This is just a port from VSCode editor to CodeMirror editor and is meant
 * to be used in the web.
 */

interface RunCodeLifeCycle {
    before: () => void,
    success: (result: string) => void,
    error: (ex: Error) => void,
    after: () => void
}

// @ts-ignore
class CodeMirrorEditor implements Editor {
    private editor: CodeMirror.Editor | null = null
    private runCodeLifecycle: RunCodeLifeCycle | null = null

    public getEditor(): [CodeMirror.Editor | null, Error | null] {
        const editor = this.editor

        if (editor == null) return [null, new Error('No active text editor')]

        return [editor, null]
    }

    public setEditor(editor: CodeMirror.Editor) {
        this.editor = editor
    }

    public onRunCode(lifecycle: RunCodeLifeCycle): void {
        this.runCodeLifecycle = lifecycle
    }

    public runCode(): void {
        const { after, before, error, success } = this.runCodeLifecycle!

        before()

        const code = this.getEditor()[0]!.getValue()

        this.runThisCode(code).then(success).catch(error).finally(after)
    }

    /**
	 * Writes something in the current text input
	 * @param text The text to be written
	 */
    async write(text: string = '') {
        Log('[vscode-driver.robot-vscode.write]: Executing write(' + text + ')')

        const [editor, e] = this.getEditor()

        if (editor == null) throw e

        if (editor.getSelection().length > 0) {
            const sel = editor.listSelections()[0]

            editor.replaceSelection(text)

            editor.setSelection(sel.anchor, { ...sel.head, ch: sel.anchor.ch + text.length })
        } else {
            editor.replaceRange(text, editor.getCursor())
        }
    }

    /**
	 * Removes the provided selection/line
     * 
	 * @param The line to be removed
	 */
    async remove(selection: number | [[number, number], [number, number]]) {
        Log('[vscode-driver.robot-vscode.write]: Executing remove(' + selection + ')')

        const [editor, e] = this.getEditor()

        if (editor == null) throw e

        editor.execCommand('deleteLine')
    }

    /**
     * Creates a new line above or below the current line.
     * 
     * @returns undefined if evrything went well, error otherwise
     */
    async newLine(pos: 0 | 1) {
        Log('[vscode-driver.robot-vscode.newLine]: Executing newLine')

        const [editor, e] = this.getEditor()

        if (editor == null) throw e

        if (pos === 0) {
            await this.goToLine(String(editor.getCursor().line), 'END')
        }

        editor.execCommand('newlineAndIndent')
    }

    /**
     * Moves the cursor to a different line
     * 
     * @param number Line number
     * @param string Line position (END, BEGIN)
     */
    async goToLine(number: string, cursorPosition: 'END' | 'BEGIN' = 'BEGIN') {
        const [editor, e] = this.getEditor()

        if (editor == null) throw e

        const destLine = parseInt(number) - 1

        // remove any active selection
        // editor.setSelection(editor.getCursor())

        const text = editor.getLine(destLine)

        if (cursorPosition === 'END') {
            editor.setCursor({ line: destLine, ch: Math.max(text.length, 0) })
        } else {
            editor.setCursor({ line: destLine, ch: Math.max(text.length - text.trimLeft().length, 0) })
        }

        editor.scrollIntoView(null, 200)

        return text
    }

    private lineBoundaries(line: string, withWhiteSpace = false) {
        const rStart = withWhiteSpace ? 0 : Math.max(line.length - line.trimLeft().length, 0)
        const rEnd = (withWhiteSpace ? line.length : line.trimRight().length)

        return {
            relative: [rStart, rEnd]
        }
    }

    private stringMatchAll(text: string, regex: RegExp) {
        const indices: number[][] = []
        let match = null

        while ((match = regex.exec(text)) != null) {
            indices.push([match.index, match.index + match[0].length])
        }

        return indices
    }

    private findAllOccurrences(lineNumber: number, regex: RegExp, pad: number = 0) {
        const [editor,] = this.getEditor()

        if (editor == null) return []

        const line = editor.getLine(lineNumber)
        const text = line.substr(pad)

        return this.stringMatchAll(text, regex)
    }

    /**
     * Finds the position of a given token in the current line
     * 
     * @param to {string} Where the cursor should move to
     * @param symbol {string} If `to` is SYMBOL, which symbol are we looking for
     * @param leapSize {number} How many matches should be skiped
     */
    async moveCursorTo(to: 'END_LINE' | 'BEGIN_LINE' | 'SYMBOL' | null, symbol: string | undefined, leapSize: number | undefined) {
        const [editor, e] = this.getEditor()

        if (editor == null) throw e

        const cursor = editor.getCursor()

        if (to === 'BEGIN_LINE' || to === 'END_LINE') {
            const { relative } = this.lineBoundaries(editor.getLine(cursor.line))

            console.log(relative)

            return editor.setCursor({ line: cursor.line, ch: relative[ to === 'BEGIN_LINE' ? 0 : 1 ] })
        }

        // Move the cursor {leapSize} units to the right
        if (to === null) {
            return editor.setCursor({ line: cursor.line, ch: cursor.ch + leapSize! })
        }

        if (to === 'SYMBOL' && symbol !== undefined) {
            const indices = this.findAllOccurrences(cursor.line, new RegExp(symbol, 'gi'), cursor.ch)

            if (leapSize === -1) leapSize = indices.length
            else if (leapSize == null) leapSize = 1

            const range = indices[leapSize - 1]

            if (range == null) throw new Error('Match not found for symbol: ' + symbol)

            return editor.setCursor({ line: cursor.line, ch: cursor.ch + range[0] })
        }

        throw new Error('Unknown operation!')
    }

    /**
     * Finds the range of a term in a given line
     * 
     * @param term {RegExp | string} What we are looking for
     * @param line {number} Which line to look for
     */
    async findPositionOf(term: RegExp | string, line?: number, pad?: number): Promise<number[][] | Error> {
        const [editor, e] = this.getEditor()

        if (editor === null) throw e

        line = line ?? editor.getCursor().line

        if (typeof term === 'string') {
            if (term === 'LINE_BOUNDARIES' || term === '') {
                return [this.lineBoundaries(editor.getLine(line), true).relative]
            }

            term = new RegExp(term, 'gi')
        }

        return this.findAllOccurrences(line, term, pad)
    }

    /**
     * Select a piece of text in the editor.
     * 
     * @param from Where to start the selection
     * @param to Where to stop the selection
     * @param line If its a line selection or a word selection
     * @returns The text selection
     */
    async select(from: number, to: number, line: boolean) {
        const [editor, e] = this.getEditor()

        if (editor == null) throw e

        if (line) {
            const lastCharacter = editor.getLine(to - 1).length

            editor.setSelection({ line: from - 1, ch: 0 }, { line: to - 1, ch: lastCharacter })

            return editor.getSelection()
        }

        const currentLine = editor.getCursor().line

        editor.setSelection({ line: currentLine, ch: from }, { line: currentLine, ch: to + 1 })

        return editor.getSelection()
    }

    /**
     * Retrieves the content of the provided line
     * 
     * @param number | undefined line number
     */
    async getLine(number?: number): Promise<{ lineNumber: number, text: string, _text: string, _line: number, character: number } | Error> {
        const [editor, e] = this.getEditor()

        if (editor == null) throw e

        number = number != null ? number : editor.getCursor().line

        const text = editor.getLine(number)

        return {
            _line: number,
            lineNumber: number,
            _text: text,
            text: text,
            character: editor.getCursor().ch
        }
    }

    /**
     * Indents the provided selection or the active one.
     *
     * @param p1 Start string[] (line, cursor)
     * @param p2 Finish string[] (line, cursor)
     */
    async indentSelection(p1?: [string, string], p2?: [string, string]) {
        const [editor, e] = this.getEditor()

        if (editor == null) throw e

        const cursor = editor.getCursor()

        if (p1 == null || p2 == null) {
            const lines = editor.lastLine()

            editor.setSelection({ line: 0, ch: 0 }, { line: lines, ch: editor.getLine(lines).length })

            editor.execCommand('indentAuto')

            return editor.setCursor(cursor)
        }

        p1[0] = p1[0] ?? cursor.line
        p2[0] = p2[0] ?? cursor.line

        const sp1 = p1.map(a => parseInt(a, 10))
        const sp2 = p2.map(a => parseInt(a, 10))

        sp1[0] = Math.max(0, sp1[0])
        sp2[0] = Math.min(editor.lineCount(), sp2[0])

        editor.setSelection({ line: sp1[0], ch: sp1[1] }, { line: sp2[0], ch: sp2[1] })

        editor.execCommand('indentAuto')

        return editor.setCursor(cursor)
    }

    /**
     * Writes something in the terminal and press enter.
     * 
     * @param text Text to be written in the terminal
     * @returns void
     */
    async writeOnTerminal(text: string): Promise<void | Error> {

        // major short cut :(
        this.runCode()

        return
    }

    /**
     * Retrieves information about a file
     * 
     * @param text Which file we are looking for information about, if undefined current file.
     * @returns 
     */
    async fileInfo(text?: string): Promise<Record<string, any> | Error> {
        return {
            fileName: 'MyLittleDarkAge.js'
        }
    }

    async undo(): Promise<void | Error> {
        console.log('hereee')
        const [editor, e] = this.getEditor()

        if (e != null || editor == null) throw e

        return editor.undo()
    }

    async redo(): Promise<void | Error> {
        console.log('hereee333')
        const [editor, e] = this.getEditor()

        if (e != null || editor == null) throw e

        return editor.redo()
    }

    private runThisCode(code: string) {
        return new Promise<string>((res, rej) => {
            try {
                // eslint-disable-next-line no-eval
                eval(`
                    console.defaultLog = console.log.bind(console);
                    console.logs = [];
                    console.log = function() {
                        console.defaultLog.apply(console, arguments);
                        console.logs.push(Array.from(arguments));
                    }
    
                    ${code}
                `)

                const text = console.logs!.map(item => item.join(' ')).join('\n')

                setTimeout(() => res(text), 1500)
            } catch (ex) {
                setTimeout(() => rej(ex.toString()), 1500)
            } finally {
                if (console.defaultLog) {
                    console.log = console.defaultLog.bind(console)
                    delete console['defaultLog']
                }

                delete console['logs']
            }
        })
    }
}

function Log(item: any) {
    console.log(item)
}

export default new CodeMirrorEditor()