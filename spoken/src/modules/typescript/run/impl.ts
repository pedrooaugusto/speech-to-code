import { Context } from '../../../modules-loader'
import { ParsedPhrase, Editor, WildCard } from '../../d'

async function run(command: RunParsedArgs, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "run."')

    const info = await editor.fileInfo() as { fileName: string }

    return await editor.writeOnTerminal('node "' + info.fileName + '"')
}

type RunParsedArgs = {
    
} & ParsedPhrase

export default run