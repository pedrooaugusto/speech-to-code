## Change line

Moves the cursor to a different line

### Languages

This command is available in the following languages

**English**

The following automata is responsible for recognizing the command `Change line` in english:

![English](phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Change line`:

1. go to line 42
2. go to line number 1
3. go line 1
4. go line number 42
5. line 42
6. line number 42

**Português**

O automata seguinte é reponsável por reconhecer o comando `Trocar linha` em português:

![Português](phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Trocar linha`:

1. vá para linha 1
2. vá para linha número 42
3. vá para a linha 1
4. vá para a linha número 42
5. vai linha 42
6. vai linha número 42
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

export default goToLi

(...)
```