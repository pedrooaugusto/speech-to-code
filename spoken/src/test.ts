import Spoken from './index'

let f = Spoken.matchPhrase('Declaro uma variável chamada bola com o valor 50', 'pt_br')

if (f == null) throw new Error('Something went wrong')

f = Spoken.matchPhrase('escreva quem é você', 'pt_br')

if (f == null) throw new Error('Something went wrong')