export abstract class Editor {
	public status: 'ON' | 'OFF' = 'OFF'

	constructor(protected editorName: string) {
		this.editorName = editorName
	}

	public getName(): string { return this.editorName }

	/**
	 * Check if this editor has everything it needs to function properly
	 */
	abstract checkPrerequisites(): Promise<void>

	/**
	 * Writes something in the current text input
	 * @param text The text to be written
	 */
	abstract write(text: string): Promise<void | Error>
	abstract removeSelection(): Promise<string | Error>
	abstract newLine(pos: 0 | 1): Promise<void | Error>
	abstract removeLine(): Promise<string | Error>
	abstract selectLines(from: number | undefined, to: number | undefined): Promise<string | Error>
	abstract goToLine(number: string): Promise<string | Error>
    abstract hotKey(...keys: string[]): Promise<void | Error>

	abstract turnOn(): void | Error
	abstract turnOff(): void | Error
	abstract onStatusChange(callback: (editor: Editor) => void): void
}

// Microsoft Notepad editor
// @Deprecated - use VSCODE instead
class MSNotepadEditor extends Editor {
	spawn: any = null
    #pythonScriptPath = require('path').resolve(__dirname, 'robot-impl.py')

    constructor() {
		super('MSNotepad')
        this.spawn = require("child_process").spawn
		this.status = 'ON'
    }

	/**
	 * This should check if python is avaiable, since
	 * this editor depends on python.
	 * 
	 */
	async checkPrerequisites(): Promise<void> {
		// No error! Lets just always asume python is present!
	}

    private run(method: string, ...args: any[]): Promise<string | Error | undefined> {
        return new Promise((res, rej) => {
            const pr = this.spawn('python', [this.#pythonScriptPath, method, ...args])
            // console.log('[RobotPython.run] Running process: ' + pr.toString())

            let out: string, err: string

            pr.stdout.on('data', (data: string) => out = data)

            pr.stderr.on('data', (data: string) => err = data)

            pr.on('close', (code: number | string) => {
                if (code == 0) res(out || undefined)
                else rej(new Error(err))
            })
        })
    }

	async write(text: string): Promise<void | Error> {
		try {
            await this.run('write', text)
        } catch (err) {
            console.error('[RobotPython.write]:\n\t' + err)
            throw err
        }
	}

	async press(keyNumber: string | number): Promise<void | Error> {
        try {
            await this.run('press', keyNumber)
        } catch (err) {
            console.error('[RobotPython.press]:\n\t' + err)
            throw err
        }
    }

	async removeSelection(): Promise<string | Error> {
		throw new Error('Method not implemented.')
	}

	async newLine(pos: 0 | 1): Promise<void | Error> {
		try {
			await this.press('end')
			await this.press('enter')
		} catch (err) {
			console.error('[MSNotepadEditor.newLine]:\n\t' + err)
			throw err
		}
	}

	async removeLine(): Promise<string | Error> {
		throw new Error('Method not implemented.')
	}

	async selectLines(from: number | undefined, to: number | undefined): Promise<string | Error> {
		throw new Error('Method not implemented.')
	}

	async goToLine(number: string): Promise<string | Error> {
		try {
			await this.hotKey('ctrl', 'g')
			await this.sleep(200)
			await this.write(number)
			await this.press('enter')
			await this.press('esc')

			return "Not empty!"
		} catch (err) {
			console.error('[MSNotepadEditor.goToLine]:\n\t' + err)
			throw err
		}
	}

	async hotKey(...keys: string[]): Promise<void | Error> {
		try {
            await this.run('hotKey', ...keys)
        } catch (err) {
            console.error('[RobotPython.hotKey]:\n\t' + err)
            throw err
        }
	}

	async sleep(msec: number) {
		return new Promise(resolve => setTimeout(resolve, msec))
	}

	turnOn() {}
	turnOff() {}
	onStatusChange() {}
}

export default new MSNotepadEditor()
