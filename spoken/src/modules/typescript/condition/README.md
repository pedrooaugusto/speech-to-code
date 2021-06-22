## Creates a if/else statement

Creates a if/else statement with the provided expression as condition

### Languages

This command is available in the following languages

####English

The following automata is responsible for recognizing the command `Creates a if/else statement` in english:

![English](phrase_en-US.png)

The following are some examples of phrases, in english, used to trigger the command `Creates a if/else statement`:

1. conditional statement
2. conditional statement if else
3. conditional statement if else [expressions]
4. conditional statement if [expressions]
5. conditional statement [expressions]

####Português

O automata seguinte é reponsável por reconhecer o comando `Estrutura condicional` em português:

![Português](phrase_pt-BR.png)

Os seguintes exemplos de frases, em português, podem ser usadas para ativar o comando `Estrutura condicional`:

1. estrutura condicional
2. estrutura condicional se
3. estrutura condicional se senão
4. estrutura condicional se se não
5. estrutura condicional se senão [expressions]
6. estrutura condicional se se não [expressions]
7. estrutura condicional se [expressions]
8. estrutura condicional [expressions]

### Implementation

The full implementation of this command can be found on this directory under the file [impl.ts](impl.ts)

```typescript
async function Condition(command: ConditionParsedArgs, editor: Editor, context: Context) {
    console.log('[Spoken]: Executing: "Condition."')
    
    const anything = context.templates['@anything'].examples[command?.extra?.lang as string][0]
    
    let { condition = anything, otherwise = f

(...)
```