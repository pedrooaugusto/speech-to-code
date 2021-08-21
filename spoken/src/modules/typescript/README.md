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
3. estrutura condicional se sinal
4. estrutura condicional se se não
5. estrutura condicional se sinal [expressions]
6. estrutura condicional se se não [expressions]
7. estrutura condicional se [expressions]
8. estrutura condicional [expressions]

### Implementation

The full implementation of this command can be found on this directory under the file [impl.ts](impl.ts)

```typescript
import { ParsedPhrase, Editor, WildCard } from '../../d'
import { Context } from '../../../modules-loader'

async function Condition(command: ConditionParsedArgs, editor: Editor, context: Context) {
    console.log('[Spoken]: Executing: "Condition."')
    
    const anything = context.template

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

1. pointer line 1
2. cursor symbol K
3. cursor 1ª letter g
4. cursor end line
5. pointer next symbol
6. pointer next 42 symbol

#### Português

O automata seguinte é reponsável por reconhecer o comando `Mover o cursor` em português:

![Português](cursor/phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Mover o cursor`:

1. cursor linha 1
2. ponteiro símbolo a
3. ponteiro 1ª símbolo B
4. cursor começo linha
5. cursor próximo símbolo
6. ponteiro próximo 42 símbolo

### Implementation

The full implementation of this command can be found on this directory under the file [impl.ts](impl.ts)

```typescript
import { ParsedPhrase, Editor, WildCard } from '../../d'

async function cursor(args: CursorParsedArgs, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "cursor."')

    if (args.linePosition != null) {
        const pos = args.linePosition === LinePostionEnum.BEGIN ? 'BEGI

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
import { ParsedPhrase, Editor, WildCard } from '../../d'

async function WriteElementarMathOperation(command: WriteElementarMathOperationParsedArgs, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "WriteElementarMathOperation"')

    let operation = toArray(command.operatio

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

1. [number]
2. gap
3. true

#### Português

O automata seguinte é reponsável por reconhecer o comando `Escreve uma expressão` em português:

![Português](expressions/phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Escreve uma expressão`:

1. [elementar_math_op]
2. gap
3. falso

### Implementation

The full implementation of this command can be found on this directory under the file [impl.ts](impl.ts)

```typescript
import { ParsedPhrase, Editor, WildCard } from '../../d'

async function Expression(command: ExpressionParsedArgs, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "Expression"')

    let { expression, parent, wildCard, booleanConstants } = command

    // really ??? (fix 

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

1. call function [multi_word_token]
2. execute function graph
3. call function [multi_word_token] [expressions]
4. execute function [multi_word_token] of [expressions]
5. execute function value [expressions]
6. execute function value on [expressions]
7. execute function [multi_word_token] [expressions] arguments [expressions]
8. execute function [multi_word_token] arguments [expressions]
9. call function [multi_word_token] at [expressions] arguments [expressions]
10. execute function graph [expressions] arguments [expressions]
11. execute function number arguments [expressions]
12. call function graph of [expressions] arguments [expressions]
13. execute function [multi_word_token] [expressions] 1 arguments
14. call function [multi_word_token] 42 arguments
15. execute function [multi_word_token] at [expressions] 1 arguments
16. execute function value [expressions] 1 arguments

#### Português

O automata seguinte é reponsável por reconhecer o comando `Chama uma função` em português:

![Português](function_call/phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Chama uma função`:

1. execute função [multi_word_token]
2. execute função valor
3. chame função [multi_word_token] [expressions]
4. chame função [multi_word_token] da [expressions]
5. chame função temp [expressions]
6. chame função numero na [expressions]
7. execute função [multi_word_token] [expressions] argumentos [expressions]
8. execute função [multi_word_token] argumentos [expressions]
9. chame função [multi_word_token] na [expressions] argumentos [expressions]
10. execute função numero [expressions] argumentos [expressions]
11. chamar função valor argumentos [expressions]
12. chame função a da [expressions] argumentos [expressions]
13. chame função [multi_word_token] [expressions] 1 argumentos
14. chame função [multi_word_token] 42 argumentos
15. chame função [multi_word_token] na [expressions] 1 argumentos
16. chamar função lista [expressions] 42 argumentos

