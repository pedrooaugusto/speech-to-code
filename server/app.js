const path = require('path')
const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const Session = require('./src/voice-recognition-session')
const SpokenRouter = require('./src/spoken/route')
const Spoken = require('./src/spoken/index')

http.listen(3000, () => {
	console.log('[server.app] Listening on *:3000')
})

app.use(express.static(path.resolve(__dirname, 'public')))

app.use('/spoken', SpokenRouter)

io.on('connection', (socket) => {
	console.log('[server.app] A user connected')

	socket.on('disconnect', () => {
		console.log('[server.app] A user has left!')
	})

	socket.on('VoiceRecognitionSession:data', ({ data }) => {
		Session.current().write(data)
	})

	socket.on('VoiceRecognitionSession:stop', (data) => {
		console.log('[server.app.VoiceRecognitionSession.stop] Voice recognition session has stoped')
		Session.close()
	})

	socket.on('VoiceRecognitionSession:byPass', (data) => {
		console.log('[server.app.VoiceRecognitionSession.byPass] Bypassing voice recognition engine')
		socket.emit('VoiceRecognitionSession:results', Spoken.findComand(data))
	})

	socket.on('VoiceRecognitionSession:start', (data, fn) => {
		Session
		.newSession()
		.on('error', (err) => {
			console.error('some error happned')
			console.error(err)

			socket.emit('VoiceRecognitionSession:error', err)
		})
		.on('data', (results) => {
			socket.emit('VoiceRecognitionSession:results', Spoken.findComand(results))
		})
		.start()

		fn()

		console.log('[server.app.VoiceRecognitionSession.start] Voice recognition session has started')
	})

})
