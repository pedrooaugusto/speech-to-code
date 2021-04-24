## Select

Select a piece of the text in the current line

### Languages

This command is available in the following languages

**English**

The following automata is responsible for recognizing the command `Select` in english:

![English](phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Select`:

1. select symbol g
2. select word number
3. select from symbol M to symbol g
4. select from letter g to fourth K
5. select from 1ª letter g to M
6. select from 1ª symbol g to 1ª letter M
7. select from line 42 to 42

**Português**

O automata seguinte é reponsável por reconhecer o comando `Selecionar` em português:

![Português](phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Selecionar`:

1. selecione símbolo A
2. selecionar palavra temp
3. selecionar da letra a até símbolo a
4. selecionar de símbolo A até 1ª z
5. selecionar de 42ª letra a até A
6. selecionar da primeiro letra A até 42ª A
7. selecionar de linha 1 até linha 42

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