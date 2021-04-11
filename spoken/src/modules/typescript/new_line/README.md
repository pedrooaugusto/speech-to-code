## New line

Creates a new line above or below the current line

### Languages

This command is available in the following languages

**English**

The following automata is responsible for recognizing the command `New line` in english:

![English](phrase_en-US.png)

The following are examples of phrases, in english, used to trigger the command `New line`:

1. (create) (line)
2. (line) (above, below)

**Português**

O automata seguinte é reponsável por reconhecer o comando `New line` em português:

![Português](phrase_pt-BR.png)

As seguintes frases, em português, podem ser usadas para ativar o comando `New line`:

1. (crie) (linha)
2. (linha) (acima, abaixo)

### Implementation

Full implementation of this command can be found on this repository under the file [impl.ts](impl.ts)

```typescript
async function newLine(command: NewLineParsedArgs, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "new line."')

    return await editor.newLine(command.position)
}

type NewLineParsedArgs = {
    position: PositionEnum
} & ParsedPhrase

// @ts-ignore
return newLine

(...)
```