## Select

Select a piece of the text in the current line

### Languages

This command is available in the following languages

####English

The following automata is responsible for recognizing the command `Select` in english:

![English](phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Select`:

1. select symbol K
2. select word text
3. select first letter M
4. select first word temp
5. select from letter K to K
6. select from letter g to fourth letter M
7. select from first letter M to letter M
8. select from 42ª symbol K to fourth symbol g
9. select from line 1 to 1
10. select from line number 1 to 42
11. select word [multi_word_token]
12. select fourth word [multi_word_token]

####Português

O automata seguinte é reponsável por reconhecer o comando `Selecionar` em português:

![Português](phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Selecionar`:

1. selecione símbolo B
2. selecione palavra numero
3. selecione sétimo letra a
4. selecione 1ª palavra numero
5. selecione da símbolo a até a
6. selecionar de símbolo z até sétimo letra B
7. selecione da sétimo letra B até letra z
8. selecione de 1ª símbolo B até 42ª z
9. selecionar da linha 42 até 1
10. selecione de linha número 1 até 1
11. selecionar palavra [multi_word_token]
12. selecionar 42ª palavra [multi_word_token]

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