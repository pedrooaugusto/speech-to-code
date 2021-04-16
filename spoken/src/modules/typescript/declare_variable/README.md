## New constant or variable

Declares a new constant or variable in the current line

### Languages

This command is available in the following languages

**English**

The following automata is responsible for recognizing the command `New constant or variable` in english:

![English](phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `New constant or variable`:

1. create constant called temp
2. create variable called value with value temp
3. declare constant called graph equals text
4. declare variable called temp of type text with value value
5. declare variable called text type text equals graph
6. declare constant called temp type text

**Portugês**

O automata seguinte é reponsável por reconhecer o comando `Nova constante ou variável` em português:

![Portugês](phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Nova constante ou variável`:

1. declare uma variável chamada temp
2. crie variável chamada lista
3. crie uma variável chamada numero com o valor numero
4. declare uma variável chamada valor com valor valor
5. crie uma constante chamada numero o valor lista
6. crie uma constante chamada valor valor valor
7. crie uma variável chamada numero do tipo lista com o valor lista
8. declare uma variável chamada lista do tipo valor com valor valor
9. declare uma constante chamada valor do tipo texto o valor numero
10. crie uma constante chamada numero do tipo valor valor temp
11. crie uma constante chamada temp do tipo lista igual a valor
12. declare uma variável chamada numero do tipo texto igual temp
13. declare uma constante chamada texto tipo lista com o valor texto
14. declare uma constante chamada lista tipo texto com valor valor
15. crie uma variável chamada numero tipo numero o valor numero
16. crie uma variável chamada lista tipo texto valor valor

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