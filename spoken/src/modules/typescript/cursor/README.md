## Move cursor

Moves the cursor to a line or token

**Phrases:**

* English
	![English](phrase_en-US.png)
* Português
	![Português](phrase_pt-BR.png)


**Implementation:**

```typescript
async function cursor(args: CursorParsedArgs, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "cursor."')

    if (args.linePosition != null) {
        const pos = args.linePosition === LinePostionEnum.BEGIN ? 'BEGIN_LINE' : 'END_LINE'
        return await editor.moveCursor
(...) see more
```