## Undo or redo the last operation/command

Undo or redo the last operation, used to correct mistakes. Just like CTRL + (Z | Y).

### Languages

This command is available in the following languages

#### English

The following automata is responsible for recognizing the command `Undo or redo the last operation/command` in english:

![English](phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Undo or redo the last operation/command`:

1. redo that
2. undo last command

#### Português

O automata seguinte é reponsável por reconhecer o comando `Refazer ou desfazer a última operação` em português:

![Português](phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Refazer ou desfazer a última operação`:

1. desfazer isso
2. refaça isso
3. refazer último operação
4. refaça último operação
5. desfazer isso também
6. refazer último operação também
7. desfaça isso também
8. desfaça último comando também

### Implementation

The full implementation of this command can be found on this directory under the file [impl.ts](impl.ts)

```typescript
import { Context } from '../../../modules-loader'
import { ParsedPhrase, Editor, WildCard } from '../../d'

async function undoRedo(command: RunParsedArgs, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "Undo/Redo."')

    const task = command.task

    if (task === 0)

(...)
```