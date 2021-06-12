async function Repetition(command: RepetitionParsedArgs, editor: Editor, context: Context) {
    console.log('[Spoken]: Executing: "Repetition."')
    
    const anything = context.templates['@anything'].examples[command?.extra?.lang as string][0]

    let text = null

    if (command.from == undefined && command.item == undefined) {
        text = `for(${anything}; ${anything}; ${anything})\n{\n}`
    } else if (command.from !== null && command.to !== null) {
        const from = typeof command.from === 'string' ? command.from : command.from.value
        const to = typeof command.to === 'string' ? command.to : command.to.value

        text = `for(${anything}; ${anything}; ${anything})\n{\n}`
    }

    // let { condition = anything, otherwise = false } = command

    // condition = typeof condition === 'string' ? condition : condition?.value

    // let text2 = `if(${condition}) {\n\n}${otherwise ? ' else {\n\n}' : ''}`

    // const line = await editor.getLine() as { _line: number }

    // await editor.write(text2)
    // await editor.indentSelection([line._line - 3, 0], [line._line + (otherwise ? 8 : 3), 0])
    // await editor.goToLine(line._line as any)

    return null
}

const toArray = () => {}

type RepetitionParsedArgs = {
    from: string | WildCard,
    to: string | WildCard,
    step?: string | WildCard,
    item: string,
    collection: string | WildCard
} & ParsedPhrase

export default Repetition
