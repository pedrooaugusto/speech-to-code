## Select

Select a piece of the text in the current line

### Languages

This command is available in the following languages

**English**

The following automata is responsible for recognizing the command `Select` in english:

![English](phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Select`:

1. select letter g
2. select word number
3. select from letter M to symbol K
4. select from letter K to 1ª K
5. select from last letter M to symbol K
6. select from 42ª symbol M to 42ª letter g
7. select from line 1 to 1

**Português**

O automata seguinte é reponsável por reconhecer o comando `Selecionar` em português:

![Português](phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Selecionar`:

1. selecionar letra A
2. selecionar palavra valor
3. selecione da símbolo a até letra B
4. selecione de símbolo z até 1ª símbolo z
5. selecionar da 1ª letra A até letra B
6. selecionar de último símbolo A até último z
7. selecione de linha 1 até linha 42

### Implementation

The full implementation of this command can be found on this directory under the file [impl.ts](impl.ts)

```typescript
async function Select(command: SelectParsedArgs, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "select"')

    if (command.selectLine != undefined) {
        return await editor.select(
            parseInt(command.from, 10),
            parseInt(command.to, 10),
      

(...)
```