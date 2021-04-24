async function VariableReference(command: VariableReferenceParsedArgs, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "VariableReference"')

    let { varName, parent } = command

    if (Array.isArray(varName)) {
        varName = varName.map((item, index) => {
            return index ? item.charAt(0).toUpperCase() + item.slice(1) : item
        }).join('')
    }

    if (parent) return varName

    return await editor.write(varName)
}

type VariableReferenceParsedArgs = {
    varName: string | string[]
} & ParsedPhrase

// @ts-ignore
return VariableReference