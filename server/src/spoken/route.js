const express = require('express')
const Spoken = require('./index')
const router = express.Router()

router.get('/list', (req, res) => {
    res.send(Spoken.list)
})

router.get('/save', (req, res) => {
    res.send(Spoken.list)
})

router.get('/find-command', (req, res) => {
    const {lang, text} = req.query

    if(!lang || !text) return res.status(400).send('You should provide a phrase and the language of that phrase')

    const result = Spoken.findComand({ text: req.query.text }, lang)

    if (result == null) return res.status(404).send('No matches found for phrase: "' + text + '"; ' + lang)

    res.send(result)
})

module.exports = router