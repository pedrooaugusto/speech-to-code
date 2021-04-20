import StopWordsEngine from '../stop-words-engine'

const sl = (s: string) => s.split(' ')

test('it can detect simple stop words', async () => {
    const list = ['a', 'de', 'da', 'é']

    expect(new StopWordsEngine(list).skipStopWords(0, sl('de onde você é'))).toBe(1)
    expect(new StopWordsEngine(list).skipStopWords(2, sl('de onde você é'))).toBe(0)
    expect(new StopWordsEngine(list).skipStopWords(2, sl('a esquerda de sao paulo'))).toBe(1)
})

// eu e voce
test('it can detect complex stop words', async () => {
    const list = ['a -> P1 != (letra|símbolo)', 'da', 'de -> N1 != (novo)', 'e !> P1 == (eu) & N1 == (você)']

    // first 'a' is considered stop word
    expect(new StopWordsEngine(list).skipStopWords(0, sl('a cidade é muito boa letra a pra ela'))).toBe(1)
    // sixth 'a' is not considered stop word
    expect(new StopWordsEngine(list).skipStopWords(6, sl('a cidade é muito boa letra a pra ela'))).toBe(0)

    expect(new StopWordsEngine(list).skipStopWords(2, sl('ela veio de carro e voltou de novo para a china'))).toBe(1)
    expect(new StopWordsEngine(list).skipStopWords(6, sl('ela veio de carro e voltou de novo para a china'))).toBe(0)

    expect(new StopWordsEngine(list).skipStopWords(1, sl('bola e ele somos magro'))).toBe(1)
    expect(new StopWordsEngine(list).skipStopWords(1, sl('eu e ele somos magro'))).toBe(1)
    expect(new StopWordsEngine(list).skipStopWords(1, sl('ele e você somos magro'))).toBe(1)
    expect(new StopWordsEngine(list).skipStopWords(1, sl('eu e você somos magro'))).toBe(0)
})

test('it can detect complex stop words in the whole string', async () => {
    const list = ['the', 'who', 'please', 'from -> S != (to)']

    expect(new StopWordsEngine(list).skipStopWords(2, sl('I come from America'))).toBe(1)
    expect(new StopWordsEngine(list).skipStopWords(2, sl('I come from America to Brazil'))).toBe(0)
})

test('it can remove complex stop words', async () => {
    const list1 = [
        'a -> P1 != (letra|símbolo)',
        'de -> N1 != (novo)',
        'e !> P1 == (eu) & N1 == (você)'
    ]

    const list2 = [
        'por favor'
    ]

    expect(
        new StopWordsEngine(list1, list2).removeStopWords('A Amanda e eu somos muito bonitas por favor')
    ).toBe('Amanda eu somos muito bonitas')

    expect(
        new StopWordsEngine(list1, list2).removeStopWords('eu e você a Amanda e a letra a por favor a eu e a eu e você')
    ).toBe('eu e você Amanda letra a eu eu e você')
})
