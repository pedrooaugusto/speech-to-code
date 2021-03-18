import MSNotepadEditor, { Editor } from './default'
import VSCodeEditor from './vscode/'

class EditorService {
    editors: Editor[] = [VSCodeEditor as unknown as Editor, MSNotepadEditor]

    get default(): Editor {
        return this.editors[1]
    }

    register(editor: Editor) {
        this.editors.push(editor)
    }
}

export default new EditorService()
