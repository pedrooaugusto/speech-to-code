## Select

Select a piece of the text in the current line

### Languages

This command is available in the following languages

#### English

The following automata is responsible for recognizing the command `Select` in english:

![English](phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Select`:

1. select letter K
2. select word value
3. select fourth symbol M
4. select 42ª word value
5. select from letter M to symbol M
6. select from symbol K to first g
7. select from 42ª letter g to letter g
8. select from 1ª letter M to 1ª K
9. select from line 1 to line 1
10. select from line number 42 to 42
11. select word [multi_word_token]
12. select first word [multi_word_token]

#### Português

O automata seguinte é reponsável por reconhecer o comando `Selecionar` em português:

![Português](phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Selecionar`:

1. selecionar símbolo z
2. selecione palavra a
3. selecione 1ª símbolo z
4. selecionar último palavra lista
5. selecionar de símbolo a até símbolo A
6. selecione de letra A até 42ª letra a
7. selecionar de sétimo letra B até símbolo z
8. selecionar da primeiro letra B até 42ª letra A
9. selecionar da linha 42 até 42
10. selecionar da linha número 1 até 1
11. selecione palavra [multi_word_token]
12. selecionar primeiro palavra [multi_word_token]

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