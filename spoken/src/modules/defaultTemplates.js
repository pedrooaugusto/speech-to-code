return {
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
}