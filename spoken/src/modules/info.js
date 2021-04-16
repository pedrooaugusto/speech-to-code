module.exports = {
    templates: {
        '{any}': {
            value: '(.*)',
            examples: {
                'pt-BR': ['quem é você', 'isto é um teste'],
                'en-US': ['who are you', 'the universe is cracked']
            }
        },
        '{term}': {
            value: '(\\S+)',
            examples: {
                'pt-BR': ['valor', 'lista', 'numero', 'texto', 'temp'],
                'en-US': ['value', 'graph', 'number', 'text', 'temp']
            }
        },
        '{ordinalNumber}': {
            value: '(\\S+)',
            examples: {
                'pt-BR': ['1ª', '42ª', 'último', 'primeiro', 'sétimo'],
                'en-US': ['1ª', '42ª', 'last', 'first', 'fourth']
            }
        },
        '{numeral}': {
            value: '(\\d+)',
            examples: {
                'pt-BR': ['1', '42'],
                'en-US': ['1', '42']
            }
        },
        '{number}': {
            value: '(\\d+)',
            examples: {
                'pt-BR': ['1', '42'],
                'en-US': ['1', '42']
            }
        }
    },
    normalizers: {
        ordinalNumber: {
            'pt-BR': function(word, compareStr) {
                const words = [
                    'primeiro', 'segundo', 'terceiro', 'quarto', 'quinto',
                    'sexto', 'sétimo', 'oitavo', 'nono', 'décimo'
                ]

                if (compareStr(word, 'último')) return '-1'
                if (!Number.isNaN(parseInt(word, 10))) return parseInt(word, 10).toString()

                const i = words.findIndex(a => compareStr(a, word))

                return i === -1 ? undefined : (i + 1).toString()
            },
            'en-US': function(word, compareStr) {
                const words = [
                    'first', 'second', 'third', 'fourth', 'fifth',
                    'sixth', 'seventh', 'eighth', 'ninth', 'tenth'
                ]

                if (compareStr(word, 'last')) return '-1'
                if (!Number.isNaN(parseInt(word, 10))) return parseInt(word, 10).toString()

                const i = words.findIndex(a => compareStr(a, word))

                return i === -1 ? undefined : (i + 1).toString()
            }
        }
    }
}