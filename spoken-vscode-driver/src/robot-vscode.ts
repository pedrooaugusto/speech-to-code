import * as vscode from './vscode'
import { Robot } from './index'
import Log from './logger'

// @TODO: Replace everything 'robot' for editor
class RobotVscode implements Robot {

    private getEditor(): [vscode.TextEditor | null, Error | null] {
        const editor = vscode.window.activeTextEditor

        if (editor == null) return [null, new Error('No active text editor')]

        return [editor, null]
    }

    /**
	 * Writes something in the current text input
	 * @param text The text to be written
	 */
    write = (text: string) => new Promise<void | Error>((res, rej) => {
        Log('[vscode-driver.robot-vscode.write]: Executing write(' + text + ')')

        const [editor, e] = this.getEditor()

        if (editor == null) return rej(e)

        editor.edit((editBuilder) => {
            editBuilder.replace(editor.selection, '')
            editBuilder.insert(editor.selection.active, text)
        }).then(ok => {
            if (!ok) return rej(new Error('Something went wrong!'))
            res()
        })
    })

    removeSelection(): Promise<string | Error> {
        throw new Error('Method not implemented.')
    }

    /**
     * Creates a new line above the current line.
     * 
     * @returns undefined if evrything went well, error otherwise
     */
    newLine = (pos: 0 | 1) => new Promise<void | Error>(async (res, rej) => {
        Log('[vscode-driver.robot-vscode.newLine]: Executing newLine')

        const [editor, e] = this.getEditor()

        if (editor == null) return rej(e)

        if (pos === 0) {
            await this.goToLine(String(editor.selection.active.line), 'END')
        }

        editor.edit((editBuilder) => {
            editBuilder.insert(editor.selection.active, '\n')
        }).then(ok => {
            if (!ok) return rej(new Error('Something went wrong!'))
            res()
        })
    })

    removeLine(): Promise<string | Error> {
        throw new Error('Method not implemented.')
    }

    selectLines(from: number | undefined, to: number | undefined): Promise<string | Error> {
        throw new Error('Method not implemented.')
    }

    /**
     * Moves the cursor to a different line
     * @param number Line number
     */
    goToLine = (
        number: string,
        cursorPosition: 'END' | 'BEGIN' = 'BEGIN'
    ) => new Promise<string | Error>(async (res, rej) => {
        try {
            const [editor, e] = this.getEditor()

            if (editor == null) return rej(e)

            const destLine = parseInt(number)

            // remove any active selection
            editor.selection = new vscode.Selection(editor.selection.active, editor.selection.active)

            const line = editor.selection.active.line + 1
            const to = destLine > line ? 'down' : 'up'
            const value = to === 'down' ? destLine - line : line - destLine

            if (value === 0) return res(editor.document.lineAt(line - 1).text)

            vscode.commands.executeCommand('cursorMove', { to, value, by: 'line' }).then(() => {
                vscode.commands.executeCommand('revealLine', { lineNumber: destLine, at: 'center' }).then(() => {
                    const t = `wrappedLine${cursorPosition === 'BEGIN' ? 'First' : 'Last'}NonWhitespaceCharacter`
                    vscode.commands.executeCommand('cursorMove', { to: t }).then(() => {
                        res(editor.document.lineAt(destLine - 1).text)
                    })
                })
            })

            // const { range, text } = editor.document.lineAt(parseInt(number) - 1)
            // editor.selection = new vscode.Selection(range.start, range.end)

            // editor.revealRange(range)
        } catch(err) {
            rej(err)
        }
    })

    private lineBoundaries(line: vscode.TextLine, withWhiteSpace = false) {
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
        const [editor, e] = this.getEditor()

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
        const [editor, e] = this.getEditor()

        if (editor == null) return rej(e)

        function MoveCursor(options: any) {
            if (options.value === 0) return res()

            return vscode.commands.executeCommand('cursorMove', options).then(() => res())
        }

        const currentLine = editor.document.lineAt(editor.selection.active.line)

        if (to === 'BEGIN_LINE' || to === 'END_LINE') {
            const { relative } = this.lineBoundaries(currentLine)

            return MoveCursor({ to: relative[ to === 'BEGIN_LINE' ? 0 : 1 ] })
        }

        // Move the cursor {leapSize} units to the right
        if (to === null) {
            return MoveCursor({ to: 'right', value: leapSize, by: 'character' })
        }

        if (to === 'SYMBOL' && symbol != undefined) {
            const { line, character } = editor.selection.active

            const indices = this.findAllOccurrences(line, new RegExp(symbol, 'gi'), character)

            if (leapSize === -1) leapSize = indices.length
            else if (leapSize == null) leapSize = 1

            const range = indices[leapSize - 1]

            if (range == null) return rej('Match not found for symbol: ' + symbol)

            return MoveCursor({ to: 'right', value: range[0], by: 'character' })
        }

        return rej(new Error('Unknown operation!'))
    })

    /**
     * Finds the range of a term in a given line
     * 
     * @param term {RegExp | string} What we are looking for
     * @param line {number} Which line to look for
     */
    async findPositionOf(term: RegExp | string, line?: number): Promise<number[][] | Error> {
        const [editor, e] = this.getEditor()

        if (editor === null) throw e

        line = line ?? editor.selection.active.line

        if (typeof term === 'string') {
            if (term === 'LINE_BOUNDARIES' || term === '') {
                return [this.lineBoundaries(editor.document.lineAt(line), true).absolute]
            }

            term = new RegExp(term, 'gi')
        }

        return this.findAllOccurrences(line, term)
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

    hotKey(...keys: string[]): Promise<void | Error> {
        throw new Error('Method not implemented.')
    }

    /**
     * Retrieves the content of the provided line
     * 
     * @param number | undefined line number
     */
    async getLine(number?: number): Promise<{ lineNumber: number, text: string } | Error> {

        try {
            const [editor, e] = this.getEditor()

            if (editor == null) throw e

            number = number != null ? number : editor.selection.active.line + 1

            // @todo fix that and keep _.line and ._text fot backward compability 
            return editor.document.lineAt(number)

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
        p1: [string, string],
        p2: [string, string]
    ) => new Promise<void | Error>((res, rej) => {
        try {
            const editor = vscode.window.activeTextEditor

            if (editor == null) return rej(new Error('No active text editor'))

            p1[0] = p1[0] ?? editor.selection.active.line
            p2[0] = p2[0] ?? editor.selection.active.line

            const sp1 = p1.map(a => parseInt(a, 10))
            const sp2 = p2.map(a => parseInt(a, 10))

            sp1[0] = Math.max(0, sp1[0])
            sp2[0] = Math.min(editor.document.lineCount, sp2[0])

            editor.selection = new vscode.Selection(sp1[0], sp1[1], sp2[0], sp2[1])

            vscode.commands.executeCommand('editor.action.reindentselectedlines', {}).then(a => {
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

            const [editor, err] = this.getEditor()

            if (err) throw err

            return {
                fileName: editor?.document.fileName
            }
        } catch (err) {
            throw err
        }
    }

}

export default new RobotVscode()

export function createInstance() {
    return new RobotVscode()
}
