## Stores a value in a variable

Stores a number, string etc in a variable

### Languages

This command is available in the following languages

**English**

The following automata is responsible for recognizing the command `Stores a value in a variable` in english:

![English](phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Stores a value in a variable`:

1. new variable named [multi_word_token]
2. variable named [multi_word_token]
3. new constant called [multi_word_token] equals [expressions]
4. create variable named a equals [expressions]
5. declare variable number equals [expressions]
6. constant named [multi_word_token] equals [expressions]
7. variable named value equals [expressions]
8. constant number equals [expressions]
9. new constant named graph
10. new variable a
11. constant called text
12. constant graph

**Português**

O automata seguinte é reponsável por reconhecer o comando `Guarda um valor em uma variável` em português:

![Português](phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Guarda um valor em uma variável`:

1. nova constante chamada [multi_word_token]
2. constante chamada [multi_word_token]
3. declare variável chamada [multi_word_token] igual [expressions]
4. declare variável chamada lista igual [expressions]
5. crie constante numero igual [expressions]
6. constante chamada [multi_word_token] igual [expressions]
7. variável chamada lista igual [expressions]
8. variável numero igual [expressions]
9. crie constante chamada numero
10. declare variável temp
11. variável chamada numero
12. constante temp

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