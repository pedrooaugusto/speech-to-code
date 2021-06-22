## Stores a value in a variable

Stores a number, string etc in a variable

### Languages

This command is available in the following languages

#### English

The following automata is responsible for recognizing the command `Stores a value in a variable` in english:

![English](phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Stores a value in a variable`:

1. declare constant called [multi_word_token]
2. constant called [multi_word_token]
3. create variable named [multi_word_token] equals [expressions]
4. declare variable named text equals [expressions]
5. new variable value equals [expressions]
6. constant named [multi_word_token] equals [expressions]
7. constant called graph equals [expressions]
8. constant number equals [expressions]
9. new constant called value
10. declare constant value
11. variable named text
12. variable a

#### Português

O automata seguinte é reponsável por reconhecer o comando `Guarda um valor em uma variável` em português:

![Português](phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Guarda um valor em uma variável`:

1. nova variável chamada [multi_word_token]
2. variável chamada [multi_word_token]
3. crie variável chamada [multi_word_token] igual [expressions]
4. crie constante chamada numero igual [expressions]
5. crie constante temp igual [expressions]
6. variável chamada [multi_word_token] igual [expressions]
7. constante chamada texto igual [expressions]
8. constante valor igual [expressions]
9. nova variável chamada lista
10. crie variável a
11. constante chamada lista
12. constante texto

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