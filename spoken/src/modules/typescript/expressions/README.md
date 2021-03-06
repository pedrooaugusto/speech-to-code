## Writes a expression

Writes a expression in the editor, this is meant to be used inside another automatas

### Languages

This command is available in the following languages

#### English

The following automata is responsible for recognizing the command `Writes a expression` in english:

![English](phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Writes a expression`:

1. [variable_reference]
2. gap

#### Português

O automata seguinte é reponsável por reconhecer o comando `Escreve uma expressão` em português:

![Português](phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Escreve uma expressão`:

1. [variable_reference]
2. gap

### Implementation

The full implementation of this command can be found on this directory under the file [impl.ts](impl.ts)

```typescript
async function Expression(command: ExpressionParsedArgs, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "Expression"')

    const { expression, parent, wildCard } = command

    if (parent) {
        return expression ? expression : { value: wildCard, isWildCard: true }


(...)
```