## Calls a function

Calls a function with the specified arguments in the desired caller

### Languages

This command is available in the following languages

**English**

The following automata is responsible for recognizing the command `Calls a function` in english:

![English](phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Calls a function`:

1. execute function text
2. call function named value
3. execute function called [multi_word_token]
4. execute function graph 42 arguments
5. execute function called graph 1 arguments
6. call function called [multi_word_token] 42 arguments
7. execute function temp arguments [expressions]
8. call function named number arguments [expressions]
9. execute function named [multi_word_token] arguments [expressions]
10. execute function number 42 arguments on by [expressions]
11. call function value 42 arguments on [expressions]
12. execute function a arguments [expressions] called by [expressions]
13. call function temp arguments [expressions] on [expressions]
14. execute function number called by [expressions]
15. execute function value on [expressions]
16. call function named number 1 arguments called by [expressions]

**Português**

O automata seguinte é reponsável por reconhecer o comando `Chama uma função` em português:

![Português](phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Chama uma função`:

1. chamar função numero
2. chamar função nomeada a
3. execute função nomeada [multi_word_token]
4. chamar função a 42 argumentos
5. execute função nomeada texto 42 argumentos
6. chame função nomeada [multi_word_token] 1 argumentos
7. execute função temp argumentos [expressions]
8. chamar função chamada texto argumentos [expressions]
9. chamar função chamada [multi_word_token] argumentos [expressions]
10. execute função numero 1 argumentos no por [expressions]
11. chame função texto 42 argumentos chamada [expressions]
12. chamar função valor argumentos [expressions] no pela [expressions]
13. chamar função lista argumentos [expressions] na [expressions]
14. chamar função valor no por [expressions]
15. execute função lista na [expressions]
16. execute função chamada numero 1 argumentos no por [expressions]

### Implementation

The full implementation of this command can be found on this directory under the file [impl.ts](impl.ts)

```typescript
async function FunctionCall(command: FunctionCallParsedArgs, editor: Editor, context: Context) {
    console.log('[Spoken]: Executing: "FunctionCall"')

    const anything = context.templates['@anything'].examples[command?.extra?.lang as string]

    const functionName = join(command.functionNa

(...)
```