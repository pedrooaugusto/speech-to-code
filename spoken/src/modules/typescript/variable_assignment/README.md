## Stores a value in a variable

Stores a number, string etc in a variable

### Languages

This command is available in the following languages

**English**

The following automata is responsible for recognizing the command `Stores a value in a variable` in english:

![English](phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Stores a value in a variable`:

1. new constant called [multi_word_token]
2. variable called [multi_word_token]
3. new variable named [multi_word_token] equals [expressions]
4. declare variable called a equals [expressions]
5. new constant text equals [expressions]
6. variable called [multi_word_token] equals [expressions]
7. constant named value equals [expressions]
8. variable text equals [expressions]
9. new variable called number
10. declare constant a
11. variable called graph
12. variable temp

**Português**

O automata seguinte é reponsável por reconhecer o comando `Guarda um valor em uma variável` em português:

![Português](phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Guarda um valor em uma variável`:

1. nova variável chamada [multi_word_token]
2. variável chamada [multi_word_token]
3. declare constante chamada [multi_word_token] igual [expressions]
4. nova constante chamada a igual [expressions]
5. declare variável numero igual [expressions]
6. constante chamada [multi_word_token] igual [expressions]
7. constante chamada a igual [expressions]
8. constante a igual [expressions]
9. declare constante chamada temp
10. declare constante valor
11. constante chamada numero
12. variável numero

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