## Stores a value in a variable

Stores a number, string etc in a variable

### Languages

This command is available in the following languages

**English**

The following automata is responsible for recognizing the command `Stores a value in a variable` in english:

![English](phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Stores a value in a variable`:

1. declare variable called [multi_word_token]
2. constant named [multi_word_token]
3. create constant named [multi_word_token] equals [expressions]
4. declare variable named a equals [expressions]
5. declare variable a equals [expressions]
6. variable called [multi_word_token] equals [expressions]
7. variable named graph equals [expressions]
8. variable graph equals [expressions]
9. create constant named number
10. create variable text
11. variable called temp
12. variable value

**Português**

O automata seguinte é reponsável por reconhecer o comando `Guarda um valor em uma variável` em português:

![Português](phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Guarda um valor em uma variável`:

1. crie variável chamada [multi_word_token]
2. variável chamada [multi_word_token]
3. declare variável chamada [multi_word_token] igual [expressions]
4. nova constante chamada a igual [expressions]
5. crie variável temp igual [expressions]
6. constante chamada [multi_word_token] igual [expressions]
7. variável chamada a igual [expressions]
8. constante valor igual [expressions]
9. nova constante chamada temp
10. nova constante valor
11. variável chamada texto
12. variável texto

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