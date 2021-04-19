## Stores a value in a variable

Stores a number, string etc in a variable

### Languages

This command is available in the following languages

**English**

The following automata is responsible for recognizing the command `Stores a value in a variable` in english:

![English](phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Stores a value in a variable`:

1. put result [string] variable value
2. put result [string] variable called text
3. put value [string] new constant number
4. put value [string] new constant called value
5. value [number] variable text
6. result [number] variable called text
7. value [number] new constant value
8. value [number] new variable called number

**Português**

O automata seguinte é reponsável por reconhecer o comando `Guarda um valor em uma variável` em português:

![Português](phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Guarda um valor em uma variável`:

1. ponha resultado [number] constante temp
2. guarde resultado [string] constante chamada texto
3. guarde valor [string] nova constante a
4. guarde valor [number] nova variável chamada a
5. valor [string] constante temp
6. valor [string] variável chamada lista
7. resultado [number] nova constante valor
8. resultado [string] nova variável chamada a

### Implementation

The full implementation of this command can be found on this directory under the file [impl.ts](impl.ts)

```typescript
async function NewVariable(command: NewVariableParsedArgs, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "NewVariable"')

    return await editor.write(command.expression)
}

type NewVariableParsedArgs = {
    expression: string
} & ParsedPhrase

// @ts-ignore
retur

(...)
```