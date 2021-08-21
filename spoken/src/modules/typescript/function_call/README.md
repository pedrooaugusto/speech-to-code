## Calls a function

Calls a function with the specified arguments in the desired caller

### Languages

This command is available in the following languages

#### English

The following automata is responsible for recognizing the command `Calls a function` in english:

![English](phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Calls a function`:

1. call function [multi_word_token]
2. execute function graph
3. call function [multi_word_token] [expressions]
4. execute function [multi_word_token] of [expressions]
5. execute function value [expressions]
6. execute function value on [expressions]
7. execute function [multi_word_token] [expressions] arguments [expressions]
8. execute function [multi_word_token] arguments [expressions]
9. call function [multi_word_token] at [expressions] arguments [expressions]
10. execute function graph [expressions] arguments [expressions]
11. execute function number arguments [expressions]
12. call function graph of [expressions] arguments [expressions]
13. execute function [multi_word_token] [expressions] 1 arguments
14. call function [multi_word_token] 42 arguments
15. execute function [multi_word_token] at [expressions] 1 arguments
16. execute function value [expressions] 1 arguments

#### Português

O automata seguinte é reponsável por reconhecer o comando `Chama uma função` em português:

![Português](phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Chama uma função`:

1. execute função [multi_word_token]
2. execute função valor
3. chame função [multi_word_token] [expressions]
4. chame função [multi_word_token] da [expressions]
5. chame função temp [expressions]
6. chame função numero na [expressions]
7. execute função [multi_word_token] [expressions] argumentos [expressions]
8. execute função [multi_word_token] argumentos [expressions]
9. chame função [multi_word_token] na [expressions] argumentos [expressions]
10. execute função numero [expressions] argumentos [expressions]
11. chamar função valor argumentos [expressions]
12. chame função a da [expressions] argumentos [expressions]
13. chame função [multi_word_token] [expressions] 1 argumentos
14. chame função [multi_word_token] 42 argumentos
15. chame função [multi_word_token] na [expressions] 1 argumentos
16. chamar função lista [expressions] 42 argumentos

### Implementation

The full implementation of this command can be found on this directory under the file [impl.ts](impl.ts)

```typescript
import { Context } from '../../../modules-loader'
import { ParsedPhrase, Editor, WildCard } from '../../d'

async function FunctionCall(command: FunctionCallParsedArgs, editor: Editor, context: Context) {
    console.log('[Spoken]: Executing: "FunctionCall"')

    const anything = context.temp

(...)
```