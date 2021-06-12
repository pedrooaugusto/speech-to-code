async function write(command: WriteParsedArgs, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "write."')

    const text = command.isSpace ? ' ' : Array.isArray(command.text) ? command.text?.join(' ') : command.text

    return await editor.write(text)
}

type WriteParsedArgs = {
    text: string[],
    isSpace: boolean
} & ParsedPhrase

// @ts-ignore
return write