# TypeScript Commands

Those are all the available phrases/commands for the typescript language.

### New variable or constant

Declares a new variable or constant in the current line.

**Phrases:**

* Português
    ![declare_variable_pt-BR](variable.svg)
* English
    ![declare_variable_en-US](variable.svg)

**Implementation:**

```javascript
async function declareConst(c: Command, editor: VSCodeEditor, context: Context) {
    console.log('[Spoken]: Executing: "Declare a variable."')
    const memType = parseInt(c.memType || 0, 10) === 0 ? 'const ' : 'let '
    const type = c.type ? `:${c.type}` : ''
    const value = c.value ? ` = ${c.value}` : '' 

    const text = `${memType}${c.name}${type}${value}`

    await editor.write(text)
    return await editor.indentSelection([undefined, 0], [undefined, text.length])
}
```