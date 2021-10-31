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
        programming problems using just voice commands. <b>You may change the input language to pt-BR.</b> <br/><br/>
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
            '<i>Valide a saída do programa no seção abaixo do editor de código.</i>',
            'Fim.'
        ],
        'en-US': [
            'Click on the microphone to start recording.',
            'Click on the first line of the code editor.',
            'Say the phrase: "go to line number 4."',
            'Say the phrase: "execute function print with one argument".',
            'Say the phrase: "text hello world text".',
            `Say the phrase: "please the run current file" or click on the green icon above the code editor.`,
            '<i>Check the program output in the section below the code editor.</i>',
            'Done.'
        ]
    },
    code: {
        'pt-BR': `const mostrar = console.log\n\n`,
        'en-US': `const print = console.log\n\n`
    }
}

const avg: Problem = {
    id: 'avg',
    title: {
        'pt-BR': 'Média',
        'en-US': 'Mean'
    },
    placeholder: {
        'pt-BR': `Computar a média entre dois números.<br/><br/>
            <i class="fa fa-info-circle"></i> É possível dizer "remover linha" para remover a linha atual.<br/>
            <i class="fa fa-info-circle"></i> Diga "desfaça isso" ou "refaça isso" para desfazer e refazer o último comando.`,
        'en-US': `Calculate the mean between two numbers.<br/><br/>
            <i class="fa fa-info-circle"></i> It's possible to say "remove line" to remove the current line.<br/>
            <i class="fa fa-info-circle"></i> Say "undo that" or "redo that" to undo or redo the last command.`
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
            'Diga a frase: "criar linha".',
            'Diga a frase: "linha 3"',
            'Diga a frase: "nova constante soma igual a gap".',
            'Diga a frase: "expressão variável b mais variável c".',
            'Diga a frase: "linha 4".',
            'Diga a frase: "selecione a palavra gap".',
            'Diga a frase: "expressão variável soma dividido por número 2".',
            'Diga a frase: "execute o arquivo atual".',
            '<i>Valide a saída do programa.</i>',
            'Fim.'
        ],
        'en-US': [
            'Click on the microphone to start recording.',
            'Click on the first line of the code editor.',
            'Say the phrase: "go to line number 2."',
            'Say the phrase: "new function mean with 2 arguments returning gap".',
            'Say the phrase: "variable b".',
            'Say the phrase: "select the word gap".',
            'Say the phrase: "variable c".',
            'Say the phrase: "line 3".',
            'Say the phrase: "please create a line".',
            'Say the phrase: "line 3".',
            'Say the phrase: "new constant sum equals gap".',
            'Say the phrase: "expression variable b plus variable c".',
            'Say the phrase: "line 4".',
            'Say the phrase: "select the word gap".',
            'Say the phrase: "expression variable sum divided by number 2".',
            `Say the phrase: "run current file" or click on the green icon above the code editor.`,
            '<i>Check the program output in the section below the code editor.</i>',
            'Done.'
        ]
    },
    code: {
        'pt-BR': `\n\nconsole.log(média(23, 7))`,
        'en-US': `\n\nconsole.log(mean(23, 7))`
    }
}

