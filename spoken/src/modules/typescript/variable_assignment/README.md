## Stores a value in a variable

Stores a number, string etc in a variable

### Languages

This command is available in the following languages

#### English

The following automata is responsible for recognizing the command `Stores a value in a variable` in english:

![English](phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Stores a value in a variable`:

1. new constant named [multi_word_token]
2. variable named [multi_word_token]
3. new constant called [multi_word_token] = [expressions]
4. new variable named temp = [expressions]
5. new variable graph = [expressions]
6. constant called [multi_word_token] = [expressions]
7. variable called value = [expressions]
8. constant value equals [expressions]
9. new variable named a
10. create variable value
11. variable named a
12. variable number

#### Português

O automata seguinte é reponsável por reconhecer o comando `Guarda um valor em uma variável` em português:

![Português](phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Guarda um valor em uma variável`:

1. declare variável chamada [multi_word_token]
2. variável chamada [multi_word_token]
3. crie constante chamada [multi_word_token] igual [expressions]
4. crie constante chamada lista = [expressions]
5. nova constante a = [expressions]
6. variável chamada [multi_word_token] = [expressions]
7. variável chamada valor = [expressions]
8. constante a = [expressions]
9. nova variável chamada valor
10. nova constante a
11. variável chamada a
12. variável texto

### Implementation

The full implementation of this command can be found on this directory under the file [impl.ts](impl.ts)

```typescript
import { Context } from '../../../modules-loader'
import { ParsedPhrase, Editor, WildCard } from '../../d'

async function NewVariable(command: NewVariableParsedArgs, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "NewVariable"')

    let { isNew, varName, expression, mem

(...)
```