## Select

Select a piece of the text in the current line

### Languages

This command is available in the following languages

**English**

The following automata is responsible for recognizing the command `Select` in english:

![English](phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Select`:

1. select symbol M
2. select word temp
3. select from symbol g to K
4. select from symbol g to fourth symbol g
5. select from last symbol K to M
6. select from last letter K to last g
7. select from line 42 to line 42

**Português**

O automata seguinte é reponsável por reconhecer o comando `Selecionar` em português:

![Português](phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Selecionar`:

1. selecione símbolo a
2. selecionar palavra texto
3. selecione de símbolo a até B
4. selecionar de letra a até 42ª letra a
5. selecionar de primeiro letra B até símbolo z
6. selecione de sétimo símbolo A até 42ª símbolo a
7. selecionar de linha 1 até 42

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