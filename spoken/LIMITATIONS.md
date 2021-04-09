## Spoken Limitations

Since this is a pre-alpha release of Spoken there are several limitations, some of which include:


### No mixed languages

You cant mix english with a different language. This means that if you are speaking portuguese you can not mix english in it. The following would not work because it mix portuguese and english in a cleary portuguese context.

```
declare uma função chamada birthdate com valor igual resultado da chamada do método getFullYear em uma nova instância de Date.
```
*To fix that whenever we have an english word we could say the word 'temporary' in the current language and later come back
replacing all ocurrencies of 'temporary' with the actual english word.*

### No nested functions calls

Currently there is no way of expressing nested function calls in one line. It would be impossible to achieve the following snipet of code using spoken:

```javascript
const result = Number.add(Number.add(Number.normalize(5, 'pt_br'), 7), 10)
```
> Declare uma constante chamada Result com valor igual "Resultado dos argumentos "Resultado dos argumentos "Resultado dos argumentos 5 e string pt_br passados para a função Normalize aplicada no objeto Number" e 7 passados para a função Add aplicada na variável Number" e 10 passados para a função Add aplicada na variável number"

Instead you should divide the multiple function calls in different lines as follows:

```javascript
const normalizedFive = Number.normalize(5, 'pt_br')
const twelve = Number.add(normalizedFive, 7)
const result = Number.add(twelve, 10)
```

> Declare uma constante chamada **normalizedFive** com valor igual ao resultado dos argumentos 5 e string pt_br passados para função **normalize** aplicada ao objeto **Number**.<br/><br/>
Declare uma constante chamada **twelve** com valor igual ao resultado dos argumentos 5 e string pt_br passados para função **add** aplicada ao objeto **Number**.<br/><br/>
Declare uma constante chamada **result** com valor igual ao resultado dos argumentos *twelve* e 10 passados para função **add** aplicada ao objeto **Number**