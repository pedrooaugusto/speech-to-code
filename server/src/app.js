configEnv()

const path = require('path')
const axios = require('axios')
const express = require('express')
const app = express()
const http = require('http').createServer(app)
const SpokenRouter = require('./spoken/route')

require('./headers')(app)

app.use('/spoken', SpokenRouter)

app.get('/api/azure/token', async (req, res) => {
	res.setHeader('Content-Type', 'application/json')

	const speechKey = process.env.SPEECH_KEY
    const speechEndpoint = process.env.ENDPOINT
	const speechRegion = process.env.REGION
	let customModel = undefined

	if (req.query.lang === 'en-US') {
		customModel = process.env.CUSTOM_MODEL_ENGLISH
	}

	if (speechKey == '' || speechKey == null) res.status(401).send({ message: 'ENV variables not configured!' })

	const headers = { 
		headers: {
			'Ocp-Apim-Subscription-Key': speechKey,
			'Content-Type': 'application/x-www-form-urlencoded'
		}
	}

	try {
		const tokenResponse = await axios.post(speechEndpoint, null, headers)

		res.status(200).send({ token: tokenResponse.data, region: speechRegion, endpointId: customModel })

	} catch (err) {
		console.error(err)

		res.status(401).send({ message: 'There was an error authorizing your azure speech to text key.' })
	}

})

app.use(express.static(path.resolve(__dirname, '..', 'public')))
app.use('*', (req, res) => res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html')))

http.listen(process.env.PORT || 3000, () => {
	console.log('[server.app] Listening on port *:3000')
	console.log('[server.app] To access the web version demo you can visit: http://localhost:3000/webapp/')
	console.log('[server.app] To start the electron client run: `npm --prefix client start`')
	console.log('[server.app] To start the development server run: `npm --prefix webapp start`')
	console.log('[server.app] Dont forget to edit /server/.env with your Azure speech-to-text API keys')
})

function configEnv() {
	const local = require('path').resolve(__dirname, '..', '.env.local')
	const dev = require('path').resolve(__dirname, '..', '.env')

	const hasLocal = require('fs').existsSync(local)

	require('dotenv').config({ path: hasLocal ? local : dev })
}

