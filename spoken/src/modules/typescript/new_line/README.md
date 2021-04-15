## New line

Creates a new line above or below the current line

### Languages

This command is available in the following languages

**English**

The following automata is responsible for recognizing the command `New line` in english:

![English](phrase_en-US.png)

The following are examples of phrases, in english, used to trigger the command `New line`:

1. (new) (line)
2. (create) (new) (line)
3. (create) (line)
4. (new) (line) (above, below)
5. (line) (above, below)
6. (create) (new) (line) (above, below)
7. (create) (line) (above, below)

**Português**

O automata seguinte é reponsável por reconhecer o comando `New line` em português:

![Português](phrase_pt-BR.png)

As seguintes frases, em português, podem ser usadas para ativar o comando `New line`:

1. (nova) (linha)
2. (linha) (nova)
3. (crie) (nova) (linha)
4. (crie) (linha)
5. (nova) (linha) (acima, abaixo)
6. (linha) (nova) (acima, abaixo)
7. (linha) (acima, abaixo)
8. (crie) (nova) (linha) (acima, abaixo)
9. (crie) (linha) (acima, abaixo)

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