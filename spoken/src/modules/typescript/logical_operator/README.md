## Writes a logical operator

Writes a logical operator (===, !==, &&, ||, >, <, >=, <=) meant to be used inside expressions

### Languages

This command is available in the following languages

**English**

The following automata is responsible for recognizing the command `Writes a logical operator` in english:

![English](phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Writes a logical operator`:

1. or
2. not and
3. not less or equals than
4. not greater than
5. greater equals than
6. less than

**Português**

O automata seguinte é reponsável por reconhecer o comando `Escreve um operador lógico` em português:

![Português](phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Escreve um operador lógico`:

1. ou
2. negativo igual
3. negativo menor ou igual
4. maior ou igual
5. negativo maior ou igual a
6. não menor que
7. maior ou igual a
8. menor que

### Implementation

The full implementation of this command can be found on this directory under the file [impl.ts](impl.ts)

```typescript
async function LogicalOperator(command: LogicalOperatorParsedArgs, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "LogicalOperator"')

    const { logicalOperator, isNegative = false, inequalityOperator, orEqual = false } = command

    if (logicalOperator !== undefined) {

(...)
```