// @ts-ignore
return {
    elementarMathOperation: function elementarMathOperation(lang) {
        const enUS = [['plus', '+'], ['times', '*'], ['minus', '-'], ['divided', '/']]
        const ptBR = [['mais', '+'], ['vezes', '*'], ['menos', '-'], ['dividido', '/']]
        const langs = {
            'en-US': enUS,
            'pt-BR': ptBR
        }

        return (word, compareStr) => {
            const op = langs[lang].find(([name]) => compareStr(name, word)) || []

            return op[1]
        }
    }
}