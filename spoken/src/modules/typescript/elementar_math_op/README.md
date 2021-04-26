## Writes a Elementar Math Operation

Writes Elementar Math Operation (*, -, +, /)

### Languages

This command is available in the following languages

**English**

The following automata is responsible for recognizing the command `Writes a Elementar Math Operation` in english:

![English](phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Writes a Elementar Math Operation`:

1. [number] minus [number]

**Português**

O automata seguinte é reponsável por reconhecer o comando `Escreve uma operação matemática elementar` em português:

![Português](phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Escreve uma operação matemática elementar`:

1. [number] dividido [number]

### Implementation

The full implementation of this command can be found on this directory under the file [impl.ts](impl.ts)

```typescript
async function WriteElementarMathOperation(command: WriteElementarMathOperationParsedArgs, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "WriteElementarMathOperation"')

    const { left, operation, right } = command

    const text = `${left} ${operation} ${right}`

  

(...)
```