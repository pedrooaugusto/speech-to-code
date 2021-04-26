async function VariableReference(command: VariableReferenceParsedArgs, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "VariableReference"')

    let { varName, parent } = command

    varName = Array.isArray(varName) ? varName.join('') : varName

    if (parent) return varName

    return await editor.write(varName)
}

type VariableReferenceParsedArgs = {
    varName: string | string[]
} & ParsedPhrase

// @ts-ignore
return VariableReference