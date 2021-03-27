## New variable or constant

Declares a new constant or variable in the current line

**Phrases:**

* English
	![English](phrase_en-US.png)
* Portugês
	![Portugês](phrase_pt-BR.png)


**Implementation:**

```typescript
async function DeclareVariable(command: ParsedDeclareVariable, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "Declare a variable."')

    const memType = command.memType === MemType.constant ? 'const ' : 'let '
    const type = command.type ? `:${command.type}` : ''
    c
(...) see more
```