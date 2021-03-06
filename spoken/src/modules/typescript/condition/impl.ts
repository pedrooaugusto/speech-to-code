async function Condition(command: ConditionParsedArgs, editor: Editor, context: Context) {
    console.log('[Spoken]: Executing: "Condition."')
    
    const anything = context.templates['@anything'].examples[command?.extra?.lang as string][0]
    
    let { condition = anything, otherwise = false } = command
    
    condition = typeof condition === 'string' ? condition : condition?.value
    
    let text = `if(${condition}) {\n\n}${otherwise ? ' else {\n\n}' : ''}`

    const line = await editor.getLine() as { _line: number }

    await editor.write(text)
    await editor.indentSelection()
    // await editor.goToLine(line._line as any)

    return null
}

type ConditionParsedArgs = {
    condition: string | WildCard,
    otherwise: boolean
} & ParsedPhrase

export default Condition