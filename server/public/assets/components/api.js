const url = 'http://localhost:3000/spoken/list'

const handler = (res) => {
    if (res.ok) return res.json()
    const err = new Error("[Rest API Error] " + res.statusText)
    console.error(err)
    throw err
}

export default {
    getSpokenModules() {
        return fetch(url).then(handler)
    }
}