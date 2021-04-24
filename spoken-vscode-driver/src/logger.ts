import { window } from './vscode'

const out = window.createOutputChannel('Spoken')

export default function log(obj: any) {
    out.appendLine('['+ new Date().toISOString() +']' + obj)
}