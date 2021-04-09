const Spoken = require('spoken').default

class SpokenInterface {
    findComand(voiceToTextResponse) {
        console.log('[server.src.Spoken.findCommand] Warn: Ignoring other matches!')

        const trsc = voiceToTextResponse?.results?.[0].alternatives?.[0]?.transcript
        const sResult = Spoken.recognizePhrase(trsc, 'pt-BR')

        const wrapper = sResult ? sResult[0] : null

        return {
            _rawVoiceToTextResponse: voiceToTextResponse,
            phrase: [trsc],
            command: wrapper ? {
                id: wrapper.id,
                desc: wrapper.desc,
                commandArgs: wrapper.args,
                impl: wrapper.impl,
                lang: wrapper.lang,
                path: wrapper.path
            } : null
        }
    }
}

module.exports = new SpokenInterface()
