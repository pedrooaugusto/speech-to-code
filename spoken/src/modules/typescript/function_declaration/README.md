## Creates a function

Creates a function with the desired number of args and return value

### Languages

This command is available in the following languages

####English

The following automata is responsible for recognizing the command `Creates a function` in english:

![English](phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Creates a function`:

1. declare function text
2. create function temp 1 arguments
3. declare function graph 42 arguments return [expressions]
4. new function temp returning [expressions]

####Português

O automata seguinte é reponsável por reconhecer o comando `Cria uma função` em português:

![Português](phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Cria uma função`:

1. nova função valor
2. declare função valor 42 argumentos
3. declare função texto 1 argumentos retornando [expressions]
4. declare função numero retorna [expressions]

### Implementation

The full implementation of this command can be found on this directory under the file [impl.ts](impl.ts)

```typescript
async function FunctionDeclaration(command: FunctionDeclarationParsedArgs, editor: Editor, context: Context) {
    console.log('[Spoken]: Executing: "FunctionDeclaration"')

    const anything = context.templates['@anything'].examples[command?.extra?.lang as string]

    let { fnName, argsNumbe

(...)
```