## New constant or variable

Declares a new constant or variable in the current line

### Languages

This command is available in the following languages

**English**

The following automata is responsible for recognizing the command `New constant or variable` in english:

![English](phrase_en-US.png)

The following are examples of phrases, in english, used to trigger the command `New constant or variable`:

1. (declare, create)  (constant, variable)  (called)  ({term})
2. (declare, create)  (constant, variable)  (called)  ({term})  (equals)  ({term})
3. (declare, create)  (constant, variable)  (called)  ({term})  (of, λ)  (type)  ({term})

**Portugês**

O automata seguinte é reponsável por reconhecer o comando `New constant or variable` em português:

![Portugês](phrase_pt-BR.png)

As seguintes frases, em português, podem ser usadas para ativar o comando `New constant or variable`:

1. (declare, crie)  (constante, variável)  (chamada)  ({term})
2. (declare, crie)  (constante, variável)  (chamada)  ({term})  (valor)  ({term})
3. (declare, crie)  (constante, variável)  (chamada)  ({term})  (tipo)  ({term})

### Implementation

Full implementation of this command can be found on this repository under the file [impl.ts](impl.ts)

```typescript
async function DeclareVariable(command: ParsedDeclareVariable, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "Declare a variable."')

    const memType = command.memType === MemType.constant ? 'const ' : 'let '
    const type = command.type ? `:${command.type}` : ''
    c

(...)
```