const JaroWinklerDistance = require('./jaro-winlker')

module.exports = function compareStrings(word, word2, disableSpellcheck = 'false') {
    const isEqual = word.toLocaleLowerCase() === word2.toLocaleLowerCase()

    if (disableSpellcheck === 'true') return isEqual

    if (isEqual) return true

    return JaroWinklerDistance(word, word2) > 0.835
}