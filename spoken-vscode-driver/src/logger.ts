import { window } from 'vscode'

const out = window.createOutputChannel('log')
// 		"onCommand:spoken-vscode-driver.helloWorld"
export default function log(obj: any) {
    out.appendLine('['+ new Date().toISOString() +']' + obj)
}