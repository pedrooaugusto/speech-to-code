export function isDev() {
    return process?.mainModule?.filename?.indexOf?.('app.asar') === -1
}

export const appVersion = require('../package.json').version

/**
 * Really this is a bad idea.
 * The grammar and the mechanism responsible
 * for recognizing said grammar will differ in version...
 */
export function tryAndGetGrammarFromNetwork(url: string) {
    const { net } = require('electron')

    return new Promise((res, rej) => {
        const request = net.request(url + '/grammar.json')

        request.on('response', (response) => {            
            const result: string[] = []

            response.on('data', (chunk) => {
                result.push(new TextDecoder().decode(chunk))
            })

            response.on('end', () => {
                const g = result.join('')

                if (g == null && g == '') return res(null)


                try {
                    const p = JSON.parse(g)

                    console.log('Using spoken grammar provided by webapp!')

                    res(p)
                } catch (e) {
                    res(null)
                }
            })
        })

        request.on('error', (e) => res(null))

        request.end()
    })
}