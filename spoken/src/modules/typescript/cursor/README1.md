## Move cursor

Moves the cursor to a line or token

### Languages

This command is available in the following idioms

**English**

The following automata is responsible for recognizing the command `Move curosr` in english:

![English](phrase_en-US.png)

The following are examples of phrases, in english, used to trigger the command `Move cursor`:

1. Hello my name is
2. HO ARE YOU

**Português**

O automata seguinte é reponsável por reconhecer o comando `Mover cursor` em português:

![Português](phrase_pt-BR.png)

As seguintes frases, em português, podem ser usadas para ativar o comando `Mover cursor`:

1. Hello my name is
2. HO ARE YOU

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