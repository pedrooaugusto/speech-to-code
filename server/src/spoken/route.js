const express = require('express')
const Spoken = require('spoken').default
const router = express.Router()

router.get('/list', (req, res) => {
    res.send(Spoken.modules.listCommands())
})

router.get('/save', (req, res) => {
    res.send(Spoken.modules.listCommands())
})

module.exports = router