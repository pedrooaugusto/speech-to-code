## Calls a function

Calls a function with the specified arguments in the desired caller

### Languages

This command is available in the following languages

####English

The following automata is responsible for recognizing the command `Calls a function` in english:

![English](phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Calls a function`:

1. call function [multi_word_token]
2. call function graph
3. call function [multi_word_token] [expressions]
4. call function [multi_word_token] of [expressions]
5. execute function text [expressions]
6. call function number on [expressions]
7. execute function [multi_word_token] [expressions] arguments [expressions]
8. call function [multi_word_token] arguments [expressions]
9. call function [multi_word_token] on [expressions] arguments [expressions]
10. call function graph [expressions] arguments [expressions]
11. call function temp arguments [expressions]
12. call function value of [expressions] arguments [expressions]
13. call function [multi_word_token] [expressions] 1 arguments
14. call function [multi_word_token] 42 arguments
15. execute function [multi_word_token] at [expressions] 1 arguments
16. execute function number [expressions] 1 arguments

####Português

O automata seguinte é reponsável por reconhecer o comando `Chama uma função` em português:

![Português](phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Chama uma função`:

1. chame função [multi_word_token]
2. chamar função texto
3. chame função [multi_word_token] [expressions]
4. chamar função [multi_word_token] na [expressions]
5. chamar função texto [expressions]
6. chame função temp da [expressions]
7. chamar função [multi_word_token] [expressions] argumentos [expressions]
8. chamar função [multi_word_token] argumentos [expressions]
9. chamar função [multi_word_token] da [expressions] argumentos [expressions]
10. chamar função lista [expressions] argumentos [expressions]
11. chame função a argumentos [expressions]
12. chame função numero na [expressions] argumentos [expressions]
13. chamar função [multi_word_token] [expressions] 1 argumentos
14. execute função [multi_word_token] 42 argumentos
15. chamar função [multi_word_token] na [expressions] 1 argumentos
16. chamar função lista [expressions] 42 argumentos

### Implementation

The full implementation of this command can be found on this directory under the file [impl.ts](impl.ts)

```typescript
async function FunctionCall(command: FunctionCallParsedArgs, editor: Editor, context: Context) {
    console.log('[Spoken]: Executing: "FunctionCall"')

    const anything = context.templates['@anything'].examples[command?.extra?.lang as string]

    const functionName = join(command.functionNa

(...)
```