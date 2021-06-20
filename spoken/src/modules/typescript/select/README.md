## Select

Select a piece of the text in the current line

### Languages

This command is available in the following languages

**English**

The following automata is responsible for recognizing the command `Select` in english:

![English](phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Select`:

1. select letter M
2. select word temp
3. select fourth letter M
4. select 42ª word a
5. select from letter M to g
6. select from symbol g to last symbol K
7. select from fourth letter M to letter M
8. select from last letter g to first letter g
9. select from line 1 to line 42
10. select from line number 42 to line 42
11. select word [multi_word_token]
12. select first word [multi_word_token]

**Português**

O automata seguinte é reponsável por reconhecer o comando `Selecionar` em português:

![Português](phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Selecionar`:

1. selecionar símbolo A
2. selecionar palavra numero
3. selecione 42ª símbolo a
4. selecione sétimo palavra a
5. selecione de letra a até a
6. selecione de símbolo B até sétimo letra a
7. selecione de sétimo letra a até símbolo z
8. selecionar da 1ª letra z até sétimo símbolo B
9. selecionar da linha 42 até linha 42
10. selecionar de linha número 1 até 1
11. selecionar palavra [multi_word_token]
12. selecione 42ª palavra [multi_word_token]

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