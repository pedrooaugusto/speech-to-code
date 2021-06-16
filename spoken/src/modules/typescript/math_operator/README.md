## Writes a math operator

Writes a math operator (*, -, +, /) meant to be used inside expressions

### Languages

This command is available in the following languages

**English**

The following automata is responsible for recognizing the command `Writes a math operator` in english:

![English](phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Writes a math operator`:

1. plus

**Português**

O automata seguinte é reponsável por reconhecer o comando `Escreve uma operador matemático` em português:

![Português](phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Escreve uma operador matemático`:

1. mais

### Implementation

The full implementation of this command can be found on this directory under the file [impl.ts](impl.ts)

```typescript
async function MathOperator(command: MathOperatorParsedArgs, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "MathOperator"')

    const { mathOperator } = command

    const operator = ['+', '*', '-', '/'][mathOperator] || 'error'

    return { operator }
}

type Math

(...)
```