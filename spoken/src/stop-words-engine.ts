type Clauses = {
    left: string
    right: string[]
    op: number
}

type Expression = {
    root: string
    negative: boolean
    clauses: Clauses[]
}

export default class StopWordsEngine {
    cache = new Map<string, Expression>()
    stopWordList: string[]
    stopExpressionList: string[]

    constructor(stopWordList: string[], stopExpressionList: string[] = []) {
        this.stopWordList = stopWordList
        this.stopExpressionList = stopExpressionList
    }

    public removeStopWords(phrase: string) {
        for (const exp of this.stopExpressionList) {
            phrase = phrase
                .replace(new RegExp('\\b' + exp + '\\b', 'gi'), '')
                .replace(/  +/gi, ' ')
        }

        return phrase
            .trim()
            .split(' ')
            .filter((item, index, array) => !this.isStopWord(index, array))
            .join(' ')
    }

    public isStopWord(currentWordIndex: number, words: string[]) {
        const word = words[currentWordIndex]

        if (this.stopWordList.includes(word)) return true

        for (const exp of this.stopWordList) {
            if (!exp.match(/ -> | !> /)) continue

            if (!this.cache.has(exp))
                this.cache.set(exp, this.parse(exp, words, currentWordIndex))

            if(this.test(word, this.parse(exp, words, currentWordIndex) as Expression)) return true
        }

        return false
    }

    private test(word: string, expression: Expression) {
        if (word.toLowerCase() !== expression.root.toLowerCase()) return false

        for (const c of expression.clauses) {
            if (c.op === 1) {
                if (c.right.includes(c.left)) continue

                return false !== expression.negative
            }

            if (c.op === -1) {
                if (!c.right.includes(c.left)) continue

                return false !== expression.negative
            }
        }

        return true !== expression.negative
    }

    private parse(exp: string, words: string[], index: number): Expression {
        const [root, tmp] = exp.split(/ -> | !> /)
        const clauses = tmp.split(' & ').map((item) => {
            const [left, right] = item.split(/ [\!=]= /)
            const [op] = item.match(/[\!=]=/gi) as RegExpMatchArray

            return {
                left: this.parseOperand(left, words, index) as string,
                right: this.parseOperand(right, words, index) as string[],
                op: op === '==' ? 1 : -1,
            }
        })

        return {
            root,
            clauses,
            negative: exp.includes('!>')
        }
    }

    private parseOperand(exp: string, words: string[], i: number) {
        if (/(P|N)\d/gi.test(exp)) {
            const result = exp.match(/(P|N)(\d+)/) as RegExpMatchArray
            const step = parseInt(result[2], 10) * (result[1] === 'N' ? 1 : -1)

            return words[i + step] || ''
        } else if (/\((.*?)\)/.test(exp)) {
            return exp.match(/\((.*?)\)/)![1].split('|')
        }

        return exp
    }
}
