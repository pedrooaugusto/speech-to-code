/**

Test it out and use the grammar below: https://omrelli.ug/nearley-playground/

MAIN -> ROOT _ DEF _ LEFT _ OP _ RIGHT
_ -> " "
ROOT -> [\w]:+
DEF -> "->" | "!>"
LEFT -> ("P" | "N") [0-9]:+
OP -> "!=" | "=="
RIGHT -> "(" ITEM ")"
ITEM -> ITEM "|" ITEM | [\w]:+

 */

type Clauses = {
    left: string | string[]
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
        const words = phrase.trim().split(' ')
        const nwords = []

        let i = 0
        while (i < words.length) {
            const skip = this.skipStopWords(i, words)

            if (skip !== 0) {
                i += skip
                continue
            }

            nwords.push(words[i])

            i += 1
        }

        return nwords.join(' ')
    }

    public sanitizeStopExpressions(phrase: string) {
        for (const exp of this.stopExpressionList) {
            phrase = phrase
                .replace(new RegExp('\\b' + exp + '\\b', 'gi'), exp.replace(/ /gi, ''))
        }

        return phrase
    }

    public skipStopWords(currentWordIndex: number, words: string[]) {
        const word = words[currentWordIndex]

        // simple stop word
        if (this.stopWordList.includes(word)) return 1

        // stop expression (more than one word)
        for (const expression of this.stopExpressionList) {
            const slice = words.slice(currentWordIndex, currentWordIndex + expression.split(' ').length)

            if (expression === slice.join(' ')) return slice.length
        }

        // complex stop word (depends on the context)
        for (const exp of this.stopWordList) {
            if (!exp.match(/ -> | !> /)) continue

            if(this.test(word, this.parse(exp, words, currentWordIndex) as Expression)) return 1
        }

        return 0
    }

    private test(word: string, expression: Expression) {
        if (word.toLowerCase() !== expression.root.toLowerCase()) return false

        for (const c of expression.clauses) {
            if (c.op === 1) {
                if (typeof c.left === 'string' && c.right.includes(c.left)) continue
                if (typeof c.left === 'object' && c.right.find(b => c.left.includes(b))) continue

                return false !== expression.negative
            }

            if (c.op === -1) {
                if (typeof c.left === 'string' && !c.right.includes(c.left)) continue
                if (typeof c.left === 'object' && !c.right.find(b => c.left.includes(b))) continue

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
                left: this.parseOperand(left, words, index),
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
        } else if (exp.trim() === 'S') {
            return words
        } else if (/\((.*?)\)/.test(exp)) {
            return exp.match(/\((.*?)\)/)![1].split('|')
        }

        return exp
    }
}
