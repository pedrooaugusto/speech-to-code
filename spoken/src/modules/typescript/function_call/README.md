## Calls a function

Calls a function with the specified arguments in the desired caller

### Languages

This command is available in the following languages

**English**

The following automata is responsible for recognizing the command `Calls a function` in english:

![English](phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Calls a function`:

1. execute function [multi_word_token]
2. execute function temp
3. call function [multi_word_token] [expressions]
4. call function [multi_word_token] on [expressions]
5. execute function temp [expressions]
6. call function a on [expressions]
7. execute function [multi_word_token] [expressions] arguments [expressions]
8. execute function [multi_word_token] arguments [expressions]
9. execute function [multi_word_token] of [expressions] arguments [expressions]
10. call function graph [expressions] arguments [expressions]
11. execute function graph arguments [expressions]
12. execute function value on [expressions] arguments [expressions]
13. call function [multi_word_token] [expressions] 1 arguments
14. call function [multi_word_token] 42 arguments
15. call function [multi_word_token] of [expressions] 42 arguments
16. execute function graph [expressions] 1 arguments

**Português**

O automata seguinte é reponsável por reconhecer o comando `Chama uma função` em português:

![Português](phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Chama uma função`:

1. execute função [multi_word_token]
2. chamar função temp
3. chamar função [multi_word_token] [expressions]
4. execute função [multi_word_token] na [expressions]
5. execute função lista [expressions]
6. chamar função numero na [expressions]
7. chamar função [multi_word_token] [expressions] argumentos [expressions]
8. chamar função [multi_word_token] argumentos [expressions]
9. execute função [multi_word_token] da [expressions] argumentos [expressions]
10. execute função lista [expressions] argumentos [expressions]
11. chame função valor argumentos [expressions]
12. chamar função temp na [expressions] argumentos [expressions]
13. chamar função [multi_word_token] [expressions] 42 argumentos
14. chamar função [multi_word_token] 42 argumentos
15. chame função [multi_word_token] da [expressions] 1 argumentos
16. chamar função lista [expressions] 1 argumentos

### Implementation

The full implementation of this command can be found on this directory under the file [impl.ts](impl.ts)

```typescript
async function FunctionCall(command: FunctionCallParsedArgs, editor: Editor, context: Context) {
    console.log('[Spoken]: Executing: "FunctionCall"')

    const anything = context.templates['@anything'].examples[command?.extra?.lang as string]

    const functionName = join(command.functionNa

(...)
```