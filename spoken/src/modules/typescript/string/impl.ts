async function WriteString(command: WriteStringParsedArgs, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "WriteString"')

    return await editor.write(command.string)
}

type WriteStringParsedArgs = {
    string: string
} & ParsedPhrase

// @ts-ignore
return WriteString