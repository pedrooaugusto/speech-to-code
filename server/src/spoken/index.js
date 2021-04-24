const Spoken = require('spoken').default

class SpokenInterface {
    constructor() {
        Spoken.init()
    }

    findComand(voiceToTextResponse, lang) {
        console.log('[server.src.Spoken.findCommand] Warn: Ignoring other matches!')

        return findComand(voiceToTextResponse, lang)
    }

    list() {
        return Spoken.modules
    }
}

function findComand(voiceToTextResponse, language) {
    const text = sanitizePonctuation(voiceToTextResponse.text)
    const result = Spoken.recognizePhrase(text.toLocaleLowerCase(), language)

    if (result != null) {
        result.extra._rawVoiceToTextResponse = voiceToTextResponse
        result.extra.phrase = text
    }

    return result
}

function sanitizePonctuation(text) {
    return text.replace(/(?<! )(:|\*|,|\.|\?|\!)/gi, ' $1')
}

module.exports = new SpokenInterface()
