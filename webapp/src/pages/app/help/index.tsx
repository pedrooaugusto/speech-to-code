import React from 'react'
import { GlobalContext } from '../../../services/global-context'

export default function Help() {
    // @ts-ignore
    const { language: lang }: { language: 'pt-BR' | 'en-US' } = React.useContext(GlobalContext)
    const i18n = _i18n(lang)

    return (
        <main className="help">
            <div className="wrapper">
                <div className="title">
                    <h2>{i18n('Help')}</h2>
                    <div className="sub">{i18n('Some information about Speech2Code')}</div>
                </div>
                <div className="body">
                    <b>Visual Studio Code</b><br/>
                    {i18n('vscode_requirement')}

                    <b>{i18n('List of voice commands')}</b><br/>
                    {i18n('list_commands_exp')}.<br/><br/>

                    <ul className="useful-commands">
                        {usefulCommands.map(item => (
                            <li key={item.id}>
                                <div className="c-title">
                                    <Link h={item.id}>{item[lang].title}</Link>
                                </div>
                                <div className="c-info">
                                    <div className="pattern">
                                        <div>{i18n('Pattern')}:</div>
                                        {item[lang].pattern.map((pt, k) => <div key={k}>{pt}</div>)}
                                    </div>
                                    <div className="phrases">
                                        <div>{i18n('Phrases')}:</div>
                                        {item[lang].phrases.map((pt, k) => <div key={k}>{pt}</div>)}
                                    </div>
                                    <div className="desc">
                                        <div>{i18n('Description')}:</div>
                                        <div>{item[lang].desc}</div>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </main>
    )
}

const Link = (props: { h: any, children: any }) => (
    <a
        href={'https://github.com/pedrooaugusto/speech-to-code/tree/main/spoken/src/modules/typescript/' + props.h + '#readme'}
        target="_blank"
        rel="noreferrer"
    >
        {props.children}
    </a>
)

const texts: Record<string, Record<string, any>> = {
    'en-US': {
        'vscode_requirement': (
            <React.Fragment>
                To use this tool is necessary to have Visual Studio Code installed.
                The communication between VSCode and this tool is done through the Spoken extension
                which is automatically installed in VSCode, that said, you should first start VSCode and then
                start this application, in that order, for the connection to be successfully.
                <br/><br/>
            </React.Fragment>
        ),
        'list_commands_exp': (
            <React.Fragment>
                Here will be listed some of the most useful voice commands and possible activation phrases.
                The comple list of voice commands can be found in <a href="#/spoken"><i>/Modules</i></a>
            </React.Fragment>
        ),
    },
    'pt-BR': {
        'Help': 'Ajuda',
        'Some information about Speech2Code': 'Informações sobre como usar esta ferramenta',
        'Description': 'Descrição',
        'Phrases': 'Frases',
        'Pattern': 'Padrão',
        'List of voice commands': 'Lista de Comandos',
        'vscode_requirement': (
            <React.Fragment>
                Para usar esta ferramenta é necessário ter instalado o editor de código
                Visual Studio Code. A comunicação entre o VSCode e esta
                aplicação é feita através de uma extenção chamada Spoken que é
                automaticamente instalada no VSCode, por isso é necessário que o
                VSCode seja iniciado antes desta aplicação.<br/>
                É necessário ainda que o editor de código contenha um arquivo em edição e o foco do mouse
                esteja neste em uma das linhas deste arquivo.
                <br/><br/>
            </React.Fragment>
        ),
        'list_commands_exp': (
            <React.Fragment>
                Aqui serão listados os comandos mais comuns e possíveis frases de ativação, a lista completa
                encontra-se em <a href="#/spoken"><i>/Módulos</i></a>
            </React.Fragment>
        )
    }
}

const _i18n = (lang: string) => (textId: string) => texts[lang][textId] || textId

const usefulCommands = [
    {
        "id": "go_to_line",
        "en-US": {
            "title": "Change line",
            "pattern": [
                "line <number>",
                "go to line <number>"
            ],
            "phrases": [
                "line 5",
                "go to line 98"
            ],
            "desc": "Changes the current editor line"
        },
        "pt-BR": {
            "title": "Trocar de linha",
            "pattern": [
                "linha <número>",
                "vá para a linha <número>"
            ],
            "phrases": [
                "linha 5",
                "vá para a linha 98"
            ],
            "desc": "Troca a linha atual do editor"
        }
    },
    {
        "id": "write",
        "en-US": {
            "title": "Write",
            "pattern": [
                "Write <...>",
                "Write space",
                "Print letter <letter>"
            ],
            "phrases": [
                "print Hello who are you",
                "write I am the doctor",
                "print space",
                "print letter b"
            ],
            "desc": "Writes anything in the current line"
        },
        "pt-BR": {
            "title": "Escrever",
            "pattern": [
                "escreva <...>",
                "escreva (espaço)"
            ],
            "phrases": [
                "escreva olá quem é você",
                "escreva você sabe alguma coisa sobre",
                "escreva espaço"
            ],
            "desc": "Escreva qualquer coisa na linha atual"
        }
    },
    {
        "id": "select",
        "en-US": {
            "title": "Select",
            "pattern": [
                "select from the line <number> to line <number>",
                "select the word <word>",
                "select the <order> word <word>",
                "select the <order> letter <letter>",
                "select the <order> symbol <symbol>",
                "select from  <order> (letter | symbol) <letter | symbol> to the <order> (letter | symbol) <letter | symbol>"
            ],
            "phrases": [
                "select from line 4 to the line 12",
                "select the word gap",
                "select the third word gap",
                "select the fifth letter P",
                "select the symbol 3",
                "select from the letter A to the last letter Z"
            ],
            "desc": "Used to select lines, symbols, words and letters"
        },
        "pt-BR": {
            "title": "Selecionar",
            "pattern": [
                "selecione da linha <número> até a linha <número>",
                "selecione a palavra <palavra>",
                "selecione a <ordem> palavra <palavra>",
                "selecione a <ordem> letra <letra>",
                "selecione o <ordem> símbolo <símbolo>",
                "selecione da <ordem> (letra | símbolo) <letra | símbolo> até a <ordem> (letra | símbolo) <letra | símbolo>"
            ],
            "phrases": [
                "selecione da linha 4 até a linha 12",
                "selecione a palavra gap",
                "selecione a terceira palavra gap",
                "selecione a quinta letra P",
                "selecione o símbolo 3",
                "selecione da letra A até a última letra Z"
            ],
            "desc": "Seleciona linhas, letras ou palavras"
        }
    },
    {
        "id": "new_line",
        "en-US": {
            "title": "Create line",
            "pattern": [
                "create line",
                "create line (above | below)",
            ],
            "phrases": [
                "create line",
                "create line below",
                "create line above"
            ],
            "desc": "Used to create a new line"
        },
        "pt-BR": {
            "title": "Linha nova",
            "pattern": [
                "linha nova",
                "nova linha abaixo",
                "nova linha acima"
            ],
            "phrases": [
                "linha nova",
                "nova linha abaixo",
                "nova linha acima"
            ],
            "desc": "Cria uma nova linha acima ou abaixo"
        }
    },
    {
        "id": "number",
        "en-US": {
            "title": "Number",
            "pattern": [
                "nunber <number>",
                "#<number>"
            ],
            "phrases": [
                "number 7465",
                "number 32"
            ],
            "desc": "Writes a number in the current line. Useful as arguments of other commands such as variable assigment."
        },
        "pt-BR": {
            "title": "Número",
            "pattern": [
                "número <número>",
                "#<número>"
            ],
            "phrases": [
                "número 7465",
                "número 32"
            ],
            "desc": "Escreve um número na linguagem JS. Pode ser usado como argumento para outros comandos"
        }
    },
    {
        "id": "string",
        "en-US": {
            "title": "String",
            "pattern": [
                "string <...> string",
                "text <...> text"
            ],
            "phrases": [
                "string this is just a thing string",
                "text the dog is blue text"
            ],
            "desc": "Writes a string in the current line. Useful as arguments of other commands such as variable assigment."
        },
        "pt-BR": {
            "title": "String",
            "pattern": [
                "string <...> string",
                "texto <...> texto"
            ],
            "phrases": [
                "string isso é um teste string",
                "texto isso é uma string entre aspas texto"
            ],
            "desc": "Escreve uma string na linguagem JS. Pode ser usado como argumento para outros comandos"
        }
    },
    {
        "id": "function_call",
        "en-US": {
            "title": "Function call",
            "pattern": [
                "execute function <word>",
                "execute function called quote <...> quote",
                "call function <word> with <number> arguments",
                "call function <word> on [values] with the arguments [values] and [values]"
            ],
            "phrases": [
                "execute the function sum",
                "execute the function called quote create object quote",
                "call function sum on variable calculator with the arguments number 1 and variable value"
            ],
            "desc": "Used to call a function"
        },
        "pt-BR": {
            "title": "Chamada de função",
            "pattern": [
                "execute a função <palavra>",
                "execute a função <palavra> com <número> argumentos",
                "execute a função <palavra> na [values] com os argumentos [values] e [values]"
            ],
            "phrases": [
                "execute a função soma",
                "execute a função stop com 3 argumentos",
                "execute a função soma na variável calculadora com os argumentos número 1 e string tudo bem string"
            ],
            "desc": "Usada para chamar um função no objeto X com os argumentos Y"
        }
    },
    {
        "id": "undo_redo",
        "en-US": {
            "title": "Undo / Redo",
            "pattern": [
                "(undo | redo) (that | last command)",
            ],
            "phrases": [
                "undo that",
                "undo last command",
                "redo that",
                "redo last command",
            ],
            "desc": "Used to undo or redo the last command. Useful to fix mistakes. CTRL+Z and CTRL+Y"
        },
        "pt-BR": {
            "title": "Desfazer / Refazer",
            "pattern": [
                "(desfaça | refaça) isso",
                "(desfaça | refaça) o último comando",
            ],
            "phrases": [
                "desfaça isso",
                "desfaça o último comando",
                "refaça isso",
                "refaça o último comando",
                "desfazer o último comando"
            ],
            "desc": "CTRL+Z and CTRL+Y: Usada para desfazer e refazer o último comando."
        }
    },
    {
        "id": "variable_assignment",
        "en-US": {
            "title": "Variable Assignment",
            "pattern": [
                "new (constant | variable) <word> equals [values]",
                "(constant | variable) <word> equals [values]"
            ],
            "phrases": [
                "new variable ball equals string hello peter what is happening string",
                "constant value equals call function remove with arguments number 2",
                "new constant value equals number 92"
            ],
            "desc": "Used to declare and assign a value to a variable"
        },
        "pt-BR": {
            "title": "Atribuição de variável",
            "pattern": [
                "nova (constante | variável) <palavra> igual a [values]",
                "(constante | variável) <palavra> igual a [values]"
            ],
            "phrases": [
                "nova variável bola igual a string ola que é você string",
                "constante valor igual a execute a função soma",
                "nova constante valor igual a número 92"
            ],
            "desc": "Usada para declarar ou atribuir um valor a uma variável"
        }
    },
    {
        "id": "math_operator",
        "en-US": {
            "title": "Arithmetic Operators",
            "pattern": [
                "expressão [values] (plus | minus | times | divided by | module) [values] (plus | minus | times | divided by | module) ..."
            ],
            "phrases": [
                "expression number 3 plus number 42 minus string just a test string",
                "expression call function sum plus variable value",
                "expression number 3 times execute function sum with the arguments number 3 and number 2"
            ],
            "desc": "The arithmetic operators (+, -, *, /, %) in JS"
        },
        "pt-BR": {
            "title": "Operadores aritméticos",
            "pattern": [
                "expressão [values] (mais | menos | vezes | dividido por | modulo) [values] (mais | menos | vezes | dividido por | modulo) ..."
            ],
            "phrases": [
                "expressão número 3 mais número 42 menos string ola pedro string",
                "expressão execute a função soma mais a variável bola",
                "expressão número 3 mais execute a função soma com os argumentos número 2 e número 3"
            ],
            "desc": "Usada para usar os operadores aritméticos (+, -, *, /, %) em JavaScript"
        }
    },
    {
        "id": "logical_operator",
        "en-US": {
            "title": "Logic operators",
            "pattern": [
                "expression [values] (and | or | equals) [values] (and | or | equals) ...",
                "expression [values] (less | greater | less or equals) than [values] (less | greater | less or equals) than ..."
            ],
            "phrases": [
                "expression number 3 and number 42 minus number 40",
                "expression execute function sum or variable ball",
                "expression número 3 eqauls number 1 plus number 2",
                "expression not number 7 greater than number 10"
            ],
            "desc": "The logical operatos (||, &&, ===, !) in JavaScript"
        },
        "pt-BR": {
            "title": "Operadores lógicos",
            "pattern": [
                "expressão [values] (e | ou | igual) [values] (e | ou | igual) ...",
                "expressão [values] (maior | menor) que [values] (maior | menor) que ..."
            ],
            "phrases": [
                "expressão número 3 e número 42 menos string ola pedro string",
                "expressão execute a função soma ou a variável bola",
                "expressão número 3 igual a execute a função soma",
                "expressão número 0 maior ou igual a variável valor"
            ],
            "desc": "Usada para usar os operadores lógicos (||, &&, ===, !) em JavaScript"
        }
    }
]
