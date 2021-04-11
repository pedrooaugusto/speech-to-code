## Change line

Moves the cursor to a different line

### Languages

This command is available in the following languages

**English**

The following automata is responsible for recognizing the command `Change line` in english:

![English](phrase_en-US.png)

The following are examples of phrases, in english, used to trigger the command `Change line`:

1. (line) ({numeral})

**Português**

O automata seguinte é reponsável por reconhecer o comando `Change line` em português:

![Português](phrase_pt-BR.png)

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