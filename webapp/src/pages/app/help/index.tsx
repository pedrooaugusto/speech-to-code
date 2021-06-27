import React from 'react'
import { GlobalContext } from '../../../services/global-context'

export default function Help() {
    const { language: lang } = React.useContext(GlobalContext)

    return (
        <main className="help">
            <div className="wrapper">
                <div className="title">
                    <h2>{i18n(lang)('Help')()}</h2>
                    <div className="sub">{i18n(lang)('Some information about Speech2Code')()}</div>
                </div>
                <div className="body">
                    <b>Visual Studio Code</b><br/>
                    Para usar esta ferramenta é necessário ter instalado o editor de código
                    Visual Studio Code. A comunicação entre o VSCode e esta
                    aplicação é feita através de uma extenção chamada Spoken que é
                    automaticamente instalada no VSCode, por isso é necessário que o
                    VSCode seja iniciado antes desta aplicação.<br/>
                    É necessário ainda que o editor de código contenha um arquivo em edição e o foco do mouse
                    esteja neste em uma das linhas deste arquivo.
                    <br/><br/>

                    <b>Lista de Comandos</b><br/>
                    Aqui serão listados os comandos mais comuns e possíveis frases de ativação, a lista completa
                    encontra-se em <i>/Módulos</i>.<br/><br/>

                    <ul className="useful-commands">
                        <li>
                            <div className="c-title">
                                <Link h="select">Trocar de linha</Link>
                            </div>
                            <div className="c-info">
                                <div className="pattern">
                                    <div>Padrão:</div>
                                    <div>linha {'<número>'}</div>
                                    <div>vá para a linha {'<número>'}</div>
                                </div>
                                <div className="phrases">
                                    <div>Frases:</div>
                                    <div>linha 5</div>
                                    <div>vá para a linha 98</div>
                                </div>
                                <div className="desc">
                                    <div>Função:</div>
                                    <div>Troca a linha atual do editor</div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="c-title"><Link h="write">Trocar de linha</Link></div>
                            <div className="c-info">
                                <div className="pattern">
                                    <div>Padrão:</div>
                                    <div>escreva {'<...>'}</div>
                                    <div>escreva (espaço)</div>
                                </div>
                                <div className="phrases">
                                    <div>Frases:</div>
                                    <div>escreva olá quem é você</div>
                                    <div>escreva você sabe alguma coisa sobre</div>
                                    <div>escreva espaço</div>
                                </div>
                                <div className="desc">
                                    <div>Função:</div>
                                    <div>Escreva qualquer coisa na linha atual</div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="c-title"><Link h="select">Selecionar</Link></div>
                            <div className="c-info">
                                <div className="pattern">
                                    <div>Padrão:</div>
                                    <div>selecione da linha {'<número>'} até a linha {'<número>'}</div>
                                    <div>selecione a palavra {'<palavra>'}</div>
                                    <div>selecione a {'<ordem>'} palavra {'<palavra>'}</div>
                                    <div>selecione a {'<ordem>'} letra {'<letra>'}</div>
                                    <div>selecione o {'<ordem>'} símbolo {'<símbolo>'}</div>
                                    <div>
                                        selecione da {'<ordem>'} (letra | símbolo) {'<letra | símbolo>'} até a {'<ordem>'} (letra | símbolo) {'<letra | símbolo>'}
                                    </div>
                                </div>
                                <div className="phrases">
                                    <div>Frases:</div>
                                    <div>selecione da linha 4 até a linha 12</div>
                                    <div>selecione a palavra gap</div>
                                    <div>selecione a terceira palavra gap</div>
                                    <div>selecione a quinta letra P</div>
                                    <div>selecione o símbolo 3</div>
                                    <div>selecione da letra A até a última letra Z</div>
                                </div>
                                <div className="desc">
                                    <div>Função:</div>
                                    <div>Seleciona linhas, letras ou palavras</div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="c-title"><Link h="new_line">Linha nova</Link></div>
                            <div className="c-info">
                                <div className="pattern">
                                    <div>Padrão:</div>
                                    <div>linha nova</div>
                                    <div>nova linha abaixo</div>
                                    <div>nova linha acima</div>
                                </div>
                                <div className="phrases">
                                    <div>Frases:</div>
                                    <div>linha nova</div>
                                    <div>nova linha abaixo</div>
                                    <div>nova linha acima</div>
                                </div>
                                <div className="desc">
                                    <div>Função:</div>
                                    <div>Cria uma nova linha acima ou abaixo</div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="c-title"><Link h="number">Número</Link></div>
                            <div className="c-info">
                                <div className="pattern">
                                    <div>Padrão:</div>
                                    <div>número {'<número>'}</div>
                                    <div>#{'<número>'}</div>
                                </div>
                                <div className="phrases">
                                    <div>Frases:</div>
                                    <div>número 7465</div>
                                    <div>número 32</div>
                                </div>
                                <div className="desc">
                                    <div>Função:</div>
                                    <div>Escreve um número na linguagem JS. Pode ser usado como argumento para outros comandos</div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="c-title"><Link h="string">String</Link></div>
                            <div className="c-info">
                                <div className="pattern">
                                    <div>Padrão:</div>
                                    <div>string {'<...>'} string</div>
                                    <div>texto {'<...>'} texto</div>
                                </div>
                                <div className="phrases">
                                    <div>Frases:</div>
                                    <div>string isso é um teste string</div>
                                    <div>texto isso é uma string entre aspas texto</div>
                                </div>
                                <div className="desc">
                                    <div>Função:</div>
                                    <div>Escreve uma string na linguagem JS. Pode ser usado como argumento para outros comandos</div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="c-title"><Link h="fn_call">Chamada de função</Link></div>
                            <div className="c-info">
                                <div className="pattern">
                                    <div>Padrão:</div>
                                    <div>execute a função {'<palavra>'}</div>
                                    <div>execute a função {'<palavra>'} com {'<número>'} argumentos</div>
                                    <div>execute a função {'<palavra>'} na {'[values]'} com os argumentos {'[values]'} e {'[values]'}</div>
                                </div>
                                <div className="phrases">
                                    <div>Frases:</div>
                                    <div>execute a função soma</div>
                                    <div>execute a função stop com 3 argumentos</div>
                                    <div>execute a função soma na variável calculadora com os argumentos número 1 e string tudo bem string</div>
                                </div>
                                <div className="desc">
                                    <div>Função:</div>
                                    <div>Usada para chamar um função no objeto X com os argumentos Y</div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="c-title"><Link h="variable_assignment">Atribuição de variável</Link></div>
                            <div className="c-info">
                                <div className="pattern">
                                    <div>Padrão:</div>
                                    <div>nova (constante | variável) {'<palavra>'} igual a {'[values]'}</div>
                                    <div>(constante | variável) {'<palavra>'} igual a {'[values]'}</div>
                                </div>
                                <div className="phrases">
                                    <div>Frases:</div>
                                    <div>nova variável bola igual a string ola que é você string</div>
                                    <div>constante valor igual a execute a função soma</div>
                                    <div>nova constante valor igual a número 92</div>
                                </div>
                                <div className="desc">
                                    <div>Função:</div>
                                    <div>Usada para declarar ou atribuir um valor a uma variável</div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="c-title"><Link h="elementar_math_op">Operadores aritméticos</Link></div>
                            <div className="c-info">
                                <div className="pattern">
                                    <div>Padrão:</div>
                                    <div>expressão {'[values]'} (mais | menos | vezes | dividido) {'[values]'} (mais | menos | vezes | dividido) ...</div>
                                </div>
                                <div className="phrases">
                                    <div>Frases:</div>
                                    <div>expressão número 3 mais número 42 menos string ola pedro string</div>
                                    <div>expressão execute a função soma mais a variável bola</div>
                                    <div>expressão número 3 mais execute a função soma com os argumentos número 2 e número 3</div>
                                </div>
                                <div className="desc">
                                    <div>Função:</div>
                                    <div>Usada para usar os operadores aritméticos (+, -, *, /) em JS</div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div className="c-title"><Link h="elementar_math_op">Operadores lógicos</Link></div>
                            <div className="c-info">
                                <div className="pattern">
                                    <div>Padrão:</div>
                                    <div>expressão {'[values]'} (e | ou | igual) {'[values]'} (e | ou | igual) ...</div>
                                    <div>expressão {'[values]'} (maior | menor) que {'[values]'} (maior | menor) que ...</div>
                                </div>
                                <div className="phrases">
                                    <div>Frases:</div>
                                    <div>expressão número 3 e número 42 menos string ola pedro string</div>
                                    <div>expressão execute a função soma ou a variável bola</div>
                                    <div>expressão número 3 igual a execute a função soma</div>
                                    <div>expressão número 0 maior ou igual a variável valor</div>
                                </div>
                                <div className="desc">
                                    <div>Função:</div>
                                    <div>Usada para usar os operadores lógicos (||, &&, ===, !) em JS</div>
                                </div>
                            </div>
                        </li>
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

    },
    'pt-BR': {
        'Help': () => 'Ajuda',
        'Some information about Speech2Code': () => 'Informações sobre como usar esta ferramenta'
    }
}

const i18n = (lang: string) => (textId: string) => texts[lang][textId] || (() => textId)
