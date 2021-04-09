## Writes some text

Just writes something the text edtiro

**Phrases:**

* English
	![English](phrase_en-US.png)
* Português
	![Português](phrase_pt-BR.png)


**Implementation:**

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
(...) see more
```