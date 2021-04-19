import StopWordsEngine from '../stop-words-engine'

const sl = (s: string) => s.split(' ')

test('it can detect simple stop words', async () => {
    const list = ['a', 'de', 'da', 'é']

    expect(new StopWordsEngine(list).isStopWord(0, sl('de onde você é'))).toBe(true)
    expect(new StopWordsEngine(list).isStopWord(2, sl('de onde você é'))).toBe(!true)
    expect(new StopWordsEngine(list).isStopWord(2, sl('a esquerda de sao paulo'))).toBe(true)
})

// eu e voce
test('it can detect complex stop words', async () => {
    const list = ['a -> P1 != (letra|símbolo)', 'da', 'de -> N1 != (novo)', 'e !> P1 == (eu) & N1 == (você)']

    // first 'a' is considered stop word
    expect(new StopWordsEngine(list).isStopWord(0, sl('a cidade é muito boa letra a pra ela'))).toBe(true)
    // sixth 'a' is not considered stop word
    expect(new StopWordsEngine(list).isStopWord(6, sl('a cidade é muito boa letra a pra ela'))).toBe(false)

    expect(new StopWordsEngine(list).isStopWord(2, sl('ela veio de carro e voltou de novo para a china'))).toBe(true)
    expect(new StopWordsEngine(list).isStopWord(6, sl('ela veio de carro e voltou de novo para a china'))).toBe(false)

    expect(new StopWordsEngine(list).isStopWord(1, sl('bola e ele somos magro'))).toBe(true)
    expect(new StopWordsEngine(list).isStopWord(1, sl('eu e ele somos magro'))).toBe(true)
    expect(new StopWordsEngine(list).isStopWord(1, sl('ele e você somos magro'))).toBe(true)
    expect(new StopWordsEngine(list).isStopWord(1, sl('eu e você somos magro'))).toBe(false)
})

test('it can detect complex stop words whole string', async () => {
    const list = ['the', 'who', 'please', 'from -> S != (to)']

    expect(new StopWordsEngine(list).isStopWord(2, sl('I come from America'))).toBe(true)
    expect(new StopWordsEngine(list).isStopWord(2, sl('I come from America to Brazil'))).toBe(false)
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
