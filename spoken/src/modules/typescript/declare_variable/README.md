## New constant or variable

Declares a new constant or variable in the current line

### Languages

This command is available in the following languages

**English**

The following automata is responsible for recognizing the command `New constant or variable` in english:

![English](phrase_en-US.png)

The following are examples of phrases, in english, used to trigger the command `New constant or variable`:

1. (declare, create) (constant, variable) (called) ({term})
2. (declare, create) (constant, variable) (called) ({term}) (with, λ) (value) ({term})
3. (declare, create) (constant, variable) (called) ({term}) (equals) ({term})
4. (declare, create) (constant, variable) (called) ({term}) (of, λ) (type) ({term}) (with, λ) (value) ({term})
5. (declare, create) (constant, variable) (called) ({term}) (of, λ) (type) ({term}) (equals) ({term})
6. (declare, create) (constant, variable) (called) ({term}) (of, λ) (type) ({term})

**Portugês**

O automata seguinte é reponsável por reconhecer o comando `New constant or variable` em português:

![Portugês](phrase_pt-BR.png)

As seguintes frases, em português, podem ser usadas para ativar o comando `New constant or variable`:

1. (declare, crie) (uma) (constante, variável) (chamada) ({term})
2. (declare, crie) (constante, variável) (chamada) ({term})
3. (declare, crie) (uma) (constante, variável) (chamada) ({term}) (com) (o) (valor) ({term})
4. (declare, crie) (uma) (constante, variável) (chamada) ({term}) (com) (valor) ({term})
5. (declare, crie) (uma) (constante, variável) (chamada) ({term}) (o) (valor) ({term})
6. (declare, crie) (uma) (constante, variável) (chamada) ({term}) (valor) ({term})
7. (declare, crie) (uma) (constante, variável) (chamada) ({term}) (do) (tipo) ({term}) (com) (o) (valor) ({term})
8. (declare, crie) (uma) (constante, variável) (chamada) ({term}) (do) (tipo) ({term}) (com) (valor) ({term})
9. (declare, crie) (uma) (constante, variável) (chamada) ({term}) (do) (tipo) ({term}) (o) (valor) ({term})
10. (declare, crie) (uma) (constante, variável) (chamada) ({term}) (do) (tipo) ({term}) (valor) ({term})
11. (declare, crie) (uma) (constante, variável) (chamada) ({term}) (do) (tipo) ({term}) (igual) (a) ({term})
12. (declare, crie) (uma) (constante, variável) (chamada) ({term}) (do) (tipo) ({term}) (igual) ({term})
13. (declare, crie) (uma) (constante, variável) (chamada) ({term}) (tipo) ({term}) (com) (o) (valor) ({term})
14. (declare, crie) (uma) (constante, variável) (chamada) ({term}) (tipo) ({term}) (com) (valor) ({term})
15. (declare, crie) (uma) (constante, variável) (chamada) ({term}) (tipo) ({term}) (o) (valor) ({term})
16. (declare, crie) (uma) (constante, variável) (chamada) ({term}) (tipo) ({term}) (valor) ({term})

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