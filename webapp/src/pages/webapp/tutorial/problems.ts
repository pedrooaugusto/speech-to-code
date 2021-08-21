export interface Problem {
    id: string;
    index?: number;
    title: {
        'pt-BR': string;
        'en-US': string;
    };
    placeholder: {
        'pt-BR': string;
        'en-US': string;
    };
    statement: {
        'pt-BR': string;
        'en-US': string;
    };
    solution: {
        'pt-BR': string[];
        'en-US': string[];
    };
    code: {
        'pt-BR': string;
        'en-US': string;
    };
}

const welcome: Problem = {
    id: 'welcome',
    title: {
        'pt-BR': 'Olá Mundo',
        'en-US': 'Hello World'
    },
    placeholder: {
        'pt-BR': `Speech2Code é uma aplicação desktop que lhe permite programar usando apenas comandos de voz, 
        ela funciona manipulando IDE's e editores do código com base na análise de comandos de voz recebidos como entrada.<br/>
        Nesta página, um demo da aplicação mencionada <u>portada para a web</u>, você pode aprender como usá-la resolvendo
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

const avg: Problem = {
    id: 'avg',
    title: {
        'pt-BR': 'Média',
        'en-US': 'Mean'
    },
    placeholder: {
        'pt-BR': 'Computar a média entre dois números.<br/><br/>É possível dizer "remover linha" para remover a linha atual.',
        'en-US': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    statement: {
        'pt-BR': 'Crie uma função que retorne a média de entre dois números.',
        'en-US': 'Write a function to compute the average of two numbers.'
    },
    solution: {
        'pt-BR': [
            'Clique no microfone para começar a gravação.',
            'Clique na primeira linha do editor de código.',
            'Diga a frase: "vá para a linha 2."',
            'Diga a frase: "nova função média com 2 argumentos retornando gap".',
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

const perfectSquare: Problem = {
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
            'Diga a frase: "variável número".',
            'Diga a frase: "linha 3".',
            'Diga a frase: "variável número igual gap".',
            'Diga a frase: "mude a linguagem para inglês".',
            '<i>A partir de agora os comandos de voz serão ditos em inglês.</i>',
            'Say the phrase: "select the word gap".',
            'Say the phrase: "call function gap on namespace math with one argument".',
            'Say the phrase: "write SQRT".<br/><i>Just say the letters, you can try multiple times</i>.',
            'Say the phrase: "switch back language back to portuguese".',
            '<i>A partir de agora os comandos de voz serão ditos em português.</i>',
            'Diga a frase: "selecione a palavra gap".',
            'Diga a frase: "variável número".',
            'Diga a frase: "ponteiro final da linha".',
            'Diga a frase: "nova linha".',
            'Diga a frase: "estrutura condicional se senão expressão gap igual ao número 0".',
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
        'pt-BR': '\n\nvar mostrar = console.log\nquadrado(4)\nquadrado(13)',
        'en-US': ''
    }
}

const multiplesOfSevenAndSix: Problem = {
    id: 'multipleSevenSix',
    title: {
        'pt-BR': 'Múltiplos de 6 ou 7',
        'en-US': 'Perfect Square'
    },
    placeholder: {
        'pt-BR': `Use um <i>for loop</i> para listar múltiplos de 6 ou 7.<br/><br/>
            É possível dizer "selecione da linha 3 até a linha 6" para selecionar o intervalo entre estas linhas ou ainda
            "selecione da letra A até a letra T" para selecionar o texto entre essas letras na linha atual.`,
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
            'Diga a frase: "vá para a linha 4".',
            'Diga a frase: "estrutura de repetição do número 0 até o número 256".',
            'Diga a frase: "linha 5".',
            'Diga a frase: "estrutura condicional expressão gap ou gap".',
            'Diga a frase: "expressão gap módulo número 6 igual ao número 0".',
            'Diga a frase: "variável i".',
            'Diga a frase: "selecione a palavra gap".',
            'Diga a frase: "expressão gap módulo número 7 igual ao número 0".',
            'Diga a frase: "variável i".',
            'Diga a frase: "linha 6".',
            'Diga a frase: "execute a função mostrar com o argumento variável i".',
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
        'pt-BR': 'var mostrar = console.log\n\n',
        'en-US': ''
    }
}

const happyNumber: Problem = {
    id: 'happyNumber',
    title: {
        'pt-BR': 'Número Feliz',
        'en-US': 'Perfect Square'
    },
    placeholder: {
        'pt-BR': `Teste se um número qualquer <i>N</i> é um <a target="_blank" href="https://pt.wikipedia.org/wiki/N%C3%BAmero_feliz">Número Feliz</a>.<br/><br/>
            É possível dizer "troque a linguagem para inglês" para mudar o idioma de entrada para inglês.`,
        'en-US': 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    },
    statement: {
        'pt-BR': `Complete a função para determinar se um número natural qualquer é um
            <a target="_blank" href="https://pt.wikipedia.org/wiki/N%C3%BAmero_feliz">número feliz</a>.`,
        'en-US': 'Write a function to compute the average of two numbers.'
    },
    solution: {
        'pt-BR': [
            'Clique no microfone para começar a gravação.',
            'Clique na segunda linha do editor de código.',
            'Diga a frase: "vá para a linha 2."',
            'Diga a frase: "nova função média com 2 argumentos retornando gap".',
            'Diga a frase: "linha 5".',
            'Diga a frase: "nova linha".',
            'Diga a frase: "estrutura condicional expressão gap igual a número 1".',
            'Diga a frase: "variável valor".',
            'Diga a frase: "linha 6".',
            'Diga a frase: "retorne verdadeiro".',
            'Diga a frase: "linha 7".',
            'Diga a frase: "nova linha".',
            'Diga a frase: "estrutura condicional".',
            'Diga a frase: "execute a função gap na variável visitados com o argumento variável valor".',
            'Diga a frase: "linha 9".',
            'Diga a frase: "retorne falso".',
            'Diga a frase: "linha 10".',
            'Diga a frase: "nova linha".',
            'Diga a frase: "execute a função gap na variável visitados com o argumento variável valor".',
            'Diga a frase: "linha 12".',
            'Diga a frase: "nova linha".',
            'Diga a frase: "nova variável soma igual a número 0".',
            'Diga a frase: "nova linha".',
            'Diga a frase: "estrutura de repetição para todo item em gap".',
            'Diga a frase: "expressão variável valor mais texto texto".',
            'Diga a frase: "linha 14".',
            'Diga a frase: "variável soma igual a expressão variável soma mais gap vezes gap".',
            'Diga a frase: "selecione a palavra gap".',
            'Diga a frase: "variável item".',
            'Diga a frase: "selecione a palavra gap".',
            'Diga a frase: "variável item".',
            'Diga a frase: "linha 16".',
            'Diga a frase: "selecione a palavra gap".',
            'Diga a frase: "execute a função feliz com os argumentos variável soma e variável visitados".',
            'Diga a frase: "mude a linguagem para inglês".',
            '<i>A partir de agora os comandos de voz serão ditos em inglês.</i>',

            'Say the phrase: "please go to line 8".',
            'Say the phrase: "select the word gap".',
            'Say the phrase: "print has".',

            'Say the phrase: "please go to line 11".',
            'Say the phrase: "select the word gap".',
            'Say the phrase: "print add".',

            'Say the phrase: "run current file".',
            '<i>Validate the system output.</i>',

            'End.'
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
        'pt-BR':
            'var mostrar = console.log\n\n' +
            'function feliz(valor, visitados) {\n' +
            '    return gap\n' +
            '}\n' +
            '\n' +
            'mostrar(23, feliz(23, new Set()))\n' +
            'mostrar(4, feliz(4, new Set()))\n' +
            'mostrar(440, feliz(440, new Set()))\n' +
            'mostrar(3, feliz(3, new Set()))\n',
        'en-US': ''
    }
}


const problems = [welcome, avg, perfectSquare, multiplesOfSevenAndSix, happyNumber]

export default problems

export const concretize = (index: number, lang: 'pt-BR' | 'en-US') => ({
    get id() { return problems[index].id },
    get index() { return index },
    get title() { return problems[index].title[lang] },
    get placeholder() { return problems[index].placeholder[lang] },
    get statement() { return problems[index].statement[lang] },
    get solution() { return problems[index].solution[lang] },
    get code() { return problems[index]?.code?.[lang] ||'' },
})
