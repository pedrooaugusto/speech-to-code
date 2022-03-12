const fs = require('fs')
const path = require('path')
const exec1 = require('child_process').execSync

const exec = (str, opts) => {
    const b = exec1(str, opts)

    console.log(b.toString())

    return b
}


const task = process.argv[2]

if (task == null || task === '') {
    console.log('Nothing to do, valid commands are:\n')
    console.log('1. `node scripts.js version 0.0.1` (to update version)')
    console.log('2. `node scripts.js install` (cloning this project for the first time)')
    console.log('3. `node scripts.js gh-pages` (build webapp for github pages)')

    return
}
/**
 * Update all packages on this project to a new version.
 * 
 * Usage: `node scripts.js version 0.0.1-beta.1` to update to version `0.0.1-beta.1`
 */
if (task === 'version') {
    const version = process.argv[3] || ''

    if (version === '') return console.log('Specify a version!')

    function updateVersion(pathDoc) {
        const doc = JSON.parse(fs.readFileSync(pathDoc, 'utf-8'))

        doc.version = version

        fs.writeFileSync(pathDoc, JSON.stringify(doc, null, '\t'))
    }

    const files = ['server', 'client', 'webapp', 'spoken-vscode-driver', 'spoken']

    files.forEach(item => updateVersion(path.resolve(item, 'package.json')))

    updateVersion(path.resolve('webapp', 'public', 'manifest.json'))
}

/**
 * First time installing this porject
 * 
 * Usage: `node scripts.js install`
 */
if (task === 'install') {
    console.log('[Installing nodejs deps for /spoken]')
    exec('npm --prefix spoken ci')
    exec('npm --prefix spoken run build')

    console.log('[Installing nodejs deps for /server]')
    exec('npm --prefix server ci')

    console.log('[Installing nodejs deps for /webapp]')
    exec('npm --prefix webapp ci')

    console.log('[Installing nodejs deps for /client]')
    exec('npm --prefix client ci')

    console.log('[Building /server]')
    exec('npm --prefix server run build')

    console.log('Project installed! Try running `./run.sh`')
}

/**
 * Builds and install latest demo page in github pages
 * 
 * Usage: `node scripts.js gh-pages`
 */
if (task === 'gh-pages') {
    // fs.renameSync(path.resolve('speech-to-code'), path.resolve('docs'))
    console.log('[Building /webapp]')

    // In Github Pages the homepage is '/speech-to-code/'
    const jsonPath = path.resolve('webapp', 'package.json')
    const package = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'))

    package.homepage = 'speech-to-code'
    fs.writeFileSync(jsonPath, JSON.stringify(package, null, '\t'))
    fs.renameSync(path.resolve('webapp', '.env.gh'), path.resolve('webapp', '.env.local'))

    exec('npm --prefix webapp run build')

    package.homepage = void 0
    fs.writeFileSync(jsonPath, JSON.stringify(package, null, '\t'))
    fs.renameSync(path.resolve('webapp', '.env.local'), path.resolve('webapp', '.env.gh'))

    console.log('[Copying webapp/build to ./docs]')
    exec('cp -R webapp/build/* docs/')

    // I wish a had a normal server
    fs.mkdirSync('docs/en/webapp', { recursive: true })
    fs.mkdirSync('docs/pt/webapp', { recursive: true })
    fs.mkdirSync('docs/webapp', { recursive: true })

    fs.copyFileSync('docs/index.html', 'docs/en/webapp/index.html')
    fs.copyFileSync('docs/index.html', 'docs/pt/webapp/index.html')
    fs.copyFileSync('docs/index.html', 'docs/webapp/index.html')


    fs.copyFileSync('docs/index.html', 'docs/en/index.html')
    fs.copyFileSync('docs/index.html', 'docs/pt/index.html')


    fs.mkdirSync('docs/en/about', { recursive: true })
    fs.mkdirSync('docs/pt/about', { recursive: true })
    fs.mkdirSync('docs/about', { recursive: true })

    fs.copyFileSync('docs/index.html', 'docs/en/about/index.html')
    fs.copyFileSync('docs/index.html', 'docs/pt/about/index.html')
    fs.copyFileSync('docs/index.html', 'docs/about/index.html')

    // fs.renameSync(path.resolve('docs'), path.resolve('speech-to-code'))
}
