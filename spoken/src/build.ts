import yaml from 'yaml'
import fs from 'fs'
import path from 'path'

const json = yaml.parse(fs.readFileSync(path.resolve(__dirname, 'spoken.yaml'), 'utf-8'))
const mod = "exports.default = " + JSON.stringify(json)

fs.writeFileSync(path.resolve(__dirname, 'spoken.js'), mod)