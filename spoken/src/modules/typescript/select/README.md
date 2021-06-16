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
3. select 1ª symbol K
4. select 1ª word temp
5. select from letter K to K
6. select from letter g to first letter g
7. select from last letter M to symbol M
8. select from 42ª letter M to last symbol M
9. select from line 42 to line 42
10. select from line number 42 to 1
11. select word [multi_word_token]
12. select 1ª word [multi_word_token]

**Português**

O automata seguinte é reponsável por reconhecer o comando `Selecionar` em português:

![Português](phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Selecionar`:

1. selecionar símbolo A
2. selecionar palavra texto
3. selecione último letra A
4. selecione último palavra lista
5. selecione de símbolo A até z
6. selecionar da letra A até sétimo A
7. selecionar de 1ª letra a até letra z
8. selecione de primeiro letra A até último z
9. selecionar de linha 42 até linha 1
10. selecione da linha número 42 até linha 1
11. selecionar palavra [multi_word_token]
12. selecione último palavra [multi_word_token]

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