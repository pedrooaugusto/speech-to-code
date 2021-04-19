## New constant or variable

Declares a new constant or variable in the current line

### Languages

This command is available in the following languages

**English**

The following automata is responsible for recognizing the command `New constant or variable` in english:

![English](phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `New constant or variable`:

1. new constant called graph
2. create constant named value equals graph
3. create constant named a type graph equals temp
4. declare constant called temp type value

**Portugês**

O automata seguinte é reponsável por reconhecer o comando `Nova constante ou variável` em português:

![Portugês](phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Nova constante ou variável`:

1. declare variável chamada valor
2. declare constante chamada valor valor numero
3. criar constante chamada temp tipo valor valor a
4. criar constante chamada valor tipo valor

### Implementation

The full implementation of this command can be found on this directory under the file [impl.ts](impl.ts)

```typescript
async function DeclareVariable(command: ParsedDeclareVariable, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "Declare a variable."')

    const memType = command.memType === MemType.constant ? 'const ' : 'let '
    const type = command.type ? `:${command.type}` : ''
    c

(...)
```