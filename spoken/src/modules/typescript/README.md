# Typescript voice commands

Collection of voice commands of the typescript language

![typescript](typescript.png)

---

## Creates a if/else statement

Creates a if/else statement with the provided expression as condition

### Languages

This command is available in the following languages

#### English

The following automata is responsible for recognizing the command `Creates a if/else statement` in english:

![English](condition/phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Creates a if/else statement`:

1. conditional statement
2. conditional statement if else
3. conditional statement if else [expressions]
4. conditional statement if [expressions]
5. conditional statement [expressions]

#### Português

O automata seguinte é reponsável por reconhecer o comando `Estrutura condicional` em português:

![Português](condition/phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Estrutura condicional`:

1. estrutura condicional
2. estrutura condicional se
3. estrutura condicional se senão
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

#### English

The following automata is responsible for recognizing the command `Move cursor` in english:

![English](cursor/phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Move cursor`:

1. cursor line 42
2. pointer symbol g
3. pointer 1ª symbol K
4. cursor begin line
5. pointer next symbol
6. cursor next 1 symbol

#### Português

O automata seguinte é reponsável por reconhecer o comando `Mover o cursor` em português:

![Português](cursor/phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Mover o cursor`:

1. cursor linha 42
2. ponteiro símbolo a
3. cursor 42ª símbolo a
4. cursor começo linha
5. ponteiro próximo letra
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

#### English

The following automata is responsible for recognizing the command `Writes a elementar math operation` in english:

![English](elementar_math_op/phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Writes a elementar math operation`:

1. expression [expressions] [math_operator] [expressions]

#### Português

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

#### English

The following automata is responsible for recognizing the command `Writes a expression` in english:

![English](expressions/phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Writes a expression`:

1. [variable_reference]
2. gap

#### Português

O automata seguinte é reponsável por reconhecer o comando `Escreve uma expressão` em português:

![Português](expressions/phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Escreve uma expressão`:

1. [variable_reference]
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

#### English

The following automata is responsible for recognizing the command `Calls a function` in english:

![English](function_call/phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Calls a function`:

1. execute function [multi_word_token]
2. execute function text
3. call function [multi_word_token] [expressions]
4. execute function [multi_word_token] at [expressions]
5. execute function value [expressions]
6. execute function graph on [expressions]
7. execute function [multi_word_token] [expressions] arguments [expressions]
8. execute function [multi_word_token] arguments [expressions]
9. execute function [multi_word_token] on [expressions] arguments [expressions]
10. execute function a [expressions] arguments [expressions]
11. execute function text arguments [expressions]
12. execute function value of [expressions] arguments [expressions]
13. execute function [multi_word_token] [expressions] 1 arguments
14. execute function [multi_word_token] 1 arguments
15. execute function [multi_word_token] on [expressions] 42 arguments
16. execute function number [expressions] 42 arguments

#### Português

O automata seguinte é reponsável por reconhecer o comando `Chama uma função` em português:

![Português](function_call/phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Chama uma função`:

1. chame função [multi_word_token]
2. chamar função lista
3. chamar função [multi_word_token] [expressions]
4. execute função [multi_word_token] na [expressions]
5. execute função lista [expressions]
6. chamar função texto da [expressions]
7. chamar função [multi_word_token] [expressions] argumentos [expressions]
8. chame função [multi_word_token] argumentos [expressions]
9. execute função [multi_word_token] da [expressions] argumentos [expressions]
10. execute função temp [expressions] argumentos [expressions]
11. execute função numero argumentos [expressions]
12. chame função valor da [expressions] argumentos [expressions]
13. execute função [multi_word_token] [expressions] 42 argumentos
14. execute função [multi_word_token] 1 argumentos
15. chame função [multi_word_token] na [expressions] 42 argumentos
16. chame função numero [expressions] 42 argumentos

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

#### English

The following automata is responsible for recognizing the command `Creates a function` in english:

![English](function_declaration/phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Creates a function`:

1. new function number
2. declare function number 1 arguments
3. declare function graph 42 arguments returning [expressions]
4. new function value return [expressions]

#### Português

O automata seguinte é reponsável por reconhecer o comando `Cria uma função` em português:

![Português](function_declaration/phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Cria uma função`:

1. declare função lista
2. nova função lista 42 argumentos
3. nova função temp 1 argumentos retorna [expressions]
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

#### English

The following automata is responsible for recognizing the command `Change line` in english:

![English](go_to_line/phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Change line`:

1. go to line 1
2. go to line number 42
3. go line 42
4. go line number 42
5. line 1
6. line number 42

#### Português

O automata seguinte é reponsável por reconhecer o comando `Trocar linha` em português:

![Português](go_to_line/phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Trocar linha`:

1. vai para linha 1
2. vai para linha número 42
3. vá para a linha 42
4. vai para a linha número 1
5. vai linha 1
6. vá linha número 42
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

#### English

The following automata is responsible for recognizing the command `Writes a logical operator` in english:

![English](logical_operator/phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Writes a logical operator`:

1. and
2. not equals
3. not less equals than
4. negative greater than
5. greater or equals than
6. greater than

#### Português

O automata seguinte é reponsável por reconhecer o comando `Escreve um operador lógico` em português:

![Português](logical_operator/phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Escreve um operador lógico`:

1. igual
2. negativo e
3. negativo menor ou igual
4. menor ou igual
5. não menor ou igual a
6. não menor que
7. menor ou igual a
8. maior que

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

#### English

The following automata is responsible for recognizing the command `Writes a math operator` in english:

![English](math_operator/phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Writes a math operator`:

1. times

#### Português

O automata seguinte é reponsável por reconhecer o comando `Escreve uma operador matemático` em português:

![Português](math_operator/phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Escreve uma operador matemático`:

1. vezes

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

#### English

The following automata is responsible for recognizing the command `Group multiple words together` in english:

![English](multi_word_token/phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Group multiple words together`:

1. * *

#### Português

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

#### English

The following automata is responsible for recognizing the command `New line` in english:

![English](new_line/phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `New line`:

1. new line
2. create new line
3. create line
4. new line below
5. line below
6. create new line below
7. create line below

#### Português

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
9. crie linha acima

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

#### English

The following automata is responsible for recognizing the command `Writes a number` in english:

![English](number/phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Writes a number`:

1. number 1
2. 42

#### Português

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

## Creates a for loop statement

Creates a for loop statement with the provided expressions as parameters

### Languages

This command is available in the following languages

#### English

The following automata is responsible for recognizing the command `Creates a for loop statement` in english:

![English](repetition/phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Creates a for loop statement`:

1. repetition statement
2. repetition statement from [expressions] to [expressions]
3. repetition statement from [expressions] to [expressions] step [expressions]
4. repetition statement for every text of [expressions]

#### Português

O automata seguinte é reponsável por reconhecer o comando `Estrutura de repetição` em português:

![Português](repetition/phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Estrutura de repetição`:

1. estrutura repetição
2. estrutura repetição do [expressions] até [expressions]
3. estrutura repetição [expressions] até [expressions] etapa [expressions]
4. estrutura repetição para todo numero de [expressions]

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

#### English

The following automata is responsible for recognizing the command `Run current file` in english:

![English](run/phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Run current file`:

1. run this file

#### Português

O automata seguinte é reponsável por reconhecer o comando `Executar arquivo` em português:

![Português](run/phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Executar arquivo`:

1. execute arquivo atual
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

#### English

The following automata is responsible for recognizing the command `Select` in english:

![English](select/phrase_en-US.png)

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

![Português](select/phrase_pt-BR.png)

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

---

## Writes a string

Writes a string in the editor

### Languages

This command is available in the following languages

#### English

The following automata is responsible for recognizing the command `Writes a string` in english:

![English](string/phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Writes a string`:

1. text text

#### Português

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

#### English

The following automata is responsible for recognizing the command `Stores a value in a variable` in english:

![English](variable_assignment/phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Stores a value in a variable`:

1. new variable named [multi_word_token]
2. constant called [multi_word_token]
3. declare variable called [multi_word_token] equals [expressions]
4. declare variable called temp equals [expressions]
5. new constant value equals [expressions]
6. variable named [multi_word_token] equals [expressions]
7. constant called a equals [expressions]
8. variable a equals [expressions]
9. declare variable called graph
10. create constant a
11. variable called text
12. variable a

#### Português

O automata seguinte é reponsável por reconhecer o comando `Guarda um valor em uma variável` em português:

![Português](variable_assignment/phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Guarda um valor em uma variável`:

1. nova constante chamada [multi_word_token]
2. constante chamada [multi_word_token]
3. crie variável chamada [multi_word_token] igual [expressions]
4. declare variável chamada a igual [expressions]
5. declare variável valor igual [expressions]
6. variável chamada [multi_word_token] igual [expressions]
7. variável chamada numero igual [expressions]
8. constante temp igual [expressions]
9. declare variável chamada lista
10. declare constante valor
11. variável chamada numero
12. constante numero

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

#### English

The following automata is responsible for recognizing the command `References a variable` in english:

![English](variable_reference/phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `References a variable`:

1. reference variable temp
2. reference namespace value
3. constant a
4. namespace value
5. reference constant called [multi_word_token]
6. reference namespace called [multi_word_token]
7. constant called [multi_word_token]
8. namespace called [multi_word_token]

#### Português

O automata seguinte é reponsável por reconhecer o comando `Referencia a uma variável` em português:

![Português](variable_reference/phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Referencia a uma variável`:

1. refira constante numero
2. referência namespace temp
3. variável temp
4. namespace lista
5. referência variável chamada [multi_word_token]
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

#### English

The following automata is responsible for recognizing the command `Write text` in english:

![English](write/phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Write text`:

1. print
2. write
3. write it
4. print space
5. write space
6. write it down space
7. print the universe is cracked who are you
8. write down who are you the universe is cracked
9. write it who are you the universe is cracked

#### Português

O automata seguinte é reponsável por reconhecer o comando `Escrever texto` em português:

![Português](write/phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Escrever texto`:

1. escreva
2. escreva espaço
3. escreva isto é um teste quem é você

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