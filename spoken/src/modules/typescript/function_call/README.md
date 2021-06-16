## Calls a function

Calls a function with the specified arguments in the desired caller

### Languages

This command is available in the following languages

**English**

The following automata is responsible for recognizing the command `Calls a function` in english:

![English](phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Calls a function`:

1. call function [multi_word_token]
2. call function temp
3. execute function [multi_word_token] [expressions]
4. call function [multi_word_token] of [expressions]
5. call function graph [expressions]
6. execute function text of [expressions]
7. call function [multi_word_token] [expressions] arguments [expressions]
8. call function [multi_word_token] arguments [expressions]
9. execute function [multi_word_token] at [expressions] arguments [expressions]
10. execute function a [expressions] arguments [expressions]
11. call function temp arguments [expressions]
12. execute function graph of [expressions] arguments [expressions]
13. call function [multi_word_token] [expressions] 42 arguments
14. call function [multi_word_token] 42 arguments
15. execute function [multi_word_token] at [expressions] 1 arguments
16. call function number [expressions] 42 arguments

**Português**

O automata seguinte é reponsável por reconhecer o comando `Chama uma função` em português:

![Português](phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Chama uma função`:

1. chamar função [multi_word_token]
2. chamar função temp
3. execute função [multi_word_token] [expressions]
4. chamar função [multi_word_token] da [expressions]
5. chame função valor [expressions]
6. chame função a na [expressions]
7. chame função [multi_word_token] [expressions] argumentos [expressions]
8. execute função [multi_word_token] argumentos [expressions]
9. execute função [multi_word_token] da [expressions] argumentos [expressions]
10. chame função temp [expressions] argumentos [expressions]
11. chamar função texto argumentos [expressions]
12. execute função a na [expressions] argumentos [expressions]
13. chamar função [multi_word_token] [expressions] 1 argumentos
14. chame função [multi_word_token] 42 argumentos
15. chamar função [multi_word_token] na [expressions] 42 argumentos
16. chame função texto [expressions] 1 argumentos

### Implementation

The full implementation of this command can be found on this directory under the file [impl.ts](impl.ts)

```typescript
async function FunctionCall(command: FunctionCallParsedArgs, editor: Editor, context: Context) {
    console.log('[Spoken]: Executing: "FunctionCall"')

    const anything = context.templates['@anything'].examples[command?.extra?.lang as string]

    const functionName = join(command.functionNa

(...)
```