## Stores a value in a variable

Stores a number, string etc in a variable

### Languages

This command is available in the following languages

####English

The following automata is responsible for recognizing the command `Stores a value in a variable` in english:

![English](phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Stores a value in a variable`:

1. create variable called [multi_word_token]
2. constant named [multi_word_token]
3. declare variable named [multi_word_token] equals [expressions]
4. declare variable named text equals [expressions]
5. create variable value equals [expressions]
6. variable called [multi_word_token] equals [expressions]
7. constant called temp equals [expressions]
8. constant a equals [expressions]
9. declare constant called value
10. create variable a
11. constant named a
12. constant temp

####Português

O automata seguinte é reponsável por reconhecer o comando `Guarda um valor em uma variável` em português:

![Português](phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Guarda um valor em uma variável`:

1. nova constante chamada [multi_word_token]
2. variável chamada [multi_word_token]
3. nova variável chamada [multi_word_token] igual [expressions]
4. crie constante chamada lista igual [expressions]
5. nova variável texto igual [expressions]
6. constante chamada [multi_word_token] igual [expressions]
7. variável chamada valor igual [expressions]
8. variável valor igual [expressions]
9. nova constante chamada lista
10. crie constante valor
11. variável chamada lista
12. variável temp

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