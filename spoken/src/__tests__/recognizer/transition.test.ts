import Modules from '../../modules-loader'
import Transitions from '../../recognizer/transition'


beforeAll(async() => {
    await Modules.load()
})

test('it is possible to make transitions', async () => {

    function transitionIsPossible(w: string, label: string, store?: string, normalizer?: string) {
        const graph = { id: 'test', lang: 'pt-BR' }
        const result = new Transitions({ label, store, normalizer, graph }).accepts([w], 0)

        return result == null ? result : result.consumed
    }

    expect(transitionIsPossible('the', '(the)')).toEqual(['the'])
    expect(transitionIsPossible('quick', '(quick, slow)')).toEqual(['quick'])
    expect(transitionIsPossible('slow', '(quick, slow)')).toEqual(['slow'])
    expect(transitionIsPossible('fuck', '(stopWord, λ)')).toEqual([null])
    expect(transitionIsPossible('42', '({numeral})')).toEqual(['42'])
    expect(transitionIsPossible('nop', '({numeral})')).toEqual(null)
    expect(transitionIsPossible('anything', '({term})')).toEqual(['anything'])
    expect(transitionIsPossible('money', '({term})', 'exchange')).toEqual([{ exchange: 'money' }])
    expect(transitionIsPossible('constant', '(variable, nothing, constant)', 'type')).toEqual([{ type: 2 }])
    expect(transitionIsPossible('segundo', '({term})', 'number', 'ordinalNumber')).toEqual([{ number: '2' }])
    expect(transitionIsPossible('último', '({term})', 'number', 'ordinalNumber')).toEqual([{ number: '-1' }])
    expect(transitionIsPossible('primeira', '({term})', 'number', 'ordinalNumber')).toEqual([{ number: '1' }])
    expect(transitionIsPossible('blba', '({term})', 'number', 'ordinalNumber')).toEqual(null)
})