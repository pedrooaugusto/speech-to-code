import MSNotepadEditor, { Editor } from './default'
import VSCodeEditor from './vscode/'

type EditorState = { name: string, current: boolean, status: string }

class EditorService {
    editors: Editor[]
    state: EditorState[]
    #currentEditorName: string
    #stateChangeCallback: null | ((state: EditorState[]) => void) = null

    constructor() {
        this.editors = [VSCodeEditor, MSNotepadEditor]
        this.#currentEditorName = VSCodeEditor.getName()
        this.state = this.getState()

        for (const editor of this.editors) {
            editor.onStatusChange(() => {
                this.state = this.getState()
                try {                    
                    this.#stateChangeCallback?.(this.state)
                } catch (e) {
                    // dont know
                }
            })
        }
    }

    private getState() {
        return this.editors.map(item => ({
            name: item.getName(),
            status: item.status,
            current: item.getName() === this.#currentEditorName
        }))
    }

    onStateChange(fn: (s: EditorState[]) => void) {
        this.#stateChangeCallback = fn

        return this
    }

    init () {
        this.currentEditor.turnOn()
    }

    stop () {
        for (const e of this.editors) e.turnOff()
    }

    get currentEditor(): Editor {
        return this.editors.find(a => a.getName() === this.#currentEditorName) ?? this.editors[0]
    }

    setCurrentEditor(e: string) {
        this.currentEditor.turnOff()
        this.#currentEditorName = e
        this.currentEditor.turnOn()

        this.state = this.getState()
        this.#stateChangeCallback?.(this.state)
    }

    register(editor: Editor) {
        this.editors.push(editor)
    }
}

export default new EditorService()
