## Move cursor

Moves the cursor to a different line or token

### Languages

This command is available in the following languages

**English**

The following automata is responsible for recognizing the command `Move cursor` in english:

![English](phrase_en-US.png)

The following are examples of phrases, in english, used to trigger the command `Move cursor`:

1. (cursor, pointer) (line) ({numeral})
2. (cursor, pointer) (symbol, letter) ({term})
3. (cursor, pointer) ({term}) (symbol, letter) ({term})
4. (cursor, pointer) (begin, end) (line)
5. (cursor, pointer) (next) (symbol)
6. (cursor, pointer) (next) ({numeral}) (symbol)

**Português**

O automata seguinte é reponsável por reconhecer o comando `Move cursor` em português:

![Português](phrase_pt-BR.png)

As seguintes frases, em português, podem ser usadas para ativar o comando `Move cursor`:

1. (cursor, ponteiro) (linha) ({numeral})
2. (cursor, ponteiro) (símbolo, letra) ({term})
3. (cursor, ponteiro) ({term}) (símbolo, letra) ({term})
4. (cursor, ponteiro) (começo, final) (linha)
5. (cursor, ponteiro) (próximo) (símbolo, letra)
6. (cursor, ponteiro) (próximo) ({numeral}) (símbolo, letra)

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