## Select

Select a piece of the text in the current line

### Languages

This command is available in the following languages

**English**

The following automata is responsible for recognizing the command `Select` in english:

![English](phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Select`:

1. select letter K
2. select word temp
3. select fourth letter K
4. select fourth word graph
5. select from symbol g to symbol g
6. select from symbol g to 42ª letter g
7. select from 42ª letter K to M
8. select from 1ª symbol g to fourth symbol M
9. select from line 42 to line 42
10. select from line number 1 to line 1
11. select word [multi_word_token]
12. select last word [multi_word_token]

**Português**

O automata seguinte é reponsável por reconhecer o comando `Selecionar` em português:

![Português](phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Selecionar`:

1. selecione símbolo a
2. selecionar palavra a
3. selecionar último letra B
4. selecionar primeiro palavra lista
5. selecione da letra B até letra a
6. selecionar da símbolo B até 42ª letra z
7. selecionar de último letra B até letra A
8. selecione de 1ª letra a até 42ª símbolo z
9. selecione de linha 42 até 1
10. selecionar da linha número 42 até linha 1
11. selecionar palavra [multi_word_token]
12. selecione primeiro palavra [multi_word_token]

### Implementation

The full implementation of this command can be found on this directory under the file [impl.ts](impl.ts)

```typescript
async function Select(command: SelectParsedArgs, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "select"')

    command.word = Array.isArray(command.word) ? command.word.join('') : command.word

    if (command.selectLine != undefined) {
        return await editor.select

(...)
```