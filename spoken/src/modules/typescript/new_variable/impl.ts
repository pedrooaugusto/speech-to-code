async function NewVariable(command: NewVariableParsedArgs, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "NewVariable"')

    return await editor.write(command.expression)
}

type NewVariableParsedArgs = {
    expression: string
} & ParsedPhrase

// @ts-ignore
return NewVariable