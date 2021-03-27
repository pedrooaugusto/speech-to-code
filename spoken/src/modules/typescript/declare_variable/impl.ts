async function DeclareVariable(command: ParsedDeclareVariable, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "Declare a variable."')

    const memType = command.memType === MemType.constant ? 'const ' : 'let '
    const type = command.type ? `:${command.type}` : ''
    const value = command.value ? ` = ${command.value}` : '' 

    const text = `${memType}${command.name}${type}${value}`

    await editor.write(text)

    return await editor.indentSelection([undefined, 0], [undefined, text.length])
}

enum MemType {
    constant = "0",
    variable = "1"
}

type ParsedDeclareVariable = {
    memType: MemType,
    name: string,
    type: string,
    value: string
} & ParsedPhrase

function sanitizeType(lang: string, type: string): string {
    const types: [string[], string][] = [
        [['decimal', 'integer', 'inteiro', 'double', 'float'], 'number'],
        [['char', 'text', 'character', 'texto'], 'string']
    ]

    const w = types.find(([f, t]) => f.includes(type))

    return w ? w[1] : type
}

// @ts-ignore
return DeclareVariable