### Implementation

The full implementation of this command can be found on this directory under the file [impl.ts](impl.ts)

```typescript
import { Context } from '../../../modules-loader'
import { ParsedPhrase, Editor, WildCard } from '../../d'

async function FunctionCall(command: FunctionCallParsedArgs, editor: Editor, context: Context) {
    console.log('[Spoken]: Executing: "FunctionCall"')

    const anything = context.temp

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

1. declare function a
2. create function graph 1 arguments
3. declare function graph 42 arguments return [expressions]
4. create function value return [expressions]
5. return [expressions]

#### Português

O automata seguinte é reponsável por reconhecer o comando `Cria uma função` em português:

![Português](function_declaration/phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Cria uma função`:

1. crie função a
2. crie função temp 1 argumentos
3. nova função temp 42 argumentos retornando [expressions]
4. declare função valor retorna [expressions]
5. retorne [expressions]

### Implementation

The full implementation of this command can be found on this directory under the file [impl.ts](impl.ts)

```typescript
import { Context } from '../../../modules-loader'
import { ParsedPhrase, Editor, WildCard } from '../../d'

async function FunctionDeclaration(command: FunctionDeclarationParsedArgs, editor: Editor, context: Context) {
    console.log('[Spoken]: Executing: "FunctionDeclaration"')

    const an

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

1. go to line 42
2. go to line number 42
3. go line 42
4. go line number 1
5. line 1
6. line number 42

#### Português

O automata seguinte é reponsável por reconhecer o comando `Trocar linha` em português:

![Português](go_to_line/phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Trocar linha`:

1. vá para linha 1
2. vá para linha número 1
3. vá para a linha 1
4. vai para a linha número 1
5. vai linha 42
6. vá linha número 42
7. linha 1
8. linha número 1

### Implementation

The full implementation of this command can be found on this directory under the file [impl.ts](impl.ts)

```typescript
import { Context } from '../../../modules-loader'
import { ParsedPhrase, Editor, WildCard } from '../../d'

async function goToLine(command: GoToLineParsedArgs, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "goToLine."')

    return await editor.goToLine(command.line as 

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

1. or
2. negative or
3. not greater or equals than
4. not greater than
5. greater or equals than
6. greater than

#### Português

O automata seguinte é reponsável por reconhecer o comando `Escreve um operador lógico` em português:

![Português](logical_operator/phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Escreve um operador lógico`:

1. ou
2. negativo ou
3. não maior ou igual
4. maior ou igual
5. não menor ou igual a
6. negativo maior que
7. maior ou igual a
8. menor que

### Implementation

The full implementation of this command can be found on this directory under the file [impl.ts](impl.ts)

```typescript
import { Context } from '../../../modules-loader'
import { ParsedPhrase, Editor, WildCard } from '../../d'

async function LogicalOperator(command: LogicalOperatorParsedArgs, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "LogicalOperator"')

    const { logicalOperator, 

(...)
```

---

## Writes a math operator

Writes a math operator (*, -, +, /, %) meant to be used inside expressions

### Languages

This command is available in the following languages

#### English

The following automata is responsible for recognizing the command `Writes a math operator` in english:

