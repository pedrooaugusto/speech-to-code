# Typescript voice commands

Collection of voice commands of the typescript language

![typescript](typescript.png)

---

## Change input language

Changes input language to portuguese

### Languages

This command is available in the following languages

**English**

The following automata is responsible for recognizing the command `Change input language` in english:

![English](change_language/phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Change input language`:

1. change language back portuguese
2. change language portuguese

**Português**

O automata seguinte é reponsável por reconhecer o comando `Mudar linguagem de entrada` em português:

![Português](change_language/phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Mudar linguagem de entrada`:

1. mudar linguagem inglês

### Implementation

The full implementation of this command can be found on this directory under the file [impl.ts](impl.ts)

```typescript
async function changeLang(command: ParsedPhrase, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "changeLang."')
    console.log('This is an internal command this file should never run!')

    return null
}

export default changeLang

(...)
```

---

## Creates a if/else statement

Creates a if/else statement with the provided expression as condition

### Languages

This command is available in the following languages

**English**

The following automata is responsible for recognizing the command `Creates a if/else statement` in english:

![English](condition/phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Creates a if/else statement`:

1. conditional statement
2. conditional statement if else
3. conditional statement if else [expressions]
4. conditional statement if [expressions]
5. conditional statement [expressions]

**Português**

O automata seguinte é reponsável por reconhecer o comando `Estrutura condicional` em português:

![Português](condition/phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Estrutura condicional`:

1. estrutura condicional
2. estrutura condicional se
3. estrutura condicional se sinal
4. estrutura condicional se se não
5. estrutura condicional se sinal [expressions]
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

1. cursor line 1
2. pointer symbol g
3. cursor fourth letter K
4. cursor begin line
5. cursor next symbol
6. pointer next 42 symbol

**Português**

O automata seguinte é reponsável por reconhecer o comando `Mover o cursor` em português:

![Português](cursor/phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Mover o cursor`:

1. ponteiro linha 42
2. ponteiro letra z
3. cursor sétimo símbolo a
4. ponteiro começo linha
5. cursor próximo símbolo
6. cursor próximo 42 símbolo

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

1. expression [expressions] [logical_operator] [expressions]

**Português**

O automata seguinte é reponsável por reconhecer o comando `Escreve uma operação matemática elementar` em português:

![Português](elementar_math_op/phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Escreve uma operação matemática elementar`:

1. expressão [expressions] [math_operator] [expressions]

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

1. [function_call]
2. gap

**Português**

O automata seguinte é reponsável por reconhecer o comando `Escreve uma expressão` em português:

![Português](expressions/phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Escreve uma expressão`:

1. [function_call]
2. gap

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

1. execute function [multi_word_token]
2. execute function temp
3. call function [multi_word_token] [expressions]
4. call function [multi_word_token] on [expressions]
5. execute function temp [expressions]
6. call function a on [expressions]
7. execute function [multi_word_token] [expressions] arguments [expressions]
8. execute function [multi_word_token] arguments [expressions]
9. execute function [multi_word_token] of [expressions] arguments [expressions]
10. call function graph [expressions] arguments [expressions]
11. execute function graph arguments [expressions]
12. execute function value on [expressions] arguments [expressions]
13. call function [multi_word_token] [expressions] 1 arguments
14. call function [multi_word_token] 42 arguments
15. call function [multi_word_token] of [expressions] 42 arguments
16. execute function graph [expressions] 1 arguments

**Português**

O automata seguinte é reponsável por reconhecer o comando `Chama uma função` em português:

![Português](function_call/phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Chama uma função`:

1. execute função [multi_word_token]
2. chamar função temp
3. chamar função [multi_word_token] [expressions]
4. execute função [multi_word_token] na [expressions]
5. execute função lista [expressions]
6. chamar função numero na [expressions]
7. chamar função [multi_word_token] [expressions] argumentos [expressions]
8. chamar função [multi_word_token] argumentos [expressions]
9. execute função [multi_word_token] da [expressions] argumentos [expressions]
10. execute função lista [expressions] argumentos [expressions]
11. chame função valor argumentos [expressions]
12. chamar função temp na [expressions] argumentos [expressions]
13. chamar função [multi_word_token] [expressions] 42 argumentos
14. chamar função [multi_word_token] 42 argumentos
15. chame função [multi_word_token] da [expressions] 1 argumentos
16. chamar função lista [expressions] 1 argumentos

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

## Creates a function

Creates a function with the desired number of args and return value

### Languages

This command is available in the following languages

**English**

The following automata is responsible for recognizing the command `Creates a function` in english:

![English](function_declaration/phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Creates a function`:

1. declare function value
2. new function temp 1 arguments
3. declare function graph 1 arguments return [expressions]
4. new function value returning [expressions]

**Português**

O automata seguinte é reponsável por reconhecer o comando `Cria uma função` em português:

![Português](function_declaration/phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Cria uma função`:

1. declare função numero
2. nova função texto 42 argumentos
3. crie função a 42 argumentos retornando [expressions]
4. declare função numero retorna [expressions]

### Implementation

The full implementation of this command can be found on this directory under the file [impl.ts](impl.ts)

```typescript
async function FunctionDeclaration(command: FunctionDeclarationParsedArgs, editor: Editor, context: Context) {
    console.log('[Spoken]: Executing: "FunctionDeclaration"')

    const anything = context.templates['@anything'].examples[command?.extra?.lang as string]

    let { fnName, argsNumbe

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
2. go to line number 1
3. go line 42
4. go line number 1
5. line 42
6. line number 42

**Português**

O automata seguinte é reponsável por reconhecer o comando `Trocar linha` em português:

![Português](go_to_line/phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Trocar linha`:

1. vai para linha 42
2. vá para linha número 1
3. vá para a linha 42
4. vá para a linha número 1
5. vá linha 42
6. vai linha número 42
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

export default goToLi

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
3. negative less equals than
4. negative less than
5. greater or equals than
6. less than

**Português**

O automata seguinte é reponsável por reconhecer o comando `Escreve um operador lógico` em português:

![Português](logical_operator/phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Escreve um operador lógico`:

1. ou
2. negativo e
3. negativo maior ou igual
4. menor ou igual
5. negativo maior ou igual a
6. negativo maior que
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

1. divided

**Português**

O automata seguinte é reponsável por reconhecer o comando `Escreve uma operador matemático` em português:

![Português](math_operator/phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Escreve uma operador matemático`:

1. dividido

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
5. line above
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
6. linha nova acima
7. linha acima
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

export default newLine

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

1. number 42

**Português**

O automata seguinte é reponsável por reconhecer o comando `Escreve um número` em português:

![Português](number/phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Escreve um número`:

1. número 1

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

## Creates a for loop statement

Creates a for loop statement with the provided expressions as parameters

### Languages

This command is available in the following languages

**English**

The following automata is responsible for recognizing the command `Creates a for loop statement` in english:

![English](repetition/phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Creates a for loop statement`:

1. repetition statement
2. repetition statement from [expressions] to [expressions]
3. repetition statement from [expressions] to [expressions] step [expressions]
4. repetition statement for every number [expressions]

**Português**

O automata seguinte é reponsável por reconhecer o comando `Estrutura de repetição` em português:

![Português](repetition/phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Estrutura de repetição`:

1. estrutura repetição
2. estrutura repetição de [expressions] até [expressions]
3. estrutura repetição do [expressions] até [expressions] etapa [expressions]
4. estrutura repetição para todo lista da [expressions]

### Implementation

The full implementation of this command can be found on this directory under the file [impl.ts](impl.ts)

```typescript
async function Repetition(command: RepetitionParsedArgs, editor: Editor, context: Context) {
    console.log('[Spoken]: Executing: "Repetition."')
    
    const gap = context.templates['@anything'].examples[command?.extra?.lang as string][0]

    let text = `for(${gap}; ${gap}; ${gap}) {\n\n}`

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

1. run this file

**Português**

O automata seguinte é reponsável por reconhecer o comando `Executar arquivo` em português:

![Português](run/phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Executar arquivo`:

1. executar arquivo atual
2. execute este arquivo

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

![Português](select/phrase_pt-BR.png)

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

---

## Writes a string

Writes a string in the editor

### Languages

This command is available in the following languages

**English**

The following automata is responsible for recognizing the command `Writes a string` in english:

![English](string/phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Writes a string`:

1. string text

**Português**

O automata seguinte é reponsável por reconhecer o comando `Escreve uma string` em português:

![Português](string/phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Escreve uma string`:

1. text string

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
2. constant named [multi_word_token]
3. create variable called [multi_word_token] equals [expressions]
4. new constant named a equals [expressions]
5. declare variable number equals [expressions]
6. constant named [multi_word_token] equals [expressions]
7. variable named number equals [expressions]
8. constant graph equals [expressions]
9. new constant called number
10. create variable value
11. constant called number
12. constant text

**Português**

O automata seguinte é reponsável por reconhecer o comando `Guarda um valor em uma variável` em português:

![Português](variable_assignment/phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Guarda um valor em uma variável`:

1. nova variável chamada [multi_word_token]
2. constante chamada [multi_word_token]
3. declare variável chamada [multi_word_token] igual [expressions]
4. nova constante chamada temp igual [expressions]
5. nova constante numero igual [expressions]
6. constante chamada [multi_word_token] igual [expressions]
7. variável chamada temp igual [expressions]
8. variável a igual [expressions]
9. crie constante chamada numero
10. crie constante lista
11. constante chamada texto
12. variável valor

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

1. reference variable a
2. reference namespace temp
3. constant graph
4. namespace a
5. reference variable called [multi_word_token]
6. reference namespace called [multi_word_token]
7. constant called [multi_word_token]
8. namespace called [multi_word_token]

**Português**

O automata seguinte é reponsável por reconhecer o comando `Referencia a uma variável` em português:

![Português](variable_reference/phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Referencia a uma variável`:

1. refira constante texto
2. referência namespace a
3. constante valor
4. namespace lista
5. refira constante chamada [multi_word_token]
6. refira namespace chamada [multi_word_token]
7. variável chamada [multi_word_token]
8. namespace chamada [multi_word_token]

### Implementation

The full implementation of this command can be found on this directory under the file [impl.ts](impl.ts)

```typescript
async function VariableReference(command: VariableReferenceParsedArgs, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "VariableReference"')

    let { varName, parent, isNamespace = false } = command

    varName = Array.isArray(varName) ? varName : [varName]
    varName 

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

1. print
2. write
3. write it
4. print space
5. write down space
6. write it down space
7. print who are you who are you
8. write down the universe is cracked who are you
9. write it who are you who are you

**Português**

O automata seguinte é reponsável por reconhecer o comando `Escrever texto` em português:

![Português](write/phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Escrever texto`:

1. escreva
2. escreva espaço
3. escreva quem é você quem é você

### Implementation

The full implementation of this command can be found on this directory under the file [impl.ts](impl.ts)

```typescript
async function write(command: WriteParsedArgs, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "write."')

    const text = command.isSpace ? ' ' : Array.isArray(command.text) ? command.text?.join(' ') : command.text

    return await editor.write(text)
}

type WritePars

(...)
```

---