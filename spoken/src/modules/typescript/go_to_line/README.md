## Go to line

Moves the cursor to a different line

**Phrases:**

* English
	![English](phrase_en-US.png)
* Português
	![Português](phrase_pt-BR.png)


**Implementation:**

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
(...) see more
```