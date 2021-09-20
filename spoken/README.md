## Spoken

This module is capable of parsing english and portuguese phrases using a stack automata based mechanism. The phrases are parsed to commands, that can be executed later.

The diagram below illustrates how this module works:

![alt text](./diagram.png)


### How to use it

You can learn how to use this module with the tests under [./src/__tests__](./src/__tests__).

The basic usage is as follows:

```javascript
import Spoken from 'spoken'

// command 'variableAssigment'
const result = Spoken.recognizePhrase('new constant doctorWho equals number 42', 'en-US')

// true
_.isEqal(result, {
    comand: 'variableAssigment',
    args: {
        memType: 0, // 0 == 'const', 1 == 'let'
        varName: 'doctorWho',
        value: {
            command: 'number',
            args: { value: 42 },
            impl: "function(args, editor, common) {...}"
        }
    },
    impl: "function(args, editor, common){
        // something like: <args.memType> <args.varName> = <args.value>
        ...
    }"
})

```

### How to add new commands

A command is a folder with 2 archives: `impl.ts` (what will happen when this command gets executed) and a `phrase_en-US.dot` (an automata responsible for recognizing english phrases that will trigger this command).

An example of a simple command can be found in: [./src/modules/typescript/write](./src/modules/typescript/write)

You can view a visual representation of `.dot` files using VSCode extension named [Graphviz Preview](https://marketplace.visualstudio.com/items?itemName=tintinweb.graphviz-interactive-preview)

The `README.md` of each command is generated automatically along with its png image representation with the command: `npm run build-docs`.


### Useful Scripts

1. `npm run build` to create a file called `grammar.json`. Every time a command is edited, removed or added this should be done otherwise the changes will have to effect.

2. `npm run test` to run all the tests.

3. `npm run build-docs` to build the documentation of each command, the documentation is built using the `.dot` files. It also generates a png representations of the automato.

