## Stores a value in a variable

Stores a number, string etc in a variable

### Languages

This command is available in the following languages

**English**

The following automata is responsible for recognizing the command `Stores a value in a variable` in english:

![English](phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Stores a value in a variable`:

1. declare variable called [multi_word_token]
2. variable called [multi_word_token]
3. declare variable named [multi_word_token] equals [expressions]
4. new constant called text equals [expressions]
5. create variable graph equals [expressions]
6. constant named [multi_word_token] equals [expressions]
7. variable called graph equals [expressions]
8. constant number equals [expressions]
9. declare constant called graph
10. declare constant value
11. constant named text
12. constant graph

**Português**

O automata seguinte é reponsável por reconhecer o comando `Guarda um valor em uma variável` em português:

![Português](phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Guarda um valor em uma variável`:

1. declare constante chamada [multi_word_token]
2. variável chamada [multi_word_token]
3. declare constante chamada [multi_word_token] igual [expressions]
4. crie variável chamada temp igual [expressions]
5. nova constante temp igual [expressions]
6. variável chamada [multi_word_token] igual [expressions]
7. constante chamada texto igual [expressions]
8. constante a igual [expressions]
9. nova variável chamada valor
10. nova variável lista
11. constante chamada valor
12. variável lista

### Implementation

The full implementation of this command can be found on this directory under the file [impl.ts](impl.ts)

```typescript
async function NewVariable(command: NewVariableParsedArgs, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "NewVariable"')

    let { isNew, varName, expression, memType } = command

    const value = typeof expression === 'string' ? expression : expression?.value
    cons

(...)
```