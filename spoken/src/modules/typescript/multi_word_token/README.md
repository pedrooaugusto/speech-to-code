## Group multiple words together

Group multiple words together in one variable meant to be used as alias in other commands

### Languages

This command is available in the following languages

**English**

The following automata is responsible for recognizing the command `Group multiple words together` in english:

![English](phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Group multiple words together`:

1. * *

**Português**

O automata seguinte é reponsável por reconhecer o comando `Agrupa múltiplas palavras` em português:

![Português](phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Agrupa múltiplas palavras`:

1. * *

### Implementation

The full implementation of this command can be found on this directory under the file [impl.ts](impl.ts)

```typescript
async function MultiWordTokens(command: MultiWordTokensParsedArgs, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "MultiWordTokens"')

    return command.words.split(' ')
}

type MultiWordTokensParsedArgs = {
    words: string
} & ParsedPhrase

// @ts-ignore
return M

(...)
```