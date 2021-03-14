const Spoken = require('spoken').default

class SpokenInterface {
    findComand(voiceToTextResponse) {
        console.log('[server.src.Spoken.findCommand] Warn: Ignoring other matches!')

        const trsc = voiceToTextResponse?.results?.[0].alternatives?.[0]?.transcript
        const matchedCommand = Spoken.matchPhrase(trsc, 'pt_br')

        return {
            _rawVoiceToTextResponse: voiceToTextResponse,
            phrase: [trsc],
            command: matchedCommand ? {
                ...matchedCommand.command,
                matchedRegex: matchedCommand.regexMatch,
            } : null
        }
    }
}

module.exports = new SpokenInterface()
