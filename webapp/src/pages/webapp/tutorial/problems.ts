const welcome = {
    id: 'welcome',
    title: {
        'pt-BR': 'Olá Mundo',
        'en-US': 'Hello World'
    },
    placeholder: {
        'pt-BR': `Speech2Code é uma aplicação desktop que lhe permite programar usando apenas comandos de voz,
        isso é feito através da emissão de comandos para a sua IDE favorita. Nesta página, um demo da
        aplicação mencionada <u>portada para a web</u>, você pode aprender como usá-la resolvendo
        programas de programação simples na linguagem JavaScript.<br/><br/>
        O primeiro problema é o clássico "Olá mundo" onde você precisa escrever a string "Olá mundo"
        na sáida padrão do sistema.`,

        'en-US': `Speech2Code is a desktop application that enables you to code using just voice commands, 
        it achieves that by connecting to your favorite IDE and issuing commands to it. This page is a demo
        of said application <u>ported to the web</u>, here you can learn how to use this tool by solving simple 
        programming problems using just voice commands.<br/><br/>
        The first problem is the classic "hello world" where you are meant to write "hello world" to
        the standard output.`
    },
    statement: {
        'pt-BR': 'Escreva a string "olá mundo" na sáida padrão do sistema em JavaScript.',
        'en-US': 'Write the string "hello world" to the standard output in JavaScript.'
    },
    solution: {
        'pt-BR': [
            'Clique no microfone para começar a gravação.',
            'Clique na primeira linha do editor de código.',
            'Diga a frase: "vá para a linha 4."',
            'Diga a frase: "execute a função mostrar com um argumento".',
            'Diga a frase: "selecione a palavra gap".',
            'Diga a frase: "texto olá mundo texto".',
            `Diga a frase: "execute o arquivo atual" ou clique no ícone verde acima do editor de código
                para executar o código.`,
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
    },
    code: {
        'pt-BR': `const mostrar = console.log\n\n`,
        'en-US': `const show = console.log\n\n`
    }
}

const avg = {
    id: 'avg',
    title: {
        'pt-BR': 'Média',
        'en-US': 'Mean'
    },
    placeholder: {
        'pt-BR': 'Computar a média de dois números.<br/><br/>É possível dizer "remover linha" para remover a linha atual.',
        'en-US': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    statement: {
        'pt-BR': 'Crie uma função que retorne a média de dois números.',
        'en-US': 'Write a function to compute the average of two numbers.'
    },
    solution: {
        'pt-BR': [
            'Clique no microfone para começar a gravação.',
            'Clique na primeira linha do editor de código.',
            'Diga a frase: "vá para a linha 2."',
            'Diga a frase: "nova função média com 2 argumentos retornando gap".',
            'Diga a frase: "linha 2".',
            'Diga a frase: "selecione a palavra gap".',
            'Diga a frase: "variável b".',
            'Diga a frase: "selecione a palavra gap".',
            'Diga a frase: "variável c".',
            'Diga a frase: "linha 3".',
            'Diga a frase: "nova linha".',
            'Diga a frase: "nova constante soma igual a gap".',
            'Diga a frase: "expressão variável b mais variável c".',
            'Diga a frase: "linha 4".',
            'Diga a frase: "selecione a palavra gap".',
            'Diga a frase: "expressão variável soma dividido por número 2".',
            'Diga a frase: "execute o arquivo atual".',
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
    },
    code: {
        'pt-BR': `\n\nconsole.log(média(23, 7))`,
        'en-US': `const show = console.log\n\n`
    }
}

const perfectSquare = {
    id: 'perfectSquare',
    title: {
        'pt-BR': 'Quadrado Perfeito',
        'en-US': 'Perfect Square'
    },
    placeholder: {
        'pt-BR': 'Teste se um número é um quadrado perfeito.<br/><br/>É possível dizer "escreva ..." para escrever qualquer coisa na linha atual.',
        'en-US': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    statement: {
        'pt-BR': `Crie uma função para checar se um número é um quadrado perfeito. Escreva na tela 
        'quadrado perfeito' em caso positivo e 'quadrado imperfeito' em caso negativo.`,
        'en-US': 'Write a function to compute the average of two numbers.'
    },
    solution: {
        'pt-BR': [
            'Clique no microfone para começar a gravação.',
            'Clique na primeira linha do editor de código.',
            'Diga a frase: "vá para a linha 2."',
            'Diga a frase: "nova função quadrado com um argumento".',
            'Diga a frase: "linha 2".',
            'Diga a frase: "selecione a palavra gap".',
            'Diga a frase: "variável número".',
            'Diga a frase: "linha 3".',
            'Diga a frase: "variável número igual gap".',
            'Diga a frase: "mude a linguagem para inglês".',
            '<i>A partir de agora os comandos de voz serão ditos em inglês.</i>',
            'Say the phrase: "select the word gap".',
            'Say the phrase: "call function gap on reference namespace Math with one argument".',
            'Say the phrase: "select the word gap".',
            'Say the phrase: "write SQRT". <i>Just say the letters, you can try multiple times</i>.',
            'Say the phrase: "switch back language back to portuguese".',
            '<i>A partir de agora os comandos de voz serão ditos em português.</i>',
            'Diga a frase: "selecione a palavra gap".',
            'Diga a frase: "variável número"',
            'Diga a frase: "nova linha"',
            'Diga a frase: "estrutura condicional se senão expressão gap igual a número 0".',
            'Diga a frase: "selecione a palavra gap".',
            'Diga a frase: "expressão variável número módulo número 1".',
            'Diga a frase: "linha 5".',
            'Diga a frase: "execute a função mostrar com o argumento texto quadrado perfeito texto".',
            'Diga a frase: "linha 7".',
            'Diga a frase: "execute a função mostrar com o argumento texto quadrado imperfeito texto".',
            'Diga a frase: "execute o arquivo atual".',
            '<i>Valide a saída do programa.</i>',
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
    },
    code: {
        'pt-BR': '\n\nquadradoPerfeito(4)\nquadradoPerfeito(13)',
        'en-US': ''
    }
}

const multiplesOfSevenAndSix = {
    id: 'multipleSevenSix',
    title: {
        'pt-BR': 'Multiples of 6 or 7',
        'en-US': 'Perfect Square'
    },
    placeholder: {
        'pt-BR': 'Use um <i>for loop</i> para listar múltiplos de 6 ou 7.<br/><br/>É possível dizer "selecione da linha 3 até a linha 6" para selecionar o intervalo entre estas linhas.',
        'en-US': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    statement: {
        'pt-BR': `Escreva na tela todos os múltiplos dos números 6 ou 7 no intervalo 0..256`,
        'en-US': 'Write a function to compute the average of two numbers.'
    },
    solution: {
        'pt-BR': [
            'Clique no microfone para começar a gravação.',
            'Clique na segunda linha do editor de código.',
            'Diga a frase: "vá para a linha 2."',
            'Diga a frase: "nova função média com 2 argumentos retornando gap".',
            'Diga a frase: "linha 3".',
            'Diga a frase: "selecione a palavra gap".',
            'Diga a frase: "variável b".',
            'Diga a frase: "selecione a palavra gap".',
            'Diga a frase: "variável c".',
            'Diga a frase: "linha 4".',
            'Diga a frase: "nova linha".',
            'Diga a frase: "nova constante soma igual a gap".',
            'Diga a frase: "selecione a palavra gap".',
            'Diga a frase: "expressão variável b mais variável c".',
            'Diga a frase: "linha 5".',
            'Diga a frase: "selecione a palavra gap".',
            'Diga a frase: "expressão variável soma dividido por número 2".',
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

const happyNumber = {
    id: 'happyNumber',
    title: {
        'pt-BR': 'Happy Number',
        'en-US': 'Perfect Square'
    },
    placeholder: {
        'pt-BR': 'Teste se um número qualquer <i>N</i> é um Número Feliz.<br/><br/>É possível dizer "troque a linguagem para inglês" para mudar o idioma de entrada para inglês.',
        'en-US': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    statement: {
        'pt-BR': `Complete a função para determinar se um número natural qualquer é um quadrado perfeito.`,
        'en-US': 'Write a function to compute the average of two numbers.'
    },
    solution: {
        'pt-BR': [
            'Clique no microfone para começar a gravação.',
            'Clique na segunda linha do editor de código.',
            'Diga a frase: "vá para a linha 2."',
            'Diga a frase: "nova função média com 2 argumentos retornando gap".',
            'Diga a frase: "linha 3".',
            'Diga a frase: "selecione a palavra gap".',
            'Diga a frase: "variável b".',
            'Diga a frase: "selecione a palavra gap".',
            'Diga a frase: "variável c".',
            'Diga a frase: "linha 4".',
            'Diga a frase: "nova linha".',
            'Diga a frase: "nova constante soma igual a gap".',
            'Diga a frase: "selecione a palavra gap".',
            'Diga a frase: "expressão variável b mais variável c".',
            'Diga a frase: "linha 5".',
            'Diga a frase: "selecione a palavra gap".',
            'Diga a frase: "expressão variável soma dividido por número 2".',
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
export default [welcome, avg, perfectSquare, multiplesOfSevenAndSix, happyNumber]