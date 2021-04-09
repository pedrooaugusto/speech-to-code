## Create a new line

Creates a new line above or bellow the current line

**Phrases:**

* English
	![English](phrase_en-US.png)
* Português
	![Português](phrase_pt-BR.png)


**Implementation:**

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
(...) see more
```