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
    }
}
