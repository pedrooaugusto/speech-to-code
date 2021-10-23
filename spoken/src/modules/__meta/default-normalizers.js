return {
    /**
     * Normalize ordinal numbers to cardinal numbers in a given language.
     * 
     * @param {string} lang The langauge of the text to be normalized, eg en-US, pt-BR...
     * @returns A function capable of transforming oridinal numbers to
     * cardinal numbers.
     */
    ordinalNumber: function ordinalNumber(lang) {
        function OrdinalNumbers(last, tenFirstNumbers) {
            return (word, compareStr) => {
                if (compareStr(word, last)) return '-1'
                if (!Number.isNaN(parseInt(word, 10)))
                    return parseInt(word, 10).toString()

                const i = tenFirstNumbers.findIndex((a) => compareStr(a, word))

                return i === -1 ? undefined : (i + 1).toString()
            }
        }

        if (lang === 'pt-BR')
            return OrdinalNumbers('último', [
                'primeiro',
                'segundo',
                'terceiro',
                'quarto',
                'quinto',
                'sexto',
                'sétimo',
                'oitavo',
                'nono',
                'décimo',
            ])

        return OrdinalNumbers('last', [
            'first',
            'second',
            'third',
            'fourth',
            'fifth',
            'sixth',
            'seventh',
            'eighth',
            'ninth',
            'tenth',
        ])
    },

    /**
     * Converts the accepted string to boolean
     * 
     * @param {string} lang The input language 
     * @returns boolean
     */
    boolean: function boolean(lang) {
        return function(word, compareStr) {
            return word != undefined ? true : false
        }
    },

    /**
     * The identity function it returns the argument
     * 
     * @param {*} lang 
     * @returns 
     */
    identity: function identity(lang) {
        return function(word, compareStr) {
            return word
        }
    },

    /**
     * **THIS SHOULD BECOME AN AUTOMATO ITSELF**
     * **FOR THIS TO SUPPORT RATIONAL NUMBERS IT SHOULD BE AN AUTOMATO**
     * **PLEASE TRANSFORM THIS IN AUTOMATO**
     * 
     * This function takes a number in the form of
     * 'one', 'two' or 'five' and transforms in
     * '1', '2', ou '5'.
     * 
     * Transforms english/portuguese written numbers to
     * arabic/indian numbers.
     * 
     * @param {*} lang
     * @returns
     */
    number: function number(lang) {
        return function(word, compareStr) {
            const numbers = {
                'pt-BR': ['zero', 'um', 'dois', 'três', 'quatro', 'cinco', 'seis', 'sete', 'oito', 'nove', 'dez'],
                'en-US': ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten']
            }

            if (!isNaN(parseInt(word))) return parseInt(word).toString()

            const val = numbers[lang].indexOf(word)

            if (val !== -1) return val.toString()

            // for some reason this is valid #42
            // FUCKIN HELL
            if (/^(#\d+)$/.test(word)) return word.substr(1)

            return undefined
        }
    }
}
