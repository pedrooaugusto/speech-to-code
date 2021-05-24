## Select

Select a piece of the text in the current line

### Languages

This command is available in the following languages

**English**

The following automata is responsible for recognizing the command `Select` in english:

![English](phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Select`:

1. select letter g
2. select word a
3. select from letter M to M
4. select from symbol g to fourth M
5. select from 1ª letter K to letter K
6. select from 1ª symbol M to 42ª letter K
7. select from line 42 to line 42

**Português**

O automata seguinte é reponsável por reconhecer o comando `Selecionar` em português:

![Português](phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Selecionar`:

1. selecionar letra z
2. selecionar palavra temp
3. selecione de letra B até símbolo z
4. selecionar da letra z até 42ª símbolo a
5. selecione de 1ª símbolo B até símbolo A
6. selecione da 42ª letra z até sétimo símbolo z
7. selecione de linha 42 até 1

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