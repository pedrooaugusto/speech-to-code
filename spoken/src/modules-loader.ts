import * as graphlib from './graphlib'

class Modules {
    private spoken: SpokenModules = {
        modules: [],
        normalizers: {},
        templates: {},
        stopWords: {}
    }

    async load(val?: SpokenModules) {
        this.spoken = await loadModules(val)
    }

    findAutomataById(id: string, lang: string): (null | graphlib.Graph) {
        for (const mod of this.modules) {
            for (const graphJson of mod.grammar[lang]) {
                if (graphJson.value.id === id) return graphlib.json.read(graphJson)
            }
        }

        return null
    }

    get modules() {
        return this.spoken.modules
    }

    get list() {
        return this.spoken.modules
    }

    get context(): Context {
        return {
            templates: this.spoken.templates,
            normalizers: this.spoken.normalizers,
            stopWords: this.spoken.stopWords
        }
    }

    templates(text: string) {
        return this.spoken.templates[text]
    }

    normalizers(normalizer?: string, lang?: string) {
        if (!lang || !normalizer || !this.spoken.normalizers[normalizer]) return (text: string) => text

        return (text: string, ...args: any[]) => {
            try {
                const fn = this.spoken.normalizers[normalizer](lang)
                const value = fn(text, ...args)

                if (value == null) return null

                return value
            } catch(err) {
                console.error(err)

                return null
            }
        }
    }
}

async function loadModules(val?: SpokenModules): Promise<SpokenModules> {
    let json: SpokenModules = { modules: [], normalizers: {}, templates: {}, stopWords: {} }

    if (val != null) {
        json = val // should not be allowing that!
    } else if (typeof require === 'function' && require('fs')?.readFileSync !== undefined) {
        const fs = require('fs')
        const path = require('path')

        json = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'grammar.json'), 'utf-8'))

    } else if(typeof fetch === 'function') {
        const r = await fetch('/grammar.json')

        json = await r.json()
    }

    if (!json?.modules?.length) {
        console.error('Unable to load grammar!')

        return { modules: [], normalizers: {}, templates: {}, stopWords: {} }
    }

    for (const key in json.normalizers) {
        json.normalizers[key] = eval(`(() => { return ${json.normalizers[key]} })()`)
    }

    return json
}

export default new Modules()