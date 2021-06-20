## Stores a value in a variable

Stores a number, string etc in a variable

### Languages

This command is available in the following languages

**English**

The following automata is responsible for recognizing the command `Stores a value in a variable` in english:

![English](phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Stores a value in a variable`:

1. new variable named [multi_word_token]
2. constant named [multi_word_token]
3. create variable called [multi_word_token] equals [expressions]
4. new constant named a equals [expressions]
5. declare variable number equals [expressions]
6. constant named [multi_word_token] equals [expressions]
7. variable named number equals [expressions]
8. constant graph equals [expressions]
9. new constant called number
10. create variable value
11. constant called number
12. constant text

**Português**

O automata seguinte é reponsável por reconhecer o comando `Guarda um valor em uma variável` em português:

![Português](phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Guarda um valor em uma variável`:

1. nova variável chamada [multi_word_token]
2. constante chamada [multi_word_token]
3. declare variável chamada [multi_word_token] igual [expressions]
4. nova constante chamada temp igual [expressions]
5. nova constante numero igual [expressions]
6. constante chamada [multi_word_token] igual [expressions]
7. variável chamada temp igual [expressions]
8. variável a igual [expressions]
9. crie constante chamada numero
10. crie constante lista
11. constante chamada texto
12. variável valor

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