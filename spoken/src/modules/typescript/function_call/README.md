## Calls a function

Calls a function with the specified arguments in the desired caller

### Languages

This command is available in the following languages

#### English

The following automata is responsible for recognizing the command `Calls a function` in english:

![English](phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Calls a function`:

1. execute function [multi_word_token]
2. execute function text
3. call function [multi_word_token] [expressions]
4. execute function [multi_word_token] at [expressions]
5. execute function value [expressions]
6. execute function graph on [expressions]
7. execute function [multi_word_token] [expressions] arguments [expressions]
8. execute function [multi_word_token] arguments [expressions]
9. execute function [multi_word_token] on [expressions] arguments [expressions]
10. execute function a [expressions] arguments [expressions]
11. execute function text arguments [expressions]
12. execute function value of [expressions] arguments [expressions]
13. execute function [multi_word_token] [expressions] 1 arguments
14. execute function [multi_word_token] 1 arguments
15. execute function [multi_word_token] on [expressions] 42 arguments
16. execute function number [expressions] 42 arguments

#### Português

O automata seguinte é reponsável por reconhecer o comando `Chama uma função` em português:

![Português](phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Chama uma função`:

1. chame função [multi_word_token]
2. chamar função lista
3. chamar função [multi_word_token] [expressions]
4. execute função [multi_word_token] na [expressions]
5. execute função lista [expressions]
6. chamar função texto da [expressions]
7. chamar função [multi_word_token] [expressions] argumentos [expressions]
8. chame função [multi_word_token] argumentos [expressions]
9. execute função [multi_word_token] da [expressions] argumentos [expressions]
10. execute função temp [expressions] argumentos [expressions]
11. execute função numero argumentos [expressions]
12. chame função valor da [expressions] argumentos [expressions]
13. execute função [multi_word_token] [expressions] 42 argumentos
14. execute função [multi_word_token] 1 argumentos
15. chame função [multi_word_token] na [expressions] 42 argumentos
16. chame função numero [expressions] 42 argumentos

### Implementation

The full implementation of this command can be found on this directory under the file [impl.ts](impl.ts)

```typescript
async function FunctionCall(command: FunctionCallParsedArgs, editor: Editor, context: Context) {
    console.log('[Spoken]: Executing: "FunctionCall"')

    const anything = context.templates['@anything'].examples[command?.extra?.lang as string]

    const functionName = join(command.functionNa

(...)
```