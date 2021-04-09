async function cursor(args: CursorParsedArgs, editor: Editor, context: {}) {
    console.log('[Spoken]: Executing: "cursor."')

    if (args.linePosition != null) {
        const pos = args.linePosition === LinePostionEnum.BEGIN ? 'BEGIN_LINE' : 'END_LINE'
        return await editor.moveCursorTo(pos)
    } else if (args.line) {
        return await editor.goToLine(args.line as string)
    } else if (!args.symbol) {
        const nth = parseInt((args.leapSize as string) || '1', 10)
        return await editor.moveCursorTo(null, undefined, nth)
    } else {
        if (args.leapSize == undefined) args.leapSize = '1'

        const nth = parseInt((args.leapSize as string) || '1', 10)

        return await editor.moveCursorTo('SYMBOL', args.symbol as string, nth)
    }

    return await editor.moveCursorTo('BEGIN_LINE')
}

function normalizeOrdinalNumber(str: string) {
    const pt_br = ['primeiro', 'segundo', 'terceiro', 'quarto', 'quinto', 'sexto', 'sétimo', 'oitavo', 'nono', 'décimo']
    const en_us = ['first', 'second', 'third', 'fourth', 'fifth', 'sixth', 'seventh', 'eight', 'nineth', 'tenth']
}

enum LinePostionEnum {
    BEGIN = 0,
    END = 1
}

type CursorParsedArgs = {
    line: number | string,
    leapSize: number | string,
    symbol: number | string,
    linePosition: LinePostionEnum
} & ParsedPhrase

// @ts-ignore
return cursor