const perfectSquare: Problem = {
    id: 'perfectSquare',
    title: {
        'pt-BR': 'Quadrado Perfeito',
        'en-US': 'Perfect Square'
    },
    placeholder: {
        'pt-BR': 'Teste se um número é um quadrado perfeito.<br/><br/><i class="fa fa-info-circle"></i> É possível dizer "escreva ..." para escrever qualquer coisa na linha atual.',
        'en-US': 'Test if a number is a perfect square.<br/><br/><i class="fa fa-info-circle"></i> It\'s possible to say "write ..." to write anything in the current line.'
    },
    statement: {
        'pt-BR': `Crie uma função para checar se um número é um quadrado perfeito. Escreva na tela
            'quadrado perfeito' em caso positivo e 'quadrado imperfeito' em caso negativo.`,
        'en-US': `Write a function to check if a given number is a perfect square.
            Write to the standard output <i>'perfect square'</i> if yes and <i>'imperfect square'</i> if no.`
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
            'Say the phrase: "execute function gap on namespace math with one argument".',
            'Say the phrase: "write SQRT".<br/><i>Just say the letters, you can try multiple times</i>.',
            'Say the phrase: "switch back language back to portuguese".',
            '<i>A partir de agora os comandos de voz serão ditos em português.</i>',
            'Diga a frase: "selecione a palavra gap".',
            'Diga a frase: "variável número".',
            'Diga a frase: "ponteiro final da linha".',
            'Diga a frase: "linha nova".',
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
            'Say the phrase: "new function square with one argument".',
            'Say the phrase: "variable number".',
            'Say the phrase: "line 3".',
            'Say the phrase: "variable number equals gap".',
            'Say the phrase: "call function gap on namespace math with one argument".',
            'Say the phrase: "write SQRT".<br/><i>Just say the letters, you can try multiple times</i>.',
            'Say the phrase: "select the word gap".',
            'Say the phrase: "variable number".',
            'Say the phrase: "pointer end of line".',
            'Say the phrase: "create a line".',
            'Say the phrase: "conditional statement if else expression gap equals number 0".',
            'Say the phrase: "expression variable number module number 1".',
            'Say the phrase: "line 5".',
            'Say the phrase: "call function print with the argument string perfect square string".',
            'Say the phrase: "line 7".',
            'Say the phrase: "execute function print with one argument".',
            'Say the phrase: "text imperfect square text".',
            `Say the phrase: "run current file" or click on the green icon above the code editor.`,
            '<i>Check the program output in the section below the code editor.</i>',
            'Done.'
        ]
    },
    code: {
        'pt-BR': '\n\nvar mostrar = console.log\nquadrado(4)\nquadrado(13)',
        'en-US': '\n\nvar print = console.log\nsquare(4)\nsquare(13)'
    }
}

const multiplesOfSevenAndSix: Problem = {
    id: 'multipleSevenSix',
    title: {
        'pt-BR': 'Múltiplos de 6 ou 7',
        'en-US': 'Multiples of 6 or 7'
    },
    placeholder: {
        'pt-BR': `Use um <i>for loop</i> para listar múltiplos de 6 ou 7.<br/><br/>
            <i class="fa fa-info-circle"></i> É possível dizer "selecione da linha 3 até a linha 6" para selecionar o intervalo
            entre estas linhas ou ainda "selecione da letra A até a letra T" para selecionar o
            texto entre essas letras na linha atual.`,
        'en-US': `Use a <i>for loop</i> to list every multiple of 6 or 7.<br/><br/>
            <i class="fa fa-info-circle"></i> It's possible to say "select from line 3 to line 6" to select the interval between
            those lines or even "select from letter A to the letter T" to select the interval between those letters in the current line.`
    },
    statement: {
        'pt-BR': `Escreva na tela todos os múltiplos dos números 6 ou 7 no intervalo 0..256.`,
        'en-US': `Write a function to list every multiple of the number 6 or 7 in the inverval 0..256.`
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
            'Say the phrase: "go to line number 4."',
            'Say the phrase: "repetition statement from number 0 to number 256".',
            'Say the phrase: "line 5".',
            'Say the phrase: "conditional statement expression gap or gap".',
            'Say the phrase: "expression gap module number 6 equals number 0".',
            'Say the phrase: "variable i".',
            'Say the phrase: "select the word gap".',
            'Say the phrase: "expression gap module number 7 equals number 0".',
            'Say the phrase: "variável i".',
            'Say the phrase: "line 6".',
            'Say the phrase: "call function print with the argument variable i".',
            `Say the phrase: "run current file" or click on the green icon above the code editor.`,
            '<i>Check the program output in the section below the code editor.</i>',
            'Done.'
        ]
    },
    code: {
        'pt-BR': 'var mostrar = console.log\n\n',
        'en-US': 'var print = console.log\n\n'
    }
}

