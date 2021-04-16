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

1. pointer line 1
2. cursor symbol value
3. pointer first symbol text
4. pointer begin line
5. pointer next symbol
6. pointer next 1 symbol

**Português**

O automata seguinte é reponsável por reconhecer o comando `Mover o cursor` em português:

![Português](cursor/phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Mover o cursor`:

1. ponteiro linha 42
2. ponteiro símbolo lista
3. cursor 42ª símbolo texto
4. cursor final linha
5. cursor próximo letra
6. cursor próximo 42 símbolo

### Implementation

The full implementation of this command can be found on this directory under the file [impl.ts](impl.ts)

```typescript
async function cursor(args: CursorParsedArgs, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "cursor."')

    if (args.linePosition != null) {
        const pos = args.linePosition === LinePostionEnum.BEGIN ? 'BEGIN_LINE' : 'END_LINE'
        return await editor.moveCursor

(...)
```

---

## New constant or variable

Declares a new constant or variable in the current line

### Languages

This command is available in the following languages

**English**

The following automata is responsible for recognizing the command `New constant or variable` in english:

![English](declare_variable/phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `New constant or variable`:

1. create constant called temp
2. create variable called value with value temp
3. declare constant called graph equals text
4. declare variable called temp of type text with value value
5. declare variable called text type text equals graph
6. declare constant called temp type text

**Portugês**

O automata seguinte é reponsável por reconhecer o comando `Nova constante ou variável` em português:

![Portugês](declare_variable/phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Nova constante ou variável`:

1. declare uma variável chamada temp
2. crie variável chamada lista
3. crie uma variável chamada numero com o valor numero
4. declare uma variável chamada valor com valor valor
5. crie uma constante chamada numero o valor lista
6. crie uma constante chamada valor valor valor
7. crie uma variável chamada numero do tipo lista com o valor lista
8. declare uma variável chamada lista do tipo valor com valor valor
9. declare uma constante chamada valor do tipo texto o valor numero
10. crie uma constante chamada numero do tipo valor valor temp
11. crie uma constante chamada temp do tipo lista igual a valor
12. declare uma variável chamada numero do tipo texto igual temp
13. declare uma constante chamada texto tipo lista com o valor texto
14. declare uma constante chamada lista tipo texto com valor valor
15. crie uma variável chamada numero tipo numero o valor numero
16. crie uma variável chamada lista tipo texto valor valor

### Implementation

The full implementation of this command can be found on this directory under the file [impl.ts](impl.ts)

```typescript
async function DeclareVariable(command: ParsedDeclareVariable, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "Declare a variable."')

    const memType = command.memType === MemType.constant ? 'const ' : 'let '
    const type = command.type ? `:${command.type}` : ''
    c

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
2. go line 1
3. line 42

**Português**

O automata seguinte é reponsável por reconhecer o comando `Trocar linha` em português:

![Português](go_to_line/phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Trocar linha`:

1. vá para linha 42
2. vai para a linha 1
3. vai linha 42
4. linha 42

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
5. nova linha acima
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

## Write text

Write some text in the editor

### Languages

This command is available in the following languages

**English**

The following automata is responsible for recognizing the command `Write text` in english:

![English](write/phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Write text`:

1. print the universe is cracked
2. write down the universe is cracked
3. write it down who are you

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

    return await editor.write(command.text)
}

type WriteParsedArgs = {
    text: string
} & ParsedPhrase

// @ts-ignore
return write

(...)
```

---