## Writes a string

Writes a string in the editor

### Languages

This command is available in the following languages

**English**

The following automata is responsible for recognizing the command `Writes a string` in english:

![English](phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Writes a string`:

1. text string

**Português**

O automata seguinte é reponsável por reconhecer o comando `Escreve uma string` em português:

![Português](phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Escreve uma string`:

1. text string

### Implementation

The full implementation of this command can be found on this directory under the file [impl.ts](impl.ts)

```typescript
async function WriteString(command: WriteStringParsedArgs, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "WriteString"')

    return await editor.write(command.string)
}

type WriteStringParsedArgs = {
    string: string
} & ParsedPhrase

// @ts-ignore
return WriteS

(...)
```