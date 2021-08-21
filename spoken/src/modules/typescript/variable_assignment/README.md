## Stores a value in a variable

Stores a number, string etc in a variable

### Languages

This command is available in the following languages

#### English

The following automata is responsible for recognizing the command `Stores a value in a variable` in english:

![English](phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Stores a value in a variable`:

1. declare constant named [multi_word_token]
2. variable named [multi_word_token]
3. new variable called [multi_word_token] equals [expressions]
4. new constant named graph equals [expressions]
5. create variable temp equals [expressions]
6. constant called [multi_word_token] equals [expressions]
7. variable called a equals [expressions]
8. constant temp equals [expressions]
9. create variable named temp
10. declare variable text
11. constant called value
12. variable value

#### Português

O automata seguinte é reponsável por reconhecer o comando `Guarda um valor em uma variável` em português:

![Português](phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Guarda um valor em uma variável`:

1. declare variável chamada [multi_word_token]
2. variável chamada [multi_word_token]
3. declare constante chamada [multi_word_token] igual [expressions]
4. nova variável chamada temp igual [expressions]
5. crie constante a igual [expressions]
6. variável chamada [multi_word_token] igual [expressions]
7. constante chamada numero igual [expressions]
8. constante a igual [expressions]
9. nova variável chamada texto
10. declare constante numero
11. variável chamada valor
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