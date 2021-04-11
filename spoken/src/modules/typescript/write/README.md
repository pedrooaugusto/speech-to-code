## Write text

Write some text in the editor

### Languages

This command is available in the following languages

**English**

The following automata is responsible for recognizing the command `Write text` in english:

![English](phrase_en-US.png)

The following are examples of phrases, in english, used to trigger the command `Write text`:

1. (write)

**Português**

O automata seguinte é reponsável por reconhecer o comando `Write text` em português:

![Português](phrase_pt-BR.png)

As seguintes frases, em português, podem ser usadas para ativar o comando `Write text`:

1. (escreva)

### Implementation

Full implementation of this command can be found on this repository under the file [impl.ts](impl.ts)

```typescript
async function write(command: WriteParsedArgs, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "write."')

    return await editor.write(command.text)
}

type WriteParsedArgs = {
    text: string
} & ParsedPhrase

// @ts-ignore
return write

(...)
```