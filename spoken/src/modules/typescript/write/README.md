## Write text

Write some text in the editor

### Languages

This command is available in the following languages

#### English

The following automata is responsible for recognizing the command `Write text` in english:

![English](phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Write text`:

1. print
2. write down
3. write it
4. print space
5. write down space
6. write it space
7. print who are you the universe is cracked
8. write who are you who are you
9. write it the universe is cracked the universe is cracked
10. print letter M
11. write letter g
12. write it down letter M
13. print dot
14. write down dot
15. write it dot

#### Português

O automata seguinte é reponsável por reconhecer o comando `Escrever texto` em português:

![Português](phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Escrever texto`:

1. escreva
2. escreva espaço
3. escreva isto é um teste quem é você
4. escreva a letra A
5. escreva ponto

### Implementation

The full implementation of this command can be found on this directory under the file [impl.ts](impl.ts)

```typescript
import { Context } from '../../../modules-loader'
import { ParsedPhrase, Editor } from '../../d'

async function write(command: WriteParsedArgs, editor: Editor, context: Context) {
    console.log('[Spoken]: Executing: "write."')

    let text = null

    if (command.isSpace) text = ' '
   

(...)
```