async function write(command: WriteParsedArgs, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "write."')

    const text = Array.isArray(command.text) ? command.text?.join(' ') : command.text

    return await editor.write(text)
}

type WriteParsedArgs = {
    text: string[]
} & ParsedPhrase

// @ts-ignore
return write