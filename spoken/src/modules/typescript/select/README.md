## Select

Select a piece of the text in the current line

### Languages

This command is available in the following languages

**English**

The following automata is responsible for recognizing the command `Select` in english:

![English](phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Select`:

1. select letter M
2. select word number
3. select from letter g to K
4. select from symbol K to 1ª letter M
5. select from last letter M to M
6. select from 42ª symbol K to 1ª M
7. select from line 1 to 42

**Português**

O automata seguinte é reponsável por reconhecer o comando `Selecionar` em português:

![Português](phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Selecionar`:

1. selecione letra a
2. selecione palavra valor
3. selecionar de letra A até símbolo a
4. selecione de letra A até sétimo letra B
5. selecionar da sétimo símbolo A até B
6. selecionar da primeiro símbolo A até último B
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