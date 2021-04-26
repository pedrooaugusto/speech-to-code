async function WriteString(command: WriteStringParsedArgs, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "WriteString"')

    const text = '"' + command.string.join(' ') + '"'

    if (command.parent) return text

    return await editor.write(text)
}

type WriteStringParsedArgs = {
    string: string[]
} & ParsedPhrase

// @ts-ignore
return WriteString