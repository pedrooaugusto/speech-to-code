## Calls a function

Calls a function with the specified arguments in the desired caller

### Languages

This command is available in the following languages

**English**

The following automata is responsible for recognizing the command `Calls a function` in english:

![English](phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Calls a function`:

1. call function a
2. call function called value
3. call function text 42 arguments
4. call function called temp 42 arguments
5. call function text arguments [expressions]
6. call function named number arguments [expressions]
7. call function graph 1 arguments on caller [expressions]
8. call function a arguments [expressions] on caller [expressions]
9. call function value on caller [expressions]
10. call function named temp 1 arguments on caller [expressions]
11. call function named temp arguments [expressions] on caller [expressions]
12. call function named a on caller [expressions]

**Português**

O automata seguinte é reponsável por reconhecer o comando `Chama uma função` em português:

![Português](phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Chama uma função`:

1. chame função a
2. chame função nomeada temp
3. chamar função lista 1 argumentos
4. chamar função nomeada numero 1 argumentos
5. chamar função a argumentos [expressions]
6. chame função nomeada valor argumentos [expressions]
7. chamar função lista 42 argumentos chamada por [expressions]
8. chamar função a 42 argumentos chamada [expressions]
9. chamar função lista argumentos [expressions] chamada pela [expressions]
10. chame função valor argumentos [expressions] chamada [expressions]
11. execute função valor chamada pela [expressions]
12. chamar função temp chamada [expressions]
13. execute função nomeada numero 1 argumentos chamada pela [expressions]
14. execute função nomeada temp 1 argumentos chamada [expressions]
15. execute função chamada a argumentos [expressions] chamada por [expressions]
16. execute função chamada numero argumentos [expressions] chamada [expressions]

### Implementation

The full implementation of this command can be found on this directory under the file [impl.ts](impl.ts)

```typescript
async function FunctionCall(command: FunctionCallParsedArgs, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "FunctionCall"')

    const text = '"' + command.string.join(' ') + '"'

    if (command.parent) return text

    return await editor.write(text)
}

type Functi

(...)
```