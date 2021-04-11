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

The following are examples of phrases, in english, used to trigger the command `Move cursor`:

1. (cursor) (line) ({numeral})
2. (cursor) (symbol) ({term})
3. (cursor) (begin, end) (line)
4. (cursor) (next) (symbol)

**Português**

O automata seguinte é reponsável por reconhecer o comando `Move cursor` em português:

![Português](cursor/phrase_pt-BR.png)

As seguintes frases, em português, podem ser usadas para ativar o comando `Move cursor`:

1. (cursor, ponteiro) (linha) ({numeral})
2. (cursor, ponteiro) (símbolo, letra) ({term})
3. (cursor, ponteiro) (começo, final) (linha)
4. (cursor, ponteiro) (próximo) (símbolo, letra)

### Implementation

Full implementation of this command can be found on this repository under the file [impl.ts](impl.ts)

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

The following are examples of phrases, in english, used to trigger the command `New constant or variable`:

1. (declare, create)  (constant, variable)  (called)  ({term})
2. (declare, create)  (constant, variable)  (called)  ({term})  (equals)  ({term})
3. (declare, create)  (constant, variable)  (called)  ({term})  (of, λ)  (type)  ({term})

**Portugês**

O automata seguinte é reponsável por reconhecer o comando `New constant or variable` em português:

![Portugês](declare_variable/phrase_pt-BR.png)

As seguintes frases, em português, podem ser usadas para ativar o comando `New constant or variable`:

1. (declare, crie)  (constante, variável)  (chamada)  ({term})
2. (declare, crie)  (constante, variável)  (chamada)  ({term})  (valor)  ({term})
3. (declare, crie)  (constante, variável)  (chamada)  ({term})  (tipo)  ({term})

### Implementation

Full implementation of this command can be found on this repository under the file [impl.ts](impl.ts)

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

The following are examples of phrases, in english, used to trigger the command `Change line`:

1. (line) ({numeral})

**Português**

O automata seguinte é reponsável por reconhecer o comando `Change line` em português:

![Português](go_to_line/phrase_pt-BR.png)

As seguintes frases, em português, podem ser usadas para ativar o comando `Change line`:

1. (linha) ({numeral})

### Implementation

Full implementation of this command can be found on this repository under the file [impl.ts](impl.ts)

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

The following are examples of phrases, in english, used to trigger the command `New line`:

1. (create) (line)
2. (line) (above, below)

**Português**

O automata seguinte é reponsável por reconhecer o comando `New line` em português:

![Português](new_line/phrase_pt-BR.png)

As seguintes frases, em português, podem ser usadas para ativar o comando `New line`:

1. (crie) (linha)
2. (linha) (acima, abaixo)

### Implementation

Full implementation of this command can be found on this repository under the file [impl.ts](impl.ts)

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

The following are examples of phrases, in english, used to trigger the command `Write text`:

1. (write)

**Português**

O automata seguinte é reponsável por reconhecer o comando `Write text` em português:

![Português](write/phrase_pt-BR.png)

As seguintes frases, em português, podem ser usadas para ativar o comando `Write text`:

1. (escreva)

### Implementation

Full implementation of this command can be found on this repository under the file [impl.ts](impl.ts)

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