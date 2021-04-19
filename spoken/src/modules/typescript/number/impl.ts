async function WriteNumber(command: WriteNumberParsedArgs, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "WriteNumber"')

    return await editor.write(command.number)
}

type WriteNumberParsedArgs = {
    number: string
} & ParsedPhrase

// @ts-ignore
return WriteNumber