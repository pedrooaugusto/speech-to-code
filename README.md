# Speech To Code <img alt="Toolkit audit status" src="client/icons/icon36x36.png/" />&nbsp;&nbsp;[<img alt="Toolkit audit status" src="https://github.com/pedrooaugusto/speech-to-code/workflows/Node.js CI/badge.svg" style="align:right"/>](https://github.com/pedrooaugusto/speech-to-code/actions)

> Code using your own voice

### Overview

Speech2Code is an application that enables you to code using just voice comands, with Speech2Code instead of using the keyboard to write code in the code editor ~~like a caveman~~ you can just express in natural language what you wish to do and that will be automatically written, as code, in the code editor.

Using Speech2Code instead of using the mouse and keyboard to navigate to line 42 of a file, you can just say: _"line 42"_, _"go to line 42"_ or even _"please go to line 42"_. It's possible to say stuff like:

* _new variable answer equals the string john was the eggman string_
    * ```javascript
        let answer = "john was the eggman"
        ```

* _call function max with arguments variable answer and gap on namespace Math_
    * ```javascript
        Math.max(answer, gap)
        ```

* _select the word gap_
    * ```javascript
        Math.max(answer, |gap|)
        // look for the word 'gap' and select it!
        ```

* _expression number 41 plus number one_
    * ```javascript
        Math.max(answer, 41 + 1)
        // the selection, word 'gap', was replaced
        ```

### Voice Commands

Voice commands are...