require('dotenv').config()

const path = require('path')
const axios = require('axios')
const express = require('express')
const cors = require('cors')
const app = express()
const http = require('http').createServer(app)
const SpokenRouter = require('./src/spoken/route')

// IF NOT PROD:
app.use(cors())

http.listen(process.env.PORT || 3000, () => {
	console.log('[server.app] Listening on *:3000')
})

app.use(express.static(path.resolve(__dirname, 'public')))

app.use('/spoken', SpokenRouter)

app.get('/api/azure/token', async (req, res) => {
	res.setHeader('Content-Type', 'application/json')

	const speechKey = process.env.SPEECH_KEY
    const speechEndpoint = process.env.ENDPOINT
	const speechRegion = process.env.REGION

	if (speechKey == '' || speechKey == null) {
		return res.status(401).send({ message: 'You do not have a valid speech key' })
	}

	const headers = { 
		headers: {
			'Ocp-Apim-Subscription-Key': speechKey,
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	}

	try {
		const tokenResponse = await axios.post(speechEndpoint, null, headers)

		res.status(200).send({ token: tokenResponse.data, region: speechRegion })

	} catch (err) {
		console.error(err)

		res.status(401).send({ message: 'There was an error authorizing your speech key.' })
	}

})

