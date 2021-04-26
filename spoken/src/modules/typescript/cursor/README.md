## Move cursor

Moves the cursor to a different line or token

### Languages

This command is available in the following languages

**English**

The following automata is responsible for recognizing the command `Move cursor` in english:

![English](phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Move cursor`:

1. pointer line 42
2. cursor letter g
3. cursor 42ª symbol M
4. pointer begin line
5. pointer next symbol
6. cursor next 1 symbol

**Português**

O automata seguinte é reponsável por reconhecer o comando `Mover o cursor` em português:

![Português](phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Mover o cursor`:

1. ponteiro linha 1
2. ponteiro símbolo B
3. ponteiro 1ª letra a
4. ponteiro começo linha
5. cursor próximo letra
6. ponteiro próximo 1 símbolo

### Implementation

The full implementation of this command can be found on this directory under the file [impl.ts](impl.ts)

```typescript
async function cursor(args: CursorParsedArgs, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "cursor."')

    if (args.linePosition != null) {
        const pos = args.linePosition === LinePostionEnum.BEGIN ? 'BEGIN_LINE' : 'END_LINE'
        return await editor.moveCursor

(...)
```