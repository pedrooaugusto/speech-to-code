## Move cursor

Moves the cursor to a different line or token

### Languages

This command is available in the following languages

**English**

The following automata is responsible for recognizing the command `Move cursor` in english:

![English](phrase_en-US.png)

The following are examples of phrases, in english, used to trigger the command `Move cursor`:

1. (cursor) (line) ({numeral})
2. (cursor) (symbol) ({term})
3. (cursor) (begin, end) (line)
4. (cursor) (next) (symbol)

**Português**

O automata seguinte é reponsável por reconhecer o comando `Move cursor` em português:

![Português](phrase_pt-BR.png)

As seguintes frases, em português, podem ser usadas para ativar o comando `Move cursor`:

1. (cursor, ponteiro) (linha) ({numeral})
2. (cursor, ponteiro) (símbolo, letra) ({term})
3. (cursor, ponteiro) (começo, final) (linha)
4. (cursor, ponteiro) (próximo) (símbolo, letra)

### Implementation

Full implementation of this command can be found on this repository under the file [impl.ts](impl.ts)

```typescript
async function cursor(args: CursorParsedArgs, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "cursor."')

    if (args.linePosition != null) {
        const pos = args.linePosition === LinePostionEnum.BEGIN ? 'BEGIN_LINE' : 'END_LINE'
        return await editor.moveCursor

(...)
```