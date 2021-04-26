## References a variable

Writes a variable or constant in the editor

### Languages

This command is available in the following languages

**English**

The following automata is responsible for recognizing the command `References a variable` in english:

![English](phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `References a variable`:

1. reference constant value
2. variable a
3. reference constant called [multi_word_token]
4. constant called [multi_word_token]

**Português**

O automata seguinte é reponsável por reconhecer o comando `Referencia a uma variável` em português:

![Português](phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Referencia a uma variável`:

1. refira constante numero
2. constante lista
3. refira variável chamada [multi_word_token]
4. constante chamada [multi_word_token]

### Implementation

The full implementation of this command can be found on this directory under the file [impl.ts](impl.ts)

```typescript
async function VariableReference(command: VariableReferenceParsedArgs, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "VariableReference"')

    let { varName, parent } = command

    if (Array.isArray(varName)) {
        varName = varName.map((item, index) => {
        

(...)
```