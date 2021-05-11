# Typescript voice commands

Collection of voice commands of the typescript language

![typescript](typescript.png)

---

## Move cursor

Moves the cursor to a different line or token

### Languages

This command is available in the following languages

**English**

The following automata is responsible for recognizing the command `Move cursor` in english:

![English](cursor/phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Move cursor`:

1. cursor line 42
2. cursor symbol g
3. cursor last symbol M
4. pointer begin line
5. cursor next symbol
6. cursor next 42 symbol

**Português**

O automata seguinte é reponsável por reconhecer o comando `Mover o cursor` em português:

![Português](cursor/phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Mover o cursor`:

1. ponteiro linha 1
2. cursor letra a
3. ponteiro último símbolo B
4. cursor começo linha
5. ponteiro próximo símbolo
6. ponteiro próximo 42 letra

### Implementation

The full implementation of this command can be found on this directory under the file [impl.ts](impl.ts)

```typescript
async function cursor(args: CursorParsedArgs, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "cursor."')

    if (args.linePosition != null) {
        const pos = args.linePosition === LinePostionEnum.BEGIN ? 'BEGIN_LINE' : 'END_LINE'

        return await editor.moveCurs

(...)
```

---

## Writes a elementar math operation

Writes a elementar math operation (*, -, +, /)

### Languages

This command is available in the following languages

**English**

The following automata is responsible for recognizing the command `Writes a elementar math operation` in english:

![English](elementar_math_op/phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Writes a elementar math operation`:

1. expression [expressions] minus [expressions]

**Português**

O automata seguinte é reponsável por reconhecer o comando `Escreve uma operação matemática elementar` em português:

![Português](elementar_math_op/phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Escreve uma operação matemática elementar`:

1. expressão [expressions] vezes [expressions]

### Implementation

The full implementation of this command can be found on this directory under the file [impl.ts](impl.ts)

```typescript
async function WriteElementarMathOperation(command: WriteElementarMathOperationParsedArgs, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "WriteElementarMathOperation"')

    let operation = toArray(command.operation) as string[]
    let right = toArray(command.right) as (s

(...)
```

---

## Writes a expression

Writes a expression in the editor, this is meant to be used inside another automatas

### Languages

This command is available in the following languages

**English**

The following automata is responsible for recognizing the command `Writes a expression` in english:

![English](expressions/phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Writes a expression`:

1. [number]
2. anything

**Português**

O automata seguinte é reponsável por reconhecer o comando `Escreve uma expressão` em português:

![Português](expressions/phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Escreve uma expressão`:

1. [variable_reference]
2. tudo

### Implementation

The full implementation of this command can be found on this directory under the file [impl.ts](impl.ts)

```typescript
async function Expression(command: ExpressionParsedArgs, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "Expression"')

    const { expression, parent, wildCard } = command

    if (parent) {
        return expression ? expression : { value: wildCard, isWildCard: true }


(...)
```

---

## Calls a function

Calls a function with the specified arguments in the desired caller

### Languages

This command is available in the following languages

**English**

The following automata is responsible for recognizing the command `Calls a function` in english:

![English](function_call/phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Calls a function`:

1. call function a
2. call function called value
3. call function text 42 arguments
4. call function called temp 42 arguments
5. call function text arguments [expressions]
6. call function named number arguments [expressions]
7. call function graph 1 arguments on caller [expressions]
8. call function a arguments [expressions] on caller [expressions]
9. call function value on caller [expressions]
10. call function named temp 1 arguments on caller [expressions]
11. call function named temp arguments [expressions] on caller [expressions]
12. call function named a on caller [expressions]

**Português**

O automata seguinte é reponsável por reconhecer o comando `Chama uma função` em português:

![Português](function_call/phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Chama uma função`:

1. chame função a
2. chame função nomeada temp
3. chamar função lista 1 argumentos
4. chamar função nomeada numero 1 argumentos
5. chamar função a argumentos [expressions]
6. chame função nomeada valor argumentos [expressions]
7. chamar função lista 42 argumentos chamada por [expressions]
8. chamar função a 42 argumentos chamada [expressions]
9. chamar função lista argumentos [expressions] chamada pela [expressions]
10. chame função valor argumentos [expressions] chamada [expressions]
11. execute função valor chamada pela [expressions]
12. chamar função temp chamada [expressions]
13. execute função nomeada numero 1 argumentos chamada pela [expressions]
14. execute função nomeada temp 1 argumentos chamada [expressions]
15. execute função chamada a argumentos [expressions] chamada por [expressions]
16. execute função chamada numero argumentos [expressions] chamada [expressions]

### Implementation

The full implementation of this command can be found on this directory under the file [impl.ts](impl.ts)

```typescript
async function FunctionCall(command: FunctionCallParsedArgs, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "FunctionCall"')

    const text = '"' + command.string.join(' ') + '"'

    if (command.parent) return text

    return await editor.write(text)
}

type Functi

(...)
```

---

## Change line

Moves the cursor to a different line

### Languages

This command is available in the following languages

**English**

The following automata is responsible for recognizing the command `Change line` in english:

![English](go_to_line/phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Change line`:

1. go to line 42
2. go to line number 42
3. go line 42
4. go line number 1
5. line 1
6. line number 1

**Português**

O automata seguinte é reponsável por reconhecer o comando `Trocar linha` em português:

![Português](go_to_line/phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Trocar linha`:

1. vá para linha 42
2. vá para linha número 42
3. vai para a linha 42
4. vai para a linha número 42
5. vai linha 1
6. vá linha número 1
7. linha 42
8. linha número 1

### Implementation

The full implementation of this command can be found on this directory under the file [impl.ts](impl.ts)

```typescript
async function goToLine(command: GoToLineParsedArgs, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "goToLine."')

    return await editor.goToLine(command.line as string)
}

type GoToLineParsedArgs = {
    line: number | string
} & ParsedPhrase

// @ts-ignore
return

(...)
```

---

## Group multiple words together

Group multiple words together in one variable meant to be used as alias in other commands

### Languages

This command is available in the following languages

**English**

The following automata is responsible for recognizing the command `Group multiple words together` in english:

![English](multi_word_token/phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Group multiple words together`:

1. * *

**Português**

O automata seguinte é reponsável por reconhecer o comando `Agrupa múltiplas palavras` em português:

![Português](multi_word_token/phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Agrupa múltiplas palavras`:

1. * *

### Implementation

The full implementation of this command can be found on this directory under the file [impl.ts](impl.ts)

```typescript
async function MultiWordTokens(command: MultiWordTokensParsedArgs, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "MultiWordTokens"')

    function camelCase(words: string[]) {
        return words.map((a, i) => i ? a.charAt(0).toUpperCase() + a.slice(1) : a)
    }

    

(...)
```

---

## New line

Creates a new line above or below the current line

### Languages

This command is available in the following languages

**English**

The following automata is responsible for recognizing the command `New line` in english:

![English](new_line/phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `New line`:

1. new line
2. create new line
3. create line
4. new line below
5. line above
6. create new line above
7. create line below

**Português**

O automata seguinte é reponsável por reconhecer o comando `Linha nova` em português:

![Português](new_line/phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Linha nova`:

1. nova linha
2. linha nova
3. crie nova linha
4. crie linha
5. nova linha abaixo
6. linha nova abaixo
7. linha abaixo
8. crie nova linha abaixo
9. crie linha abaixo

### Implementation

The full implementation of this command can be found on this directory under the file [impl.ts](impl.ts)

```typescript
async function newLine(command: NewLineParsedArgs, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "new line."')

    return await editor.newLine(command.position)
}

type NewLineParsedArgs = {
    position: PositionEnum
} & ParsedPhrase

// @ts-ignore
return newLine

(...)
```

---

## Writes a number

Writes a number in the editor

### Languages

This command is available in the following languages

**English**

The following automata is responsible for recognizing the command `Writes a number` in english:

![English](number/phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Writes a number`:

1. number 1

**Português**

O automata seguinte é reponsável por reconhecer o comando `Escreve um número` em português:

![Português](number/phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Escreve um número`:

1. número 42

### Implementation

The full implementation of this command can be found on this directory under the file [impl.ts](impl.ts)

```typescript
async function WriteNumber(command: WriteNumberParsedArgs, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "WriteNumber"')

    const { number, parent } = command

    if (parent) return number

    return await editor.write(number)
}

type WriteNumberParsedArgs = {
 

(...)
```

---

## Select

Select a piece of the text in the current line

### Languages

This command is available in the following languages

**English**

The following automata is responsible for recognizing the command `Select` in english:

![English](select/phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Select`:

1. select letter g
2. select word number
3. select from letter M to symbol K
4. select from letter K to 1ª K
5. select from last letter M to symbol K
6. select from 42ª symbol M to 42ª letter g
7. select from line 1 to 1

**Português**

O automata seguinte é reponsável por reconhecer o comando `Selecionar` em português:

![Português](select/phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Selecionar`:

1. selecionar letra A
2. selecionar palavra valor
3. selecione da símbolo a até letra B
4. selecione de símbolo z até 1ª símbolo z
5. selecionar da 1ª letra A até letra B
6. selecionar de último símbolo A até último z
7. selecione de linha 1 até linha 42

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

---

## Writes a string

Writes a string in the editor

### Languages

This command is available in the following languages

**English**

The following automata is responsible for recognizing the command `Writes a string` in english:

![English](string/phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Writes a string`:

1. text string

**Português**

O automata seguinte é reponsável por reconhecer o comando `Escreve uma string` em português:

![Português](string/phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Escreve uma string`:

1. text text

### Implementation

The full implementation of this command can be found on this directory under the file [impl.ts](impl.ts)

```typescript
async function WriteString(command: WriteStringParsedArgs, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "WriteString"')

    const text = '"' + command.string.join(' ') + '"'

    if (command.parent) return text

    return await editor.write(text)
}

type WriteStri

(...)
```

---

## Stores a value in a variable

Stores a number, string etc in a variable

### Languages

This command is available in the following languages

**English**

The following automata is responsible for recognizing the command `Stores a value in a variable` in english:

![English](variable_assignment/phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Stores a value in a variable`:

1. declare variable called [multi_word_token]
2. constant named [multi_word_token]
3. create constant named [multi_word_token] equals [expressions]
4. declare variable named a equals [expressions]
5. declare variable a equals [expressions]
6. variable called [multi_word_token] equals [expressions]
7. variable named graph equals [expressions]
8. variable graph equals [expressions]
9. create constant named number
10. create variable text
11. variable called temp
12. variable value

**Português**

O automata seguinte é reponsável por reconhecer o comando `Guarda um valor em uma variável` em português:

![Português](variable_assignment/phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Guarda um valor em uma variável`:

1. crie variável chamada [multi_word_token]
2. variável chamada [multi_word_token]
3. declare variável chamada [multi_word_token] igual [expressions]
4. nova constante chamada a igual [expressions]
5. crie variável temp igual [expressions]
6. constante chamada [multi_word_token] igual [expressions]
7. variável chamada a igual [expressions]
8. constante valor igual [expressions]
9. nova constante chamada temp
10. nova constante valor
11. variável chamada texto
12. variável texto

### Implementation

The full implementation of this command can be found on this directory under the file [impl.ts](impl.ts)

```typescript
async function NewVariable(command: NewVariableParsedArgs, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "NewVariable"')

    let { isNew, varName, expression, memType } = command

    const value = typeof expression === 'string' ? expression : expression?.value
    cons

(...)
```

---

## References a variable

Writes a variable or constant in the editor

### Languages

This command is available in the following languages

**English**

The following automata is responsible for recognizing the command `References a variable` in english:

![English](variable_reference/phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `References a variable`:

1. reference constant a
2. constant value
3. reference constant called [multi_word_token]
4. variable called [multi_word_token]

**Português**

O automata seguinte é reponsável por reconhecer o comando `Referencia a uma variável` em português:

![Português](variable_reference/phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Referencia a uma variável`:

1. referência constante texto
2. variável valor
3. refira constante chamada [multi_word_token]
4. variável chamada [multi_word_token]

### Implementation

The full implementation of this command can be found on this directory under the file [impl.ts](impl.ts)

```typescript
async function VariableReference(command: VariableReferenceParsedArgs, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "VariableReference"')

    let { varName, parent } = command

    varName = Array.isArray(varName) ? varName.join('') : varName

    if (parent) return v

(...)
```

---

## Write text

Write some text in the editor

### Languages

This command is available in the following languages

**English**

The following automata is responsible for recognizing the command `Write text` in english:

![English](write/phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Write text`:

1. print the universe is cracked
2. write who are you
3. write it down who are you

**Português**

O automata seguinte é reponsável por reconhecer o comando `Escrever texto` em português:

![Português](write/phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Escrever texto`:

1. escreva quem é você

### Implementation

The full implementation of this command can be found on this directory under the file [impl.ts](impl.ts)

```typescript
async function write(command: WriteParsedArgs, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "write."')

    return await editor.write(command.text?.join(' '))
}

type WriteParsedArgs = {
    text: string[]
} & ParsedPhrase

// @ts-ignore
return write

(...)
```

---