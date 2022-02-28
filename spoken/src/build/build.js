const path = require('path')
const fs = require('fs')
const dot = require('graphlib-dot')
const {
    listArchives,
    allRecognizablePhrases,
} = require('./build-utils.js')

const { getExamples } = require('./examples/index')

const listFiles = (_path, filter) => listArchives('FILES')(_path, filter)

async function main() {
    const spokenModules = new SpokenModules()
    const examples = getExamples()

    for (const moduleA of spokenModules.modules) {
        const moduleInfo = dot.read(fs.readFileSync(moduleA.automata, 'utf-8')).graph()

        moduleA.addInfo({ desc: moduleInfo.desc, label: moduleInfo.label })

        for (const command of moduleA.commands) {
            try {
                if (command.normalizers) {
                    spokenModules.addNormalizers(command.normalizers)
                }

                for (const automata of command.automatas) {
                    const graphObject = dot.read(fs.readFileSync(automata.path, 'utf-8'))
                    const graphInfo = graphObject.graph()

                    graphInfo.impl = command.code

                    graphInfo.phrases = examples[graphInfo.id].examples[graphInfo.lang].map(a => a.phrase).slice(0, 16)

                    moduleA.addCommandGraph(graphInfo.lang, dot.graphlib.json.write(graphObject))
                }
            } catch(err) {
                console.error(err)
            }
        }
    }

    const dict = JSON.stringify(spokenModules.toJson())
    fs.writeFileSync(path.resolve(__dirname, '..', 'grammar.json'), dict)
    buildCustomPackageJSON()
}

class SpokenModules {
    constructor() {
        this.sourceRoot = path.resolve(__dirname, '..', '..', 'src', 'modules')
        this.distRoot = path.resolve(__dirname, '..', 'modules')
        this.modules = listArchives('FOLDER')(this.sourceRoot).map(name => new SpokenModule(name, this.distRoot, this.sourceRoot))
        this.normalizers = {}
        this.templates = {}
        this.stopWords = {}

        this.addNormalizers(path.resolve(this.sourceRoot, '__meta', 'default-normalizers.js'))
        this.addTemplates(path.resolve(this.sourceRoot, '__meta', 'default-templates.json'))
        this.addStopWords(path.resolve(this.sourceRoot, '__meta', 'stop-words.json'))
    }

    addNormalizers(filePath) {
        const content = fs.readFileSync(filePath, 'utf-8')
        const normalizers = eval(`(() => { ${content} })()`)

        for (const key in normalizers) {
            this.normalizers[key] = normalizers[key].toString()
        }
    }

    addTemplates(filePath) {
        const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'))

        this.templates = { ...this.templates, ...content }
    }
    
    addStopWords(filePath) {
        const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'))

        this.stopWords = { ...this.stopWords, ...content }
    }

    toJson() {
        return {
            normalizers: this.normalizers,
            templates : this.templates,
            stopWords : this.stopWords,
            modules: this.modules.map(a => a.toJson())
        }
    }
}

class SpokenModule {
    constructor(name, dir, sourceDir) {
        this.name = name
        this.json = { id: name, grammar: {} }
        this.root = path.resolve(dir, name)
        this.sourceRoot = path.resolve(sourceDir, name)
        this.automata = path.resolve(this.sourceRoot, this.name + '.dot')
        this.commands = listArchives('FOLDER', true)(this.root).map(name1 => new Command(name1, this.root, this.sourceRoot))
    }

    addInfo(info) {
        this.json = { ...this.json, ...info }
    }

    addCommandGraph(lang, graph) {
        if (!this.json.grammar[lang]) this.json.grammar[lang] = []

        this.json.grammar[lang].push(graph)
    }

    toJson() {
        return this.json
    }
}

class Command {
    constructor(name, dir, sourceDir) {
        this.name = name
        this.root = path.resolve(dir, name)
        this.sourceRoot = path.resolve(sourceDir, name)
        this.code = fs.readFileSync(path.resolve(this.root, 'impl.js'), 'utf-8')
        this.automatas = this.getCommandAutomatas(this.sourceRoot)
        this.normalizers = null

        if (fs.existsSync(path.resolve(this.root, 'normalizers.js'))) {
            this.normalizers = path.resolve(this.root, 'normalizers.js')
        }
    }

    getCommandAutomatas(root) {
        const automatas = listFiles(root, a => a.startsWith('phrase_') && a.endsWith('.dot'))

        return automatas.map(item => ({ path: path.resolve(root, item) }))
    }
}

// There are nicer ways of doing this -- this is the fastest
function buildCustomPackageJSON() {
    const json = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', '..', 'package.json'), 'utf-8'))
    json.main = 'index.js'
    json.scripts = {}
    json.devDependencies = {}
    fs.writeFileSync(path.resolve(__dirname, '..', 'package.json'), JSON.stringify(json, null, 4))
}

main()