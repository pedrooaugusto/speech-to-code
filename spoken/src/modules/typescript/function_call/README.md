## Calls a function

Calls a function with the specified arguments in the desired caller

### Languages

This command is available in the following languages

#### English

The following automata is responsible for recognizing the command `Calls a function` in english:

![English](phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Calls a function`:

1. call function [multi_word_token]
2. call function [multi_word_token]
3. call function value
4. execute function [multi_word_token] [expressions]
5. execute function [multi_word_token] of [expressions]
6. execute function text [expressions]
7. call function number at [expressions]
8. call function [multi_word_token] [expressions] arguments [expressions]
9. call function [multi_word_token] arguments [expressions]
10. execute function [multi_word_token] on [expressions] arguments [expressions]
11. call function value [expressions] arguments [expressions]
12. call function graph arguments [expressions]
13. execute function graph on [expressions] arguments [expressions]
14. execute function [multi_word_token] [expressions] 42 arguments
15. call function [multi_word_token] 1 arguments
16. execute function [multi_word_token] on [expressions] 42 arguments

#### Português

O automata seguinte é reponsável por reconhecer o comando `Chama uma função` em português:

![Português](phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Chama uma função`:

1. chame função [multi_word_token]
2. execute função [multi_word_token]
3. chame função a
4. execute função [multi_word_token] [expressions]
5. chame função [multi_word_token] do [expressions]
6. chame função valor [expressions]
7. chame função a da [expressions]
8. chamar função [multi_word_token] [expressions] argumentos [expressions]
9. execute função [multi_word_token] argumentos [expressions]
10. execute função [multi_word_token] na [expressions] argumentos [expressions]
11. execute função lista [expressions] argumentos [expressions]
12. execute função numero argumentos [expressions]
13. chame função a na [expressions] argumentos [expressions]
14. execute função [multi_word_token] [expressions] 42 argumentos
15. execute função [multi_word_token] 1 argumentos
16. execute função [multi_word_token] no [expressions] 42 argumentos

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