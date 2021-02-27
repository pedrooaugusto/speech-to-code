import RobotService, { Robot } from './robot'

abstract class Editor {
	constructor(protected robot: Robot, protected editorName: string) {
		this.robot = robot
		this.editorName = editorName
	}

	public getName(): string { return this.editorName }

	abstract newLine(): Promise<void | Error>
	abstract selectLines(from: number | undefined, to: number | undefined): string
	abstract goToLine(number: string): Promise<void | Error>
	abstract setCurrentLine(from: number): void
}

// Microsoft Notepad editor
export class MSNotepadEditor extends Editor {

	constructor(robot: Robot) {
		super(robot, 'MSNotepad')
	}

	// END + ENTER
	async newLine() {
		try {
			await this.robot.press('end')
			await this.robot.press('enter')
		} catch (err) {
			console.error('[MSNotepadEditor.newLine]:\n\t' + err)
			throw err
		}
	}

	// (gt(from) + HOME) + ((SHIFT+DOWN) * to) + CTRL+C + (read from clipboard and return)
	// select current line: shift + home
	selectLines(from: number | undefined, to: number | undefined): string {
		return ""
	}

	// goToLine(from) + HOME + keydown * to + CTRL+C

	// CTRL + G + ESC + ESC
	async goToLine(number: string) {
		try {
			await this.robot.hotKey('ctrl', 'g')
			await this.sleep(200)
			await this.robot.write(number)
			await this.robot.press('enter')
			await this.robot.press('esc')
		} catch (err) {
			console.error('[MSNotepadEditor.goToLine]:\n\t' + err)
			throw err
		}
	}

	setCurrentLine(from: number): void {

	}

	async sleep(msec: number) {
		return new Promise(resolve => setTimeout(resolve, msec))
	}

	async write(text: string) {
		return await this.robot.write(text)
	}
}

export default {
    defaultEditor: new MSNotepadEditor(RobotService.defaultRobot)
}