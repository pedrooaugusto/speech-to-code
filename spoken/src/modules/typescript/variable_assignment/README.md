## Stores a value in a variable

Stores a number, string etc in a variable

### Languages

This command is available in the following languages

**English**

The following automata is responsible for recognizing the command `Stores a value in a variable` in english:

![English](phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Stores a value in a variable`:

1. declare constant called [multi_word_token]
2. variable named [multi_word_token]
3. create variable named [multi_word_token] equals [expressions]
4. create constant called text equals [expressions]
5. declare variable value equals [expressions]
6. constant named [multi_word_token] equals [expressions]
7. constant called value equals [expressions]
8. constant number equals [expressions]
9. create variable called a
10. new variable text
11. constant called value
12. constant number

**Português**

O automata seguinte é reponsável por reconhecer o comando `Guarda um valor em uma variável` em português:

![Português](phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Guarda um valor em uma variável`:

1. nova variável chamada [multi_word_token]
2. variável chamada [multi_word_token]
3. nova constante chamada [multi_word_token] igual [expressions]
4. declare variável chamada valor igual [expressions]
5. crie variável a igual [expressions]
6. variável chamada [multi_word_token] igual [expressions]
7. variável chamada valor igual [expressions]
8. variável a igual [expressions]
9. nova variável chamada a
10. nova constante lista
11. variável chamada valor
12. constante a

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