## Move cursor

Moves the cursor to a different line or token

### Languages

This command is available in the following languages

#### English

The following automata is responsible for recognizing the command `Move cursor` in english:

![English](phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Move cursor`:

1. cursor line 42
2. pointer symbol g
3. pointer 1ª symbol K
4. cursor begin line
5. pointer next symbol
6. cursor next 1 symbol

#### Português

O automata seguinte é reponsável por reconhecer o comando `Mover o cursor` em português:

![Português](phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Mover o cursor`:

1. cursor linha 42
2. ponteiro símbolo a
3. cursor 42ª símbolo a
4. cursor começo linha
5. ponteiro próximo letra
6. ponteiro próximo 42 letra

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