const happyNumber: Problem = {
    id: 'happyNumber',
    title: {
        'pt-BR': 'Número Feliz',
        'en-US': 'Happy Number'
    },
    placeholder: {
        'pt-BR': `Teste se um número qualquer <i>N</i> é um <a target="_blank" href="https://pt.wikipedia.org/wiki/N%C3%BAmero_feliz">Número Feliz</a>.<br/><br/>
            <i class="fa fa-info-circle"></i> É possível dizer "troque a linguagem para inglês" para mudar o idioma de entrada para inglês.`,
        'en-US': `Test if a given number <i>N</i> is a <a target="_blank" href="https://en.wikipedia.org/wiki/Happy_number">Happy Number</a>.<br/><br/>
            <i class="fa fa-info-circle"></i> It's possible to say "change language to portuguese" to change the input language to portuguese.`
    },
    statement: {
        'pt-BR': `Complete a função para determinar se um número natural qualquer é um
            <a target="_blank" href="https://pt.wikipedia.org/wiki/N%C3%BAmero_feliz">número feliz</a>.`,
        'en-US': `Complete the function to test if a given natural number is a 
            <a target="_blank" href="https://en.wikipedia.org/wiki/Happy_number">Happy Number</a>. 
            <a target="_blank" href="https://www.youtube.com/watch?v=ee2If8jSxUo&t=19s">(happy primes)</a>`
    },
    solution: {
        'pt-BR': [
            'Clique no microfone para começar a gravação.',
            'Clique na segunda linha do editor de código.',
            'Diga a frase: "linha 5".',
            'Diga a frase: "criar linha".',
            'Diga a frase: "linha 5".',
            'Diga a frase: "estrutura condicional expressão gap igual a número 1".',
            'Diga a frase: "variável valor".',
            'Diga a frase: "linha 6".',
            'Diga a frase: "retorne verdadeiro".',
            'Diga a frase: "linha 7".',
            'Diag a frase: "ponteiro final da linha"',
            'Diga a frase: "criar linha".',
            'Diga a frase: "estrutura condicional".',
            'Diga a frase: "execute a função gap na variável visitados com o argumento variável valor".',
            'Diga a frase: "linha 9".',
            'Diga a frase: "retorne falso".',
            'Diga a frase: "linha 11".',
            'Diga a frase: "criar linha".',
            'Diga a frase: "linha 11".',
            'Diga a frase: "execute a função gap na variável visitados com o argumento variável valor".',
            'Diga a frase: "ponteiro final da linha".',
            'Diga a frase: "criar linha".',
            'Diga a frase: "nova variável soma igual a número 0".',
            'Diga a frase: "criar linha".',
            'Diga a frase: "estrutura de repetição para todo item em gap".',
            'Diga a frase: "expressão variável valor mais texto texto".',
            'Diga a frase: "linha 14".',
            'Diga a frase: "variável soma igual a expressão variável soma mais gap vezes gap".', // maybe fix that: select gap when its done.
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

            'Say the phrase: "line 11".',
            'Say the phrase: "select the word gap".',
            'Say the phrase: "print add".',

            'Say the phrase: "run current file".',
            '<i>Validate the system output.</i>',

            'End.'
        ],
        'en-US': [
            'Click on the microphone to start recording.',
            'Click on the first line of the code editor.',
            'Say the phrase: "line 5".',
            'Say the phrase: "create line".',
            'Say the phrase: "line 5".',
            'Say the phrase: "conditional statement expression gap equals number 1".',
            'Say the phrase: "variable value".',
            'Say the phrase: "line 6".',
            'Say the phrase: "return true".',
            'Say the phrase: "line 7".',
            'Say the phrase: "pointer end of line"',
            'Say the phrase: "create a line".',
            'Say the phrase: "conditional statement".',
            'Say the phrase: "execute function has on variable visited with one argument".',
            'Say the phrase: "variable value".',
            'Say the phrase: "line 9".',
            'Say the phrase: "return false".',
            'Say the phrase: "line 11".',
            'Say the phrase: "create line".',
            'Say the phrase: "line 11".',
            'Say the phrase: "execute function add on variable visited with argument variable value".',
            'Say the phrase: "pointer end of line".',
            'Say the phrase: "create line".',

            'Say the phrase: "new variable sum equals number 0".',
            'Say the phrase: "create line".',
            'Say the phrase: "repetition statement for every item in gap".',
            // change to quote
            'Say the phrase: "execute function quote to string quote on variable value".',
            'Say the phrase: "line 14".',
            'Say the phrase: "variable sum equals expression variable sum plus gap times gap".',
            'Say the phrase: "select the word gap".',
            'Say the phrase: "variable item".',
            'Say the phrase: "select the word gap".',
            'Say the phrase: "variable item".',
            'Say the phrase: "line 16".',
            'Say the phrase: "select the word gap".',
            'Say the phrase: "call function happy with arguments variable sum and variable visited".',
            `Say the phrase: "run current file" or click on the green icon above the code editor.`,
            '<i>Check the program output in the section below the code editor.</i>',
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
        'en-US':
            'var print = console.log\n\n' +
            'function happy(value, visited) {\n' +
            '    return gap\n' +
            '}\n' +
            '\n' +
            'print(23, happy(23, new Set()))\n' +
            'print(4, happy(4, new Set()))\n' +
            'print(440, happy(440, new Set()))\n' +
            'print(3, happy(3, new Set()))\n',
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
