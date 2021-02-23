const path = require('path')
const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const Session = require('./src/voice-recognition-session')

http.listen(3000, () => {
	console.log('listening on *:3000')
})

app.use(express.static(path.resolve(__dirname, 'public')))

io.on('connection', (socket) => {
	console.log('a user connected')

	socket.on('disconnect', () => {
		console.log('be gone!')
	})

	socket.on('VoiceRecognitionSession:data', ({ data }) => {
		Session.current().write(data)
	})

	socket.on('VoiceRecognitionSession:stop', (data) => {
		console.log('[App.VoiceRecognitionSession.stop]')
		Session.close()
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
			console.log(results)

			socket.emit('VoiceRecognitionSession:results', results)
		})
		.start()

		fn()

		console.log('[App.VoiceRecognitionSession.start]')
	})

})
