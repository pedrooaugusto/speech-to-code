const fs = require('fs')
const path = require('path')
const exec1 = require('child_process').execSync

const exec = (str) => {
    const b = exec1(str)

    console.log(b.toString())

    return b
}


const task = process.argv[2]

if (task == null || task === '') return console.log('Nothing to do!')

/**
 * Update all packages on this project to a new version.
 * 
 * Usage: `node scripts.js version 0.0.1-beta.1` to update to version `0.0.1-beta.1`
 */
if (task === 'version') {
    const version = process.argv[3] || ''

    if (version === '') return console.log('Specify a version!')

    const files = ['server', 'client', 'webapp', 'spoken-vscode-driver', 'spoken']

    files.forEach(item => {
        const package = JSON.parse(fs.readFileSync(path.resolve(item, 'package.json'), 'utf-8'))

        package.version = version

        fs.writeFileSync(path.resolve(item, 'package.json'), JSON.stringify(package, null, '\t'))

    })
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