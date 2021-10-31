import { Context } from '../../../modules-loader'
import { ParsedPhrase, Editor, WildCard } from '../../d'

async function undoRedo(command: RunParsedArgs, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "Undo/Redo."')

    const task = command.task

    if (task === 0)
        return await editor.undo()
    else
        return await editor.redo()
}

type RunParsedArgs = {
    task: number
} & ParsedPhrase

export default undoRedo