const fs = require('fs')
const path = require('path')

const task = process.argv[2]

if (task == null || task === '') return console.log('Nothgin to do!')

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


