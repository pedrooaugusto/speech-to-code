async function MultiWordTokens(command: MultiWordTokensParsedArgs, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "MultiWordTokens"')

    function camelCase(words: string[]) {
        return words.map((a, i) => i ? a.charAt(0).toUpperCase() + a.slice(1) : a).join('')
    }

    if (command.extra?.case === 'camel') {
        return camelCase(command.words.split(' '))
    }

    return command.words.split(' ')
}

type MultiWordTokensParsedArgs = {
    words: string
} & ParsedPhrase

// @ts-ignore
return MultiWordTokens