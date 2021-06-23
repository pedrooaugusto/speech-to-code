## Stores a value in a variable

Stores a number, string etc in a variable

### Languages

This command is available in the following languages

#### English

The following automata is responsible for recognizing the command `Stores a value in a variable` in english:

![English](phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Stores a value in a variable`:

1. new variable named [multi_word_token]
2. constant called [multi_word_token]
3. declare variable called [multi_word_token] equals [expressions]
4. declare variable called temp equals [expressions]
5. new constant value equals [expressions]
6. variable named [multi_word_token] equals [expressions]
7. constant called a equals [expressions]
8. variable a equals [expressions]
9. declare variable called graph
10. create constant a
11. variable called text
12. variable a

#### Português

O automata seguinte é reponsável por reconhecer o comando `Guarda um valor em uma variável` em português:

![Português](phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Guarda um valor em uma variável`:

1. nova constante chamada [multi_word_token]
2. constante chamada [multi_word_token]
3. crie variável chamada [multi_word_token] igual [expressions]
4. declare variável chamada a igual [expressions]
5. declare variável valor igual [expressions]
6. variável chamada [multi_word_token] igual [expressions]
7. variável chamada numero igual [expressions]
8. constante temp igual [expressions]
9. declare variável chamada lista
10. declare constante valor
11. variável chamada numero
12. constante numero

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