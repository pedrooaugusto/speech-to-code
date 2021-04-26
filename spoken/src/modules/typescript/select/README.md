## Select

Select a piece of the text in the current line

### Languages

This command is available in the following languages

**English**

The following automata is responsible for recognizing the command `Select` in english:

![English](phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Select`:

1. select letter g
2. select word value
3. select from symbol g to K
4. select from symbol M to 1ª letter M
5. select from first letter K to g
6. select from 42ª symbol M to fourth symbol K
7. select from line 1 to line 1

**Português**

O automata seguinte é reponsável por reconhecer o comando `Selecionar` em português:

![Português](phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Selecionar`:

1. selecionar letra z
2. selecionar palavra valor
3. selecione da símbolo A até símbolo B
4. selecione de letra z até último letra z
5. selecione de primeiro símbolo B até símbolo A
6. selecionar de 1ª símbolo a até 1ª letra A
7. selecione da linha 1 até linha 42

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