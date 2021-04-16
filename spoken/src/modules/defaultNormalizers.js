return {
    ordinalNumber: function ordinalNumber (lang) {
        function OrdinalNumbers(last, tenFirstNumbers) {
            return (word, compareStr) => {
                if (compareStr(word, last)) return '-1'
                if (!Number.isNaN(parseInt(word, 10))) return parseInt(word, 10).toString()
        
                const i = tenFirstNumbers.findIndex(a => compareStr(a, word))

                return i === -1 ? undefined : (i + 1).toString()
            }   
        }

        if (lang === 'pt-BR')
            return OrdinalNumbers('último', [
                'primeiro', 'segundo', 'terceiro', 'quarto', 'quinto',
                'sexto', 'sétimo', 'oitavo', 'nono', 'décimo'
            ])

        return OrdinalNumbers('last', [
            'first', 'second', 'third', 'fourth', 'fifth',
            'sixth', 'seventh', 'eighth', 'ninth', 'tenth'
        ])
    }
}