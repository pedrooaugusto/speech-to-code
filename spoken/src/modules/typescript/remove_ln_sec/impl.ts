async function remove(command: RemoveParsedArgs, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "remove line/selection."')

    if (command.isLine) {
        const line = await editor.getLine() as { _line: string }

        return await editor.remove(line)
    } else {
        return await editor.write('')
    }
}

type RemoveParsedArgs = {
    isSelection: boolean,
    isLine: boolean
} & ParsedPhrase

export default remove