## Select

Select a piece of the text in the current line

### Languages

This command is available in the following languages

#### English

The following automata is responsible for recognizing the command `Select` in english:

![English](phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Select`:

1. select letter M
2. select word graph
3. select first symbol g
4. select fourth word value
5. select from letter M to K
6. select from symbol M to last symbol g
7. select from first letter g to letter K
8. select from fourth symbol g to first symbol g
9. select from line 42 to line 1
10. select from line number 42 to 42
11. select word [multi_word_token]
12. select fourth word [multi_word_token]

#### Português

O automata seguinte é reponsável por reconhecer o comando `Selecionar` em português:

![Português](phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Selecionar`:

1. selecione símbolo a
2. selecione palavra lista
3. selecionar 1ª símbolo z
4. selecione sétimo palavra valor
5. selecione de letra B até letra z
6. selecione da letra B até 42ª símbolo B
7. selecionar de último símbolo A até símbolo B
8. selecione da primeiro símbolo A até 1ª letra z
9. selecione da linha 1 até 42
10. selecione de linha número 42 até linha 42
11. selecionar palavra [multi_word_token]
12. selecione 1ª palavra [multi_word_token]

### Implementation

The full implementation of this command can be found on this directory under the file [impl.ts](impl.ts)

```typescript
import { Context } from '../../../modules-loader'
import { ParsedPhrase, Editor, WildCard } from '../../d'

async function Select(command: SelectParsedArgs, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "select"')

    command.word = Array.isArray(command.word) ? command

(...)
```