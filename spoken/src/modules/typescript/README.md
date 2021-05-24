# Typescript voice commands

Collection of voice commands of the typescript language

![typescript](typescript.png)

---

## Creates a if/else statement

Creates a if/else statement with the provided expression as condition

### Languages

This command is available in the following languages

**English**

The following automata is responsible for recognizing the command `Creates a if/else statement` in english:

![English](condition/phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Creates a if/else statement`:

1. condition if statement
2. condition if else statement
3. condition if statement [expressions]
4. condition if [expressions]
5. condition if else statement [expressions]

**Português**

O automata seguinte é reponsável por reconhecer o comando `Estrutura condicional` em português:

![Português](condition/phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Estrutura condicional`:

1. estrutura condicional
2. estrutura condicional se
3. estrutura condicional se sinal
4. estrutura condicional se se não
5. estrutura condicional se senão [expressions]
6. estrutura condicional se se não [expressions]
7. estrutura condicional se [expressions]
8. estrutura condicional [expressions]

### Implementation

The full implementation of this command can be found on this directory under the file [impl.ts](impl.ts)

```typescript
async function Condition(command: ConditionParsedArgs, editor: Editor, context: Context) {
    console.log('[Spoken]: Executing: "Condition."')
    
    const anything = context.templates['@anything'].examples[command?.extra?.lang as string][0]
    
    let { condition = anything, otherwise = f

(...)
```

---

## Move cursor

Moves the cursor to a different line or token

### Languages

This command is available in the following languages

**English**

The following automata is responsible for recognizing the command `Move cursor` in english:

![English](cursor/phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Move cursor`:

1. pointer line 42
2. cursor letter M
3. cursor first symbol K
4. cursor end line
5. cursor next symbol
6. cursor next 1 symbol

**Português**

O automata seguinte é reponsável por reconhecer o comando `Mover o cursor` em português:

![Português](cursor/phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Mover o cursor`:

1. ponteiro linha 1
2. ponteiro símbolo A
3. cursor primeiro letra a
4. ponteiro começo linha
5. cursor próximo símbolo
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

1. expression [expressions] [math_operator] [expressions]

**Português**

O automata seguinte é reponsável por reconhecer o comando `Escreve uma operação matemática elementar` em português:

![Português](elementar_math_op/phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Escreve uma operação matemática elementar`:

1. expressão [expressions] [logical_operator] [expressions]

### Implementation

The full implementation of this command can be found on this directory under the file [impl.ts](impl.ts)

```typescript
async function WriteElementarMathOperation(command: WriteElementarMathOperationParsedArgs, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "WriteElementarMathOperation"')

    let operation = toArray(command.operation) as { operator: string, isNegative: boolean }[]
    let r

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

1. [elementar_math_op]
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

1. execute function text
2. call function named value
3. execute function called [multi_word_token]
4. execute function graph 42 arguments
5. execute function called graph 1 arguments
6. call function called [multi_word_token] 42 arguments
7. execute function temp arguments [expressions]
8. call function named number arguments [expressions]
9. execute function named [multi_word_token] arguments [expressions]
10. execute function number 42 arguments on by [expressions]
11. call function value 42 arguments on [expressions]
12. execute function a arguments [expressions] called by [expressions]
13. call function temp arguments [expressions] on [expressions]
14. execute function number called by [expressions]
15. execute function value on [expressions]
16. call function named number 1 arguments called by [expressions]

**Português**

O automata seguinte é reponsável por reconhecer o comando `Chama uma função` em português:

![Português](function_call/phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Chama uma função`:

1. chamar função numero
2. chamar função nomeada a
3. execute função nomeada [multi_word_token]
4. chamar função a 42 argumentos
5. execute função nomeada texto 42 argumentos
6. chame função nomeada [multi_word_token] 1 argumentos
7. execute função temp argumentos [expressions]
8. chamar função chamada texto argumentos [expressions]
9. chamar função chamada [multi_word_token] argumentos [expressions]
10. execute função numero 1 argumentos no por [expressions]
11. chame função texto 42 argumentos chamada [expressions]
12. chamar função valor argumentos [expressions] no pela [expressions]
13. chamar função lista argumentos [expressions] na [expressions]
14. chamar função valor no por [expressions]
15. execute função lista na [expressions]
16. execute função chamada numero 1 argumentos no por [expressions]

### Implementation

The full implementation of this command can be found on this directory under the file [impl.ts](impl.ts)

```typescript
async function FunctionCall(command: FunctionCallParsedArgs, editor: Editor, context: Context) {
    console.log('[Spoken]: Executing: "FunctionCall"')

    const anything = context.templates['@anything'].examples[command?.extra?.lang as string]

    const functionName = join(command.functionNa

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

1. go to line 1
2. go to line number 42
3. go line 42
4. go line number 1
5. line 42
6. line number 42

**Português**

O automata seguinte é reponsável por reconhecer o comando `Trocar linha` em português:

![Português](go_to_line/phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Trocar linha`:

1. vá para linha 42
2. vá para linha número 1
3. vai para a linha 42
4. vai para a linha número 1
5. vá linha 42
6. vá linha número 1
7. linha 1
8. linha número 42

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

## Writes a logical operator

Writes a logical operator (===, !==, &&, ||, >, <, >=, <=) meant to be used inside expressions

### Languages

This command is available in the following languages

**English**

The following automata is responsible for recognizing the command `Writes a logical operator` in english:

![English](logical_operator/phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Writes a logical operator`:

1. and
2. not and
3. negative greater or equals than
4. negative less than
5. less or equals than
6. greater than

**Português**

O automata seguinte é reponsável por reconhecer o comando `Escreve um operador lógico` em português:

![Português](logical_operator/phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Escreve um operador lógico`:

1. e
2. negativo igual
3. negativo maior ou igual
4. menor ou igual
5. não menor ou igual a
6. não menor que
7. maior ou igual a
8. menor que

### Implementation

The full implementation of this command can be found on this directory under the file [impl.ts](impl.ts)

```typescript
async function LogicalOperator(command: LogicalOperatorParsedArgs, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "LogicalOperator"')

    const { logicalOperator, isNegative = false, inequalityOperator, orEqual = false } = command

    if (logicalOperator !== undefined) {

(...)
```

---

## Writes a math operator

Writes a math operator (*, -, +, /) meant to be used inside expressions

### Languages

This command is available in the following languages

**English**

The following automata is responsible for recognizing the command `Writes a math operator` in english:

![English](math_operator/phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Writes a math operator`:

1. plus

**Português**

O automata seguinte é reponsável por reconhecer o comando `Escreve uma operador matemático` em português:

![Português](math_operator/phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Escreve uma operador matemático`:

1. menos

### Implementation

The full implementation of this command can be found on this directory under the file [impl.ts](impl.ts)

```typescript
async function MathOperator(command: MathOperatorParsedArgs, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "MathOperator"')

    const { mathOperator } = command

    const operator = ['+', '*', '-', '/'][mathOperator] || 'error'

    return { operator }
}

type Math

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
5. line below
6. create new line above
7. create line above

**Português**

O automata seguinte é reponsável por reconhecer o comando `Linha nova` em português:

![Português](new_line/phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Linha nova`:

1. nova linha
2. linha nova
3. crie nova linha
4. crie linha
5. nova linha acima
6. linha nova abaixo
7. linha acima
8. crie nova linha acima
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

## Run current file

Run the current file in the terminal using node

### Languages

This command is available in the following languages

**English**

The following automata is responsible for recognizing the command `Run current file` in english:

![English](run/phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Run current file`:

1. run current file

**Português**

O automata seguinte é reponsável por reconhecer o comando `Executar arquivo` em português:

![Português](run/phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Executar arquivo`:

1. executar arquivo atual
2. executar este arquivo

### Implementation

The full implementation of this command can be found on this directory under the file [impl.ts](impl.ts)

```typescript
async function run(command: RunParsedArgs, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "run."')

    const info = await editor.fileInfo() as { fileName: string }

    return await editor.writeOnTerminal('node "' + info.fileName + '"')
}

type RunParsedArgs = {
    

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
2. select word a
3. select from letter M to M
4. select from symbol g to fourth M
5. select from 1ª letter K to letter K
6. select from 1ª symbol M to 42ª letter K
7. select from line 42 to line 42

**Português**

O automata seguinte é reponsável por reconhecer o comando `Selecionar` em português:

![Português](select/phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Selecionar`:

1. selecionar letra z
2. selecionar palavra temp
3. selecione de letra B até símbolo z
4. selecionar da letra z até 42ª símbolo a
5. selecione de 1ª símbolo B até símbolo A
6. selecione da 42ª letra z até sétimo símbolo z
7. selecione de linha 42 até 1

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

1. string text

### Implementation

The full implementation of this command can be found on this directory under the file [impl.ts](impl.ts)

```typescript
async function WriteString(command: WriteStringParsedArgs, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "WriteString"')

    command.string = Array.isArray(command.string) ? command.string : [command.string]

    const text = '"' + command.string.join(' ') + '"'

    i

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

1. new variable named [multi_word_token]
2. variable named [multi_word_token]
3. new constant called [multi_word_token] equals [expressions]
4. create variable named a equals [expressions]
5. declare variable number equals [expressions]
6. constant named [multi_word_token] equals [expressions]
7. variable named value equals [expressions]
8. constant number equals [expressions]
9. new constant named graph
10. new variable a
11. constant called text
12. constant graph

**Português**

O automata seguinte é reponsável por reconhecer o comando `Guarda um valor em uma variável` em português:

![Português](variable_assignment/phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Guarda um valor em uma variável`:

1. nova constante chamada [multi_word_token]
2. constante chamada [multi_word_token]
3. declare variável chamada [multi_word_token] igual [expressions]
4. declare variável chamada lista igual [expressions]
5. crie constante numero igual [expressions]
6. constante chamada [multi_word_token] igual [expressions]
7. variável chamada lista igual [expressions]
8. variável numero igual [expressions]
9. crie constante chamada numero
10. declare variável temp
11. variável chamada numero
12. constante temp

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

1. reference constant value
2. constant text
3. reference variable called [multi_word_token]
4. constant called [multi_word_token]

**Português**

O automata seguinte é reponsável por reconhecer o comando `Referencia a uma variável` em português:

![Português](variable_reference/phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Referencia a uma variável`:

1. referência constante texto
2. variável temp
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

1. print who are you
2. write who are you
3. write it the universe is cracked

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

    const text = Array.isArray(command.text) ? command.text?.join(' ') : command.text

    return await editor.write(text)
}

type WriteParsedArgs = {
    text: st

(...)
```

---