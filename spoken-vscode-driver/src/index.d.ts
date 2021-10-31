import { Socket } from 'net';

export interface Proxy {
    proxy: (request: TaskRequest, socket: Socket) => Promise<void>
}

export type TaskRequest = {
    type: string;
    context: object;
    extra: { [key: string]: any};
    id: number;
}

export interface Robot {
    /**
	 * Writes something in the current text input (editor).
     * 
	 * @param text The text to be written
	 */
    write(text: string): Promise<void | Error>

    /**
     * Creates a new line above or below the current line.
     * 
     * @returns undefined if evrything went well, error otherwise
     */
    newLine(pos: 0 | 1): Promise<void | Error>

    /**
     * Moves the cursor to a different line.
     * 
     * @param number Line number
     * @param string Line position (END, BEGIN)
     */
    goToLine(number: string, cursorPosition: 'END' | 'BEGIN'): Promise<string | Error>

    /**
     * Finds the position of a given token in the current line.
     * 
     * @param to {string} Where the cursor should move to
     * @param symbol {string} If `to` is SYMBOL, which symbol are we looking for
     * @param leapSize {number} How many matches should be skiped
     */
    moveCursorTo(
        to: 'END_LINE' | 'BEGIN_LINE' | 'SYMBOL' | null,
        symbol: string | undefined,
        leapSize: number | undefined
    ): Promise<void | Error>

    /**
     * Finds the range of a term in a given line
     * 
     * @param term {RegExp | string} What we are looking for
     * @param line {number} Which line to look for
     */
    findPositionOf(term: RegExp | string, line?: number, pad?: number): Promise<number[][] | Error>

    /**
     * Selects a piece of text in the editor.
     * 
     * @param from Where to start the selection
     * @param to Where to stop the selection
     * @param line If its a line selection or a word selection
     * @returns The text selection
     */
    select(from: number, to: number, line: boolean): Promise<string | Error>

    /**
     * Retrieves the content of the provided line.
     * 
     * @param number | undefined line number
     */
    getLine(number?: number): Promise<{ lineNumber: number, text: string, _text: string, _line: number, character: number } | Error>

    /**
     * Indents the provided selection or the whole file if no selection is provided.
     *
     * @param p1 Start string[] (line, cursor)
     * @param p2 Finish string[] (line, cursor)
     */
    indentSelection(p1?: [string, string], p2?: [string, string]): Promise<void | Error>

    /**
     * Writes something in the terminal and press enter.
     * 
     * @param text Text to be written in the terminal
     * @returns void
     */
    writeOnTerminal(text: string): Promise<void | Error>

    /**
     * Retrieves information about a file
     * 
     * @param text Which file we are looking for information about, if undefined current file.
     * @returns 
     */
    fileInfo(text?: string): Promise<Record<string, any> | Error>

    /**
     * Undo the last operation - CTRL+Z
     * 
     * @returns 
     */
    undo(): Promise<void | Error>

    /**
     * Redo the last operation - CTRL+Y
     * 
     * @returns 
     */
    redo(): Promise<void | Error>
}