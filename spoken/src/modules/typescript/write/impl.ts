async function write(command: WriteParsedArgs, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "write."')

    return await editor.write(command.text?.join(' '))
}

type WriteParsedArgs = {
    text: string[]
} & ParsedPhrase

// @ts-ignore
return write