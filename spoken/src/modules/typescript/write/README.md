## Write text

Write some text in the editor

### Languages

This command is available in the following languages

#### English

The following automata is responsible for recognizing the command `Write text` in english:

![English](phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Write text`:

1. print
2. write
3. write it
4. print space
5. write space
6. write it down space
7. print the universe is cracked who are you
8. write down who are you the universe is cracked
9. write it who are you the universe is cracked

#### Português

O automata seguinte é reponsável por reconhecer o comando `Escrever texto` em português:

![Português](phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Escrever texto`:

1. escreva
2. escreva espaço
3. escreva isto é um teste quem é você

### Implementation

The full implementation of this command can be found on this directory under the file [impl.ts](impl.ts)

```typescript
async function write(command: WriteParsedArgs, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "write."')

    const text = command.isSpace ? ' ' : Array.isArray(command.text) ? command.text?.join(' ') : command.text

    return await editor.write(text)
}

type WritePars

(...)
```