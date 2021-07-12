// @ts-ignore

import CodeMirror from "codemirror"

const vscode: any = {}

class CodeMirrorEditor {
    private editor: CodeMirror.Editor | null = null

    public getEditor(): [CodeMirror.Editor | null, Error | null] {
        const editor = this.editor

        if (editor == null) return [null, new Error('No active text editor')]

        return [editor, null]
    }

    public setEditor(editor: CodeMirror.Editor) {
        this.editor = editor
    }

    /**
	 * Writes something in the current text input
	 * @param text The text to be written
	 */
    async write(text: string) {
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

    private lineBoundaries(line: any, withWhiteSpace = false) {
        const rStart = withWhiteSpace ? 'wrappedLineStart' : 'wrappedLineFirstNonWhitespaceCharacter'
        const rEnd = withWhiteSpace ? 'wrappedLineEnd' : 'wrappedLineLastNonWhitespaceCharacter'
        const aStart = withWhiteSpace ? 0 : line.firstNonWhitespaceCharacterIndex
        const aEnd = line.text.length

        return {
            relative: [rStart, rEnd],
            absolute: [aStart, aEnd]
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
        const [editor, e] = this.getEditor() as any

        if (editor == null) return []
        
        const line = editor.document.lineAt(lineNumber)
        const text = line.text.substr(pad)

        return this.stringMatchAll(text, regex)
    }

    /**
     * Finds the position of a given token in the current line
     * 
     * @param to {string} Where the cursor should move to
     * @param symbol {string} If `to` is SYMBOL, which symbol are we looking for
     * @param leapSize {number} How many matches should be skiped
     */
    moveCursorTo = (
        to: 'END_LINE' | 'BEGIN_LINE' | 'SYMBOL' | null,
        symbol: string | undefined,
        leapSize: number | undefined
    ) => new Promise<void | Error>(async (res, rej) => {
        const [editor, e] = this.getEditor() as any

        if (editor == null) return rej(e)

        function moveCursor(options: any) {
            if (options.value === 0) return res()

            return vscode.commands.executeCommand('cursorMove', options).then(() => res())
        }

        const currentLine = editor.document.lineAt(editor.selection.active.line)

        if (to === 'BEGIN_LINE' || to === 'END_LINE') {
            const { relative } = this.lineBoundaries(currentLine)

            return moveCursor({ to: relative[ to === 'BEGIN_LINE' ? 0 : 1 ] })
        }

        // Move the cursor {leapSize} units to the right
        if (to === null) {
            return moveCursor({ to: 'right', value: leapSize, by: 'character' })
        }

        if (to === 'SYMBOL' && symbol != undefined) {
            const { line, character } = editor.selection.active

            const indices = this.findAllOccurrences(line, new RegExp(symbol, 'gi'), character)

            if (leapSize === -1) leapSize = indices.length
            else if (leapSize == null) leapSize = 1

            const range = indices[leapSize - 1]

            if (range == null) return rej('Match not found for symbol: ' + symbol)

            return moveCursor({ to: 'right', value: range[0], by: 'character' })
        }

        return rej(new Error('Unknown operation!'))
    })

    /**
     * Finds the range of a term in a given line
     * 
     * @param term {RegExp | string} What we are looking for
     * @param line {number} Which line to look for
     */
    async findPositionOf(term: RegExp | string, line?: number, pad?: number): Promise<number[][] | Error> {
        const [editor, e] = this.getEditor() as any

        if (editor === null) throw e

        line = line ?? editor.selection.active.line

        if (typeof term === 'string') {
            if (term === 'LINE_BOUNDARIES' || term === '') {
                return [this.lineBoundaries(editor.document.lineAt(line), true).absolute]
            }

            term = new RegExp(term, 'gi')
        }

        return this.findAllOccurrences(line as any, term, pad)
    }

    /**
     * Select a pice of text in the editor.
     * 
     * @param from Where to start the selection
     * @param to Where to stop the selection
     * @param line If its a line selection or a word selection
     * @returns The text selection
     */
    select = (from: number, to: number, line: boolean) => new Promise<string | Error>((res, rej) => {
        const editor = vscode.window.activeTextEditor

        if (editor == null) return rej(new Error('No active text editor'))

        try {
            if (line) {
                const lastCharacter = editor.document.lineAt(to - 1).text.length
                editor.selection = new vscode.Selection(from - 1, 0, to - 1, lastCharacter)

                return res(editor.document.getText(editor.selection))
            }

            const currentLine = editor.selection.start.line

            editor.selection = new vscode.Selection(currentLine, from, currentLine, to + 1)

            return res(editor.document.getText(editor.selection))
        } catch(err) {
            Log(err.toString())
            rej(err)
        }
    })

    /**
     * Retrieves the content of the provided line
     * 
     * @param number | undefined line number
     */
    async getLine(number?: number): Promise<{ lineNumber: number, text: string, _text: string, _line: number, character: number } | Error> {

        try {
            const [editor, e] = this.getEditor() as any

            if (editor == null) throw e

            number = number != null ? number : editor.selection.active.line

            const d = editor.document.lineAt(number)
            return {
                _line: d.lineNumber,
                lineNumber: d.lineNumber,
                _text: d.text,
                text: d.text,
                character: editor.selection.active.character
            }

        } catch(err) {
            Log(err.toString())

            throw err
        }
    }

    /**
     * Indents the provided selection or the active one.
     *
     * @param p1 Start string[] (line, cursor)
     * @param p2 Finish string[] (line, cursor)
     */
    indentSelection = (
        p1?: [string, string],
        p2?: [string, string]
    ) => new Promise<void | Error>((res, rej) => {
        try {
            const editor = vscode.window.activeTextEditor

            if (editor == null) return rej(new Error('No active text editor'))

            if (p1 == null || p2 == null) {
                return vscode.commands.executeCommand('editor.action.formatDocument', {}).then(() => {
                    res()
                })
            }

            p1[0] = p1[0] ?? editor.selection.active.line
            p2[0] = p2[0] ?? editor.selection.active.line

            const sp1 = p1.map(a => parseInt(a, 10))
            const sp2 = p2.map(a => parseInt(a, 10))

            sp1[0] = Math.max(0, sp1[0])
            sp2[0] = Math.min(editor.document.lineCount, sp2[0])

            editor.selection = new vscode.Selection(sp1[0], sp1[1], sp2[0], sp2[1])

            vscode.commands.executeCommand('editor.action.reindentselectedlines', {}).then(() => {
                editor.selection = new vscode.Selection(editor.selection.end, editor.selection.end)
                res()
            })
        } catch(err) {
            rej(err)
        }
    })

    /**
     * Writes something in the terminal and press enter.
     * 
     * @param text Text to be written in the terminal
     * @returns void
     */
    async writeOnTerminal(text: string): Promise<void | Error> {
        try {
            await vscode.window.activeTextEditor?.document.save()
            vscode.window.activeTerminal!.show()
            vscode.window.activeTerminal?.sendText(text)

            return
        } catch (err) {
            throw err
        }
    }

    /**
     * Retrieves information about a file
     * 
     * @param text Which file we are looking for information about, if undefined current file.
     * @returns 
     */
    async fileInfo(text?: string): Promise<Record<string, any> | Error> {
        try {

            const [editor, err] = this.getEditor() as any

            if (err) throw err

            return {
                fileName: editor?.document.fileName
            }
        } catch (err) {
            throw err
        }
    }

}

function Log(item: any) {
    console.log(item)
}

export default new CodeMirrorEditor()