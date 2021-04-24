## Stores a value in a variable

Stores a number, string etc in a variable

### Languages

This command is available in the following languages

**English**

The following automata is responsible for recognizing the command `Stores a value in a variable` in english:

![English](phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Stores a value in a variable`:

1. put value [expressions] variable graph
2. put value [expressions] variable called [multi_word_token]
3. put result [expressions] new variable a
4. put result [expressions] new constant called [multi_word_token]
5. value [expressions] constant graph
6. value [expressions] variable called [multi_word_token]
7. result [expressions] new constant a
8. result [expressions] new constant called [multi_word_token]

**Português**

O automata seguinte é reponsável por reconhecer o comando `Guarda um valor em uma variável` em português:

![Português](phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Guarda um valor em uma variável`:

1. ponha valor [expressions] variável temp
2. guarde resultado [expressions] variável chamada [multi_word_token]
3. ponha valor [expressions] nova variável a
4. guarde valor [expressions] nova constante chamada [multi_word_token]
5. resultado [expressions] variável lista
6. valor [expressions] constante chamada [multi_word_token]
7. resultado [expressions] nova constante lista
8. resultado [expressions] nova constante chamada [multi_word_token]

### Implementation

The full implementation of this command can be found on this directory under the file [impl.ts](impl.ts)

```typescript
async function NewVariable(command: NewVariableParsedArgs, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "NewVariable"')

    let { isNew, varName, expression } = command

    if (Array.isArray(varName)) {
        varName = varName.map((item, index) => {
            ret

(...)
```