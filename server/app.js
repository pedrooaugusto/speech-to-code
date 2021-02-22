const path = require('path')
const express = require('express')
const app = express()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const Session = require('./src/voice-recognition-session')
const fs = require('fs')

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
		console.log('data')
		Session.current().write(data)
		/*fs.readFile('name.oga', {}, async function(err, m) {
			//Session.current().write(m)
			await Session.current().bola({
				content: m.toString('base64')
			})
			console.log(err)
		})*/
	})

	socket.on('VoiceRecognitionSession:stop', (data) => {
		console.log('close')
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

		console.log('start')
	})

})


console.log(process.env.GOOGLE_APPLICATION_CREDENTIALS)