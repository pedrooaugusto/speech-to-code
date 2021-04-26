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
2. pointer symbol M
3. cursor 1ª symbol K
4. cursor begin line
5. pointer next symbol
6. pointer next 1 symbol

**Português**

O automata seguinte é reponsável por reconhecer o comando `Mover o cursor` em português:

![Português](cursor/phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Mover o cursor`:

1. ponteiro linha 42
2. cursor letra B
3. ponteiro primeiro símbolo z
4. ponteiro final linha
5. cursor próximo letra
6. cursor próximo 1 símbolo

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

1. expression [expressions] divided [expressions]

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

1. [variable_reference]
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
3. go line 1
4. go line number 1
5. line 1
6. line number 42

**Português**

O automata seguinte é reponsável por reconhecer o comando `Trocar linha` em português:

![Português](go_to_line/phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Trocar linha`:

1. vá para linha 42
2. vá para linha número 42
3. vai para a linha 42
4. vai para a linha número 42
5. vai linha 42
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
4. new line above
5. line below
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
6. linha nova acima
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
2. select word value
3. select from symbol g to K
4. select from symbol M to 1ª letter M
5. select from first letter K to g
6. select from 42ª symbol M to fourth symbol K
7. select from line 1 to line 1

**Português**

O automata seguinte é reponsável por reconhecer o comando `Selecionar` em português:

![Português](select/phrase_pt-BR.png)

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

---

## Writes a string

Writes a string in the editor

### Languages

This command is available in the following languages

**English**

The following automata is responsible for recognizing the command `Writes a string` in english:

![English](string/phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Writes a string`:

1. text text

**Português**

O automata seguinte é reponsável por reconhecer o comando `Escreve uma string` em português:

![Português](string/phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Escreve uma string`:

1. string string

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
2. variable called [multi_word_token]
3. declare variable named [multi_word_token] equals [expressions]
4. new constant called text equals [expressions]
5. create variable graph equals [expressions]
6. constant named [multi_word_token] equals [expressions]
7. variable called graph equals [expressions]
8. constant number equals [expressions]
9. declare constant called graph
10. declare constant value
11. constant named text
12. constant graph

**Português**

O automata seguinte é reponsável por reconhecer o comando `Guarda um valor em uma variável` em português:

![Português](variable_assignment/phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Guarda um valor em uma variável`:

1. declare constante chamada [multi_word_token]
2. variável chamada [multi_word_token]
3. declare constante chamada [multi_word_token] igual [expressions]
4. crie variável chamada temp igual [expressions]
5. nova constante temp igual [expressions]
6. variável chamada [multi_word_token] igual [expressions]
7. constante chamada texto igual [expressions]
8. constante a igual [expressions]
9. nova variável chamada valor
10. nova variável lista
11. constante chamada valor
12. variável lista

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

1. reference constant text
2. variable number
3. reference variable called [multi_word_token]
4. constant called [multi_word_token]

**Português**

O automata seguinte é reponsável por reconhecer o comando `Referencia a uma variável` em português:

![Português](variable_reference/phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Referencia a uma variável`:

1. refira constante numero
2. constante a
3. referência constante chamada [multi_word_token]
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
2. write the universe is cracked
3. write it down the universe is cracked

**Português**

O automata seguinte é reponsável por reconhecer o comando `Escrever texto` em português:

![Português](write/phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Escrever texto`:

1. escreva isto é um teste

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