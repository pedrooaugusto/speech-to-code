## Write text

Write some text in the editor

### Languages

This command is available in the following languages

**English**

The following automata is responsible for recognizing the command `Write text` in english:

![English](phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Write text`:

1. print the universe is cracked
2. write the universe is cracked
3. write it down the universe is cracked

**Português**

O automata seguinte é reponsável por reconhecer o comando `Escrever texto` em português:

![Português](phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Escrever texto`:

1. escreva isto é um teste

### Implementation

The full implementation of this command can be found on this directory under the file [impl.ts](impl.ts)

```typescript
async function write(command: WriteParsedArgs, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "write."')

    return await editor.write(command.text?.join(' '))
}

type WriteParsedArgs = {
    text: string[]
} & ParsedPhrase

// @ts-ignore
return write

(...)
```