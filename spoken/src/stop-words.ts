const LookBehind = (rg: RegExp, term: string) => (ph: string) => {
    if (!new RegExp(term, 'gi').test(ph)) return ph

    return ph
        .replace(rg, '$1 __42__')
        .replace(new RegExp('\\b' + term + '\\b', 'gi'), '')
        .replace(/__42__/gi, term)
}

const ReplaceWord = (word: string) => (ph: string) => {
    if (!new RegExp(word, 'gi').test(ph)) return ph

    return ph
        .replace(new RegExp(word, 'gi'), '__42__')
        .replace(/\b__42__\b/gi, '')
        .replace(/__42__/gi, word)
}

export default function removeStopWords(phrase: string, lang: string) {
    const langs: Record<string, (string | RegExp | ((a: string) => string))[]> = {
        'en-US': [
            LookBehind(/\b(symbol|letter) a\b/gi, 'a'),
            'the', 'with', 'you', 'can',
            'please', 'of|to', 'it', 'its', 'it\'s',
            'is', 'are', 'was', 'were'
        ],
        'pt-BR': [
            LookBehind(/\b(symbol|letter) a\b/gi, 'a'),
            LookBehind(/\b(symbol|letter) o\b/gi, 'o'),
            ReplaceWord('você'),
            'com', 'pode', 'por favor', 'de', 'da',
            'dos', 'das', 'para', 'é', 'era', 'estava',
            'como', 'uma', 'um'
        ]
    }

    for (const stopWord of langs[lang]) {
        if (typeof stopWord === 'function') {
            phrase = stopWord(phrase).replace(/  +/g, ' ').trim()
        } else {
            let c = stopWord
            if (typeof stopWord === 'string') c = new RegExp(`(\\b${c}\\b)`, 'gi')

            phrase = phrase.replace(c, '').replace(/  +/g, ' ').trim()
        }
    }

    return phrase
}