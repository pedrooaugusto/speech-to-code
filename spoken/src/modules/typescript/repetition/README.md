## Creates a for loop statement

Creates a for loop statement with the provided expressions as parameters

### Languages

This command is available in the following languages

#### English

The following automata is responsible for recognizing the command `Creates a for loop statement` in english:

![English](phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Creates a for loop statement`:

1. repetition statement
2. repetition statement from [expressions] to [expressions]
3. repetition statement from [expressions] to [expressions] step [expressions]
4. repetition statement for every text of [expressions]

#### Português

O automata seguinte é reponsável por reconhecer o comando `Estrutura de repetição` em português:

![Português](phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Estrutura de repetição`:

1. estrutura repetição
2. estrutura repetição do [expressions] até [expressions]
3. estrutura repetição [expressions] até [expressions] etapa [expressions]
4. estrutura repetição para todo numero de [expressions]

### Implementation

The full implementation of this command can be found on this directory under the file [impl.ts](impl.ts)

```typescript
async function Repetition(command: RepetitionParsedArgs, editor: Editor, context: Context) {
    console.log('[Spoken]: Executing: "Repetition."')
    
    const gap = context.templates['@anything'].examples[command?.extra?.lang as string][0]

    let text = `for(${gap}; ${gap}; ${gap}) {\n\n}`

(...)
```