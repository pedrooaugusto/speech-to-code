## Select

Select a piece of the text in the current line

### Languages

This command is available in the following languages

**English**

The following automata is responsible for recognizing the command `Select` in english:

![English](phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Select`:

1. select symbol K
2. select word temp
3. select from letter K to symbol K
4. select from symbol M to last letter g
5. select from first symbol g to g
6. select from 42ª letter M to last symbol g
7. select from line 1 to 1

**Português**

O automata seguinte é reponsável por reconhecer o comando `Selecionar` em português:

![Português](phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Selecionar`:

1. selecione símbolo A
2. selecione palavra lista
3. selecionar da símbolo A até símbolo z
4. selecione da letra B até 1ª letra z
5. selecionar da último letra B até a
6. selecione de 42ª símbolo z até primeiro z
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