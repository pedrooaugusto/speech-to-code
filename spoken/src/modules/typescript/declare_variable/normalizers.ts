// @ts-ignore
return {
    jsCommonTypes: function jsCommonTypes(lang) {
        return (word, compareStr) => {
            if (lang === 'pt-BR') {
                const types = {
                    'número': 'number',
                    'texto': 'string',
                    'lógico': 'boolean',
                    'data': 'Date'
                }

                for (const key in types) {
                    if (compareStr(word, key)) return types[key]
                }
            }

            return word
        }
    }
}