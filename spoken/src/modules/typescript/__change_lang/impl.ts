import { ParsedPhrase, Editor } from '../../d'

async function changeLang(command: ParsedPhrase, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "changeLang."')
    console.log('This is an internal command this file should never run!')

    return null
}

export default changeLang