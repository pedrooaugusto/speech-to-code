const JaroWinklerDistance = require('./jaro-winlker')

module.exports = function compareStrings(word, word2) {
    if (word.toLocaleLowerCase() === word2.toLocaleLowerCase()) return true

    return JaroWinklerDistance(word, word2) > 0.835
}