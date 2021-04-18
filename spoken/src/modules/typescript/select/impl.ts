async function Select(command: SelectParsedArgs, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "select"')

    if (command.selectLine != undefined) {
        return await editor.select(
            parseInt(command.from, 10),
            parseInt(command.to, 10),
            true
        )
    } else if (command.word != undefined) {
        const pos = await editor.findPositionOf(command.word) as number[][]
        if (pos.length) {
            return await editor.select(pos[0][0], pos[0][1] - 1, false)
        }

        throw new Error('Nothing found for string: ' + command.word)
    }

    const from = command.from || ''
    const to = command.to || ''
    const fromPos = parseInt(command.fromPosition, 10) || 1
    const toPos = parseInt(command.toPosition, 10) || 1

    if (from === '' || to === '') {
        throw new Error('Invalid arguments!')
    }

    const matchFrom = await editor.findPositionOf(from) as number[][]
    const matchTo = await editor.findPositionOf(to) as number[][]

    return await editor.select(matchFrom[fromPos - 1][0], matchTo[toPos - 1][0], false)
}

type SelectParsedArgs = {
    word: string
    from: string
    to: string
    fromPosition: string
    toPosition: string
    selectLine: string
} & ParsedPhrase

// @ts-ignore
return Select