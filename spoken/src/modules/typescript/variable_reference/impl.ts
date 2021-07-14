import { Context } from '../../../modules-loader'
import { ParsedPhrase, Editor, WildCard } from '../../d'

async function VariableReference(command: VariableReferenceParsedArgs, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "VariableReference"')

    let { varName, parent, isNamespace = false } = command

    varName = Array.isArray(varName) ? varName : [varName]
    varName = isNamespace ? varName.map(a => a[0].toUpperCase() + a.substr(1)).join('') : varName.join('')

    if (parent) return varName

    return await editor.write(varName)
}

type VariableReferenceParsedArgs = {
    varName: string | string[],
    isNamespace: boolean
} & ParsedPhrase

export default VariableReference