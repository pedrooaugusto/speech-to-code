const welcome = {
    id: 'welcome',
    title: {
        'pt-BR': 'Olá Mundo',
        'en-US': 'Hello World'
    },
    placeholder: {
        'pt-BR': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        'en-US': `Speech2Code is a desktop application that enables you to code using just voice commands, 
        it achieves that by connecting to your favorite IDE and issuing commands to it. This page is a demo
        of said application <u>ported to the web</u>, here you can learn how to use this tool by solving simple 
        programming problems using just voice commands.<br/><br/>
        The first problem is the classic "hello world" problem where you are meant to write "hello world" to
        the standard output.`
    },
    statement: {
        'pt-BR': 'Escreva a string "olá mundo" na sáida padrão do sistema em JavaScript.',
        'en-US': 'Write the string "hello world" to the standard output in JavaScript.'
    },
    solution: {
        'pt-BR': [
            'Clique no microfone para começar a gravação.',
            'Clique na segunda linha do editor de código.',
            'Diga a frase: "vá para a linha 2."',
            'Diga a frase: "execute a função log na variável gap com um argumento".',
            'Diga a frase: "selecione a palavra gap".',
            'Diga a frase: "variável gap".',
            'Diga a frase: "selecione a palavra gap".',
            'Diga a frase: "texto olá mundo texto".',
            'Fim.'
        ],
        'en-US': [
            'Click on the microphone to start recording.',
            'Click on the first line of the code editor.',
            'Say the phrase: "go to line number 2."',
            'Say the phrase: "call function log on gap with one argument".',
            'Say the phrase: "select the word gap".',
            'Say the phrase: "variable console".',
            'Say the phrase: "select the word gap".',
            'Say the phrase: "string hello world string".',
            'Done.'
        ]
    }
}

const isOdd = {
    id: 'isOdd',
    title: {
        'pt-BR': 'É Par',
        'en-US': 'Is Odd'
    },
    placeholder: {
        'pt-BR': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        'en-US': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    statement: {
        'pt-BR': 'Escreva na saída padrão "número par" caso a variável _bola_ seja par do contrário escreva "número impar".',
        'en-US': 'Check the number on variable ball and write to the standard output "even number" if the number is even otherwise write "odd number".'
    },
    solution: {
        'pt-BR': [
            'Clique no microfone para começar a gravação.',
            'Clique na segunda linha do editor de código.',
            'Diga a frase: "vá para a linha 2."',
            'Diga a frase: "execute a função log na variável gap com um argumento".',
            'Diga a frase: "selecione a palavra gap".',
            'Diga a frase: "variável gap".',
            'Diga a frase: "selecione a palavra gap".',
            'Diga a frase: "texto olá mundo texto".',
            'Fim.'
        ],
        'en-US': [
            'Click on the microphone to start recording.',
            'Click on the first line of the code editor.',
            'Say the phrase: "go to line number 2."',
            'Say the phrase: "call function log on gap with one argument".',
            'Say the phrase: "select the word gap".',
            'Say the phrase: "variable console".',
            'Say the phrase: "select the word gap".',
            'Say the phrase: "string hello world string".',
            'Done.'
        ]
    }
}


// eslint-disable-next-line import/no-anonymous-default-export
export default [welcome, isOdd]