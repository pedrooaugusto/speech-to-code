## Move cursor

Moves the cursor to a different line or token

### Languages

This command is available in the following languages

**English**

The following automata is responsible for recognizing the command `Move cursor` in english:

![English](phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Move cursor`:

1. pointer line 42
2. cursor letter K
3. pointer first letter g
4. cursor end line
5. cursor next symbol
6. cursor next 42 symbol

**Português**

O automata seguinte é reponsável por reconhecer o comando `Mover o cursor` em português:

![Português](phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Mover o cursor`:

1. cursor linha 1
2. cursor letra z
3. cursor sétimo símbolo z
4. cursor final linha
5. ponteiro próximo letra
6. cursor próximo 1 símbolo

### Implementation

The full implementation of this command can be found on this directory under the file [impl.ts](impl.ts)

```typescript
async function cursor(args: CursorParsedArgs, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "cursor."')

    if (args.linePosition != null) {
        const pos = args.linePosition === LinePostionEnum.BEGIN ? 'BEGIN_LINE' : 'END_LINE'

        return await editor.moveCurs

(...)
```