const path = require('path')
const fs = require('fs')
const express = require('express')
const cors = require('cors')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const SpokenRouter = require('./src/spoken/route')

app.use(cors())

http.listen(3000, () => {
	console.log('[server.app] Listening on *:3000')
})

app.use(express.static(path.resolve(__dirname, 'public')))

app.use('/spoken', SpokenRouter)

app.get('/azure/token', (req, res) => {
	res.status(200).send(fs.readFileSync(path.resolve(__dirname, 'key-azure.json'), 'utf-8'))
})

io.on('connection', (socket) => {
	console.log('[server.app] A user has connected')

	socket.on('disconnect', () => {
		console.log('[server.app] A user has left!')
	})

	/*socket.on('VoiceRecognitionSession:auth', (data) => {
		console.log('[server.app.VoiceRecognitionSession.auth] Request for API access token')
		const key = JSON.stringify(fs.readFileSync(path.resolve(__dirname, 'key-azure.json')))

		socket.emit('VoiceRecognitionSession:authResults', key)
	})*/

})
