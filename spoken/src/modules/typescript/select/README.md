## Select

Select a piece of the text in the current line

### Languages

This command is available in the following languages

#### English

The following automata is responsible for recognizing the command `Select` in english:

![English](phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Select`:

1. select symbol M
2. select word number
3. select 42ª symbol K
4. select fourth word value
5. select from symbol M to K
6. select from symbol M to fourth letter M
7. select from first symbol M to letter K
8. select from 42ª symbol g to last symbol g
9. select from line 42 to line 42
10. select from line number 42 to line 42
11. select word [multi_word_token]
12. select last word [multi_word_token]

#### Português

O automata seguinte é reponsável por reconhecer o comando `Selecionar` em português:

![Português](phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Selecionar`:

1. selecione letra A
2. selecione palavra texto
3. selecionar sétimo letra A
4. selecione 42ª palavra texto
5. selecione da símbolo A até letra z
6. selecionar de símbolo z até 42ª B
7. selecione de sétimo símbolo z até símbolo B
8. selecionar da 1ª letra B até primeiro símbolo B
9. selecione de linha 42 até linha 1
10. selecione da linha número 42 até 1
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