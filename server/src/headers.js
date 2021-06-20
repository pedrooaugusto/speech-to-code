const cors = require('cors')

module.exports = function config(app) {
    return process.env.PROD !== 'TRUE' ? dev(app) : prod(app)
}

function prod(app) {
    /**
     * By no means this an authentication!
     * 
     * Actual authentication for this App Service
     * is made through Microsoft Azure Identity Platform (Azure AD).
     * 
     */
    app.use(async (req, res, next) => {
        const kn = process.env.SPEECH2CODE_HEADER_NAME || ''
        const kv = process.env.SPEECH2CODE_HEADER_VALUE || ''

        if (kn == '' || kv == '') return res.status(401).send('<h1>401 - UNAUTHORIZED</h2>')

        const userkv = req.header(kn)

        if (kv !== userkv) return res.status(401).send('<h1>401 - UNAUTHORIZED</h2>')

        next()
    })
}

function dev(app) {
    // Enable cors for react-dev-server
    app.use(cors())
}