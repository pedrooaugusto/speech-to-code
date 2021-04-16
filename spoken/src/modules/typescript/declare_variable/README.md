## New constant or variable

Declares a new constant or variable in the current line

### Languages

This command is available in the following languages

**English**

The following automata is responsible for recognizing the command `New constant or variable` in english:

![English](phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `New constant or variable`:

1. create variable called number
2. declare constant called value value temp
3. declare variable called value equals graph
4. declare constant called temp type text value text
5. create variable called value of type text equals text
6. create variable called temp type number

**Portugês**

O automata seguinte é reponsável por reconhecer o comando `Nova constante ou variável` em português:

![Portugês](phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Nova constante ou variável`:

1. crie uma variável chamada temp
2. declare constante chamada valor
3. declare uma constante chamada texto com o valor valor
4. declare uma variável chamada numero com valor lista
5. crie uma variável chamada numero o valor numero
6. crie uma variável chamada valor valor texto
7. crie uma constante chamada numero do tipo texto com o valor valor
8. crie uma variável chamada texto do tipo numero com valor valor
9. crie uma variável chamada numero do tipo numero o valor lista
10. crie uma variável chamada valor do tipo valor valor lista
11. declare uma constante chamada valor do tipo valor igual a valor
12. declare uma constante chamada lista do tipo temp igual texto
13. declare uma constante chamada numero tipo lista com o valor valor
14. crie uma variável chamada valor tipo numero com valor valor
15. crie uma constante chamada lista tipo temp o valor valor
16. declare uma constante chamada valor tipo valor valor lista

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