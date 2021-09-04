import * as graphlib from './graphlib'

export type GraphJsonView = {
	edges: unknown,
	nodes: unknown,
	options: unknown,
	value: {
        id: string,
        impl: string,
        lang: string, 
        alias?: string,
        priority?: string,
        [key: string]: unknown
    }
}

export type SpokenModule = {
	id: string,
	desc: string,
	label: string,
	grammar: Record<string, GraphJsonView[]>
}

export type SpokenModules = {
	modules: SpokenModule[],
	normalizers: Record<string, (((lang: string) => Function))>,
	templates: Record<string, {
		value: string,
		examples: Record<string, string[]>,
		defaultNormalizer?: string
	}>,
	stopWords: Record<string, {
		words: string[],
		expressions: string[]
	}>
}

export type Context = {
	normalizers: Record<string, (((lang: string) => Function))>,
    templates: Record<string, {
		value: string,
		examples: Record<string, string[]>
	}>,
    stopWords: Record<string, {
		words: string[],
		expressions: string[]
	}>
}

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
        // @ts-ignore yeah! couldnt care less!
        const homepage = window.__HOME_PAGE__ ?? ''
        const r = await fetch(homepage + '/grammar.json')

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