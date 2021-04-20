import { parseTransitionLabel } from '../../recognizer/utils'

test('it can sanitize a transition string', async () => {
    const normalizer = (label: string) => parseTransitionLabel(label)

    expect(normalizer('(the)')).toEqual(['the'])
    expect(normalizer('  (maybe)')).toEqual(['maybe'])
    expect(normalizer('(five, two)   ')).toEqual(['five', 'two'])
    expect(normalizer(' (of, λ)  ')).toEqual(['of', 'λ'])
    expect(normalizer(' ({term})  ')).toEqual(['{term}'])
    expect(normalizer(' ({any})  ')).toEqual(['{any}'])
    expect(normalizer(' ({numeral})  ')).toEqual(['{numeral}'])
    expect(normalizer(' ([number], [string])  ')).toEqual(['[number]', '[string]'])
    expect(normalizer(' ({numeral}, hello)  ')).toEqual(['{numeral}', 'hello'])
})
