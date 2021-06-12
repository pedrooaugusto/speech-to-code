## Select

Select a piece of the text in the current line

### Languages

This command is available in the following languages

**English**

The following automata is responsible for recognizing the command `Select` in english:

![English](phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Select`:

1. select symbol g
2. select word value
3. select 42ª symbol K
4. select last word value
5. select from letter K to M
6. select from letter M to 42ª M
7. select from last symbol g to K
8. select from 42ª symbol K to 42ª letter g
9. select from line 42 to 1
10. select from line number 42 to 42
11. select word [multi_word_token]
12. select first word [multi_word_token]

**Português**

O automata seguinte é reponsável por reconhecer o comando `Selecionar` em português:

![Português](phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Selecionar`:

1. selecione símbolo a
2. selecione palavra texto
3. selecionar 42ª símbolo A
4. selecione último palavra temp
5. selecionar de símbolo B até A
6. selecionar da símbolo z até sétimo B
7. selecionar de último letra a até A
8. selecionar de último símbolo z até primeiro A
9. selecione da linha 42 até 1
10. selecionar de linha número 42 até 1
11. selecione palavra [multi_word_token]
12. selecione sétimo palavra [multi_word_token]

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