![English](math_operator/phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Writes a math operator`:

1. module by

#### Português

O automata seguinte é reponsável por reconhecer o comando `Escreve uma operador matemático` em português:

![Português](math_operator/phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Escreve uma operador matemático`:

1. vezes por

### Implementation

The full implementation of this command can be found on this directory under the file [impl.ts](impl.ts)

```typescript
import { Context } from '../../../modules-loader'
import { ParsedPhrase, Editor, WildCard } from '../../d'

async function MathOperator(command: MathOperatorParsedArgs, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "MathOperator"')

    const { mathOperator } = command


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
import { Context } from '../../../modules-loader'
import { ParsedPhrase, Editor, WildCard } from '../../d'

async function MultiWordTokens(command: MultiWordTokensParsedArgs, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "MultiWordTokens"')

    function camelCase(words:

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
4. new line above
5. line above
6. create new line above
7. create line below

#### Português

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
8. crie nova linha abaixo
9. crie linha abaixo

### Implementation

The full implementation of this command can be found on this directory under the file [impl.ts](impl.ts)

```typescript
import { Context } from '../../../modules-loader'
import { ParsedPhrase, Editor, PositionEnum } from '../../d'

async function newLine(command: NewLineParsedArgs, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "new line."')

    return await editor.newLine(command.positio

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

1. número 1

### Implementation

The full implementation of this command can be found on this directory under the file [impl.ts](impl.ts)

```typescript
import { Context } from '../../../modules-loader'
import { ParsedPhrase, Editor, WildCard } from '../../d'

async function WriteNumber(command: WriteNumberParsedArgs, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "WriteNumber"')

    const { number, parent } = command


(...)
```

---

## Remove

Removes the current line or the current selection

### Languages

This command is available in the following languages

#### English

The following automata is responsible for recognizing the command `Remove` in english:

![English](remove_ln_sec/phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Remove`:

1. remove line
2. remove selection

#### Português

O automata seguinte é reponsável por reconhecer o comando `Remover` em português:

![Português](remove_ln_sec/phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Remover`:

1. remova linha
2. remova seleção

### Implementation

The full implementation of this command can be found on this directory under the file [impl.ts](impl.ts)

```typescript
import { Context } from '../../../modules-loader'
import { ParsedPhrase, Editor, WildCard } from '../../d'

async function remove(command: RemoveParsedArgs, editor: Editor, context: Context) {
    console.log('[Spoken]: Executing: "remove line/selection."')

    if (command.isLine) {
        

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
4. repetition statement for every value of [expressions]

#### Português

O automata seguinte é reponsável por reconhecer o comando `Estrutura de repetição` em português:

![Português](repetition/phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Estrutura de repetição`:

1. estrutura repetição
2. estrutura repetição [expressions] até [expressions]
3. estrutura repetição de [expressions] até [expressions] etapa [expressions]
4. estrutura repetição para todo texto de [expressions]

### Implementation

The full implementation of this command can be found on this directory under the file [impl.ts](impl.ts)

```typescript
import { Context } from '../../../modules-loader'
import { ParsedPhrase, Editor, WildCard } from '../../d'

async function Repetition(command: RepetitionParsedArgs, editor: Editor, context: Context) {
    console.log('[Spoken]: Executing: "Repetition."')
    
    const gap = context.templates[

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

1. executar arquivo atual
2. execute este arquivo

### Implementation

The full implementation of this command can be found on this directory under the file [impl.ts](impl.ts)

```typescript
import { Context } from '../../../modules-loader'
import { ParsedPhrase, Editor, WildCard } from '../../d'

async function run(command: RunParsedArgs, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "run."')

    const info = await editor.fileInfo() as { fileName: string }

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

1. select letter K
2. select word value
3. select fourth symbol M
4. select 42ª word value
5. select from letter M to symbol M
6. select from symbol K to first g
7. select from 42ª letter g to letter g
8. select from 1ª letter M to 1ª K
9. select from line 1 to line 1
10. select from line number 42 to 42
11. select word [multi_word_token]
12. select first word [multi_word_token]

#### Português

O automata seguinte é reponsável por reconhecer o comando `Selecionar` em português:

![Português](select/phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Selecionar`:

1. selecionar símbolo z
2. selecione palavra a
3. selecione 1ª símbolo z
4. selecionar último palavra lista
5. selecionar de símbolo a até símbolo A
6. selecione de letra A até 42ª letra a
7. selecionar de sétimo letra B até símbolo z
8. selecionar da primeiro letra B até 42ª letra A
9. selecionar da linha 42 até 42
10. selecionar da linha número 1 até 1
11. selecione palavra [multi_word_token]
12. selecionar primeiro palavra [multi_word_token]

### Implementation

The full implementation of this command can be found on this directory under the file [impl.ts](impl.ts)

```typescript
import { Context } from '../../../modules-loader'
import { ParsedPhrase, Editor, WildCard } from '../../d'

async function Select(command: SelectParsedArgs, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "select"')

    command.word = Array.isArray(command.word) ? command

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

1. text string

#### Português

O automata seguinte é reponsável por reconhecer o comando `Escreve uma string` em português:

![Português](string/phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Escreve uma string`:

1. text string

### Implementation

The full implementation of this command can be found on this directory under the file [impl.ts](impl.ts)

```typescript
import { Context } from '../../../modules-loader'
import { ParsedPhrase, Editor, WildCard } from '../../d'

async function WriteString(command: WriteStringParsedArgs, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "WriteString"')

    command.string = Array.isArray(comman

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

1. declare constant named [multi_word_token]
2. variable named [multi_word_token]
3. new variable called [multi_word_token] equals [expressions]
4. new constant named graph equals [expressions]
5. create variable temp equals [expressions]
6. constant called [multi_word_token] equals [expressions]
7. variable called a equals [expressions]
8. constant temp equals [expressions]
9. create variable named temp
10. declare variable text
11. constant called value
12. variable value

#### Português

O automata seguinte é reponsável por reconhecer o comando `Guarda um valor em uma variável` em português:

![Português](variable_assignment/phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Guarda um valor em uma variável`:

1. declare variável chamada [multi_word_token]
2. variável chamada [multi_word_token]
3. declare constante chamada [multi_word_token] igual [expressions]
4. nova variável chamada temp igual [expressions]
5. crie constante a igual [expressions]
6. variável chamada [multi_word_token] igual [expressions]
7. constante chamada numero igual [expressions]
8. constante a igual [expressions]
9. nova variável chamada texto
10. declare constante numero
11. variável chamada valor
12. variável texto

### Implementation

The full implementation of this command can be found on this directory under the file [impl.ts](impl.ts)

```typescript
import { Context } from '../../../modules-loader'
import { ParsedPhrase, Editor, WildCard } from '../../d'

async function NewVariable(command: NewVariableParsedArgs, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "NewVariable"')

    let { isNew, varName, expression, mem

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

1. reference constant graph
2. reference namespace text
3. variable value
4. namespace graph
5. reference variable called [multi_word_token]
6. reference namespace called [multi_word_token]
7. constant called [multi_word_token]
8. namespace called [multi_word_token]

#### Português

O automata seguinte é reponsável por reconhecer o comando `Referencia a uma variável` em português:

![Português](variable_reference/phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Referencia a uma variável`:

1. refira constante numero
2. refira namespace a
3. variável texto
4. namespace texto
5. referência variável chamada [multi_word_token]
6. referência namespace chamada [multi_word_token]
7. constante chamada [multi_word_token]
8. namespace chamada [multi_word_token]

### Implementation

The full implementation of this command can be found on this directory under the file [impl.ts](impl.ts)

```typescript
import { Context } from '../../../modules-loader'
import { ParsedPhrase, Editor, WildCard } from '../../d'

async function VariableReference(command: VariableReferenceParsedArgs, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "VariableReference"')

    let { varName, pare

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
2. write down
3. write it
4. print space
5. write down space
6. write it space
7. print the universe is cracked who are you
8. write down the universe is cracked who are you
9. write it the universe is cracked the universe is cracked
10. print letter M
11. write letter M
12. write it down letter M
13. print dot
14. write dot
15. write it dot

#### Português

O automata seguinte é reponsável por reconhecer o comando `Escrever texto` em português:

![Português](write/phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Escrever texto`:

1. escreva
2. escreva espaço
3. escreva isto é um teste isto é um teste
4. escreva a letra a
5. escreva ponto

### Implementation

The full implementation of this command can be found on this directory under the file [impl.ts](impl.ts)

```typescript
import { Context } from '../../../modules-loader'
import { ParsedPhrase, Editor } from '../../d'

async function write(command: WriteParsedArgs, editor: Editor, context: Context) {
    console.log('[Spoken]: Executing: "write."')

    let text = null

    if (command.isSpace) text = ' '
   

(...)
```

---