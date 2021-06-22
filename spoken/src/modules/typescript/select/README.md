## Select

Select a piece of the text in the current line

### Languages

This command is available in the following languages

#### English

The following automata is responsible for recognizing the command `Select` in english:

![English](phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Select`:

1. select symbol K
2. select word graph
3. select last letter K
4. select first word graph
5. select from symbol K to letter M
6. select from symbol g to 42ª M
7. select from first symbol K to symbol g
8. select from last letter K to 1ª letter g
9. select from line 42 to line 1
10. select from line number 42 to 1
11. select word [multi_word_token]
12. select first word [multi_word_token]

#### Português

O automata seguinte é reponsável por reconhecer o comando `Selecionar` em português:

![Português](phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Selecionar`:

1. selecione símbolo a
2. selecione palavra a
3. selecionar 1ª símbolo z
4. selecione 42ª palavra texto
5. selecione de símbolo z até letra a
6. selecione de símbolo a até último letra z
7. selecione de 1ª letra z até A
8. selecione da primeiro letra A até primeiro símbolo B
9. selecionar da linha 42 até 1
10. selecione de linha número 42 até linha 42
11. selecionar palavra [multi_word_token]
12. selecionar primeiro palavra [multi_word_token]

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