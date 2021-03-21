import yaml from 'yaml'
import fs from 'fs'
import path from 'path'
import Modules, { ModuleDefinition, CommandDefinition } from './modules'

declare global {
    var __dirname: string
}

class Spoken {
    private langs: ModuleDefinition[] = []
    public modules: Modules

    constructor() {
        this.langs.push(
            yaml.parse(fs.readFileSync(path.resolve(__dirname, 'spoken.yaml'), 'utf-8'))
        )
        this.modules = new Modules(this.langs)
    }

    private exposeArgs(text: string): (string | null)[][] {
        const arr = text.split(' ')
        const result: (string | null)[][] = []

        for (const w of arr) {
            const r = /^{(\S*):(\S*)}$/gi.exec(w)

            result.push([r ? `{${r[2]}}` : w, r ? r[1] : null])
        }

        return result
    }

    private phraseToRegex(text: string): RegExp {
        text = this.exposeArgs(text).map(item => item[0]).join(' ')
        text = text
            .replace(/{term}/gi, '(\\S+)')
            .replace(/{numeral}/gi, '(\\d+)')
            .replace(/{(\S*)}/gi, '($1)') + '$'

        return new RegExp(text, 'gi')
    }

    public matchPhrase(phrase: string, lang: string): Command | null {
        console.log('[Spoken.matchPhrase] Looking for a match for: ' + phrase)
        const c = this.findCommand(command => {
            const matchedPhrase = command.phrases[lang].find(item => {
                return this.phraseToRegex(item).exec(phrase)
            })

            if (matchedPhrase) {
                const execResult = this.phraseToRegex(matchedPhrase).exec(phrase)
                if (!execResult) return false

                const commandArgsObj: Record<string, string | number> = {}
                const commandArgsArray: string[][] = this.exposeArgs(matchedPhrase).filter(a => !!a[1]) as string[][]
                for (let i = 0; i < execResult.length; i++) {
                    if (i === 0) {
                        commandArgsObj.phrase = execResult[i]
                    } else {
                        // its a list: {a|b|c} -> 0, 1, 2
                        const [argPattern, argName] = commandArgsArray[i - 1]
                        // {(word|)+word}
                        const list = /{((\S+\|)+\S*\w)}/gi.exec(argPattern)

                        if (!list) commandArgsObj[argName] = execResult[i]
                        else commandArgsObj[argName] = list[1].split("|").findIndex(a => a === execResult[i])
                    }
                }

                return commandArgsObj
            }

            return false
        })

        if (c) console.log('[Spoken.matchPhrase] Match found at: ' + JSON.stringify(c.getCommandArgs()))
        else console.log('[Spoken.matchPhrase] Match not found')

        return c
    }

    public matchId(id: number): Command | null {
        return this.findCommand(a => a.id === id)
    }

    private findCommand(predicate: (command: CommandDefinition) => boolean | Record<string, string | number>): Command | null {
        for (const lang of this.langs) {
            for (const categorie in (lang.categories || {})) {
                const command = lang.categories?.[categorie]?.commands?.find?.(predicate)

                if (command) {
                    return new Command(command, predicate(command) as Record<string, string>)
                }
            }
        }
        return null
    }
}

class Command {
    public command: CommandDefinition
    public commandArgs: Record<string, string | number>

    constructor(command: CommandDefinition, args: Record<string, string>) {
        this.command = command
        this.commandArgs = args
    }

    public getId(): number {
        return this.command.id
    }

    public getDesc(): string {
        return this.getDesc()
    }

    public getCommandArgs() {
        return this.commandArgs
    }

    public getPhrases(idiom: string | undefined | null): string[] | { [key: string]: string[] } {
        if (idiom == undefined) return this.command.phrases

        return this.command.phrases[idiom]
    }

    public getImpl(): string {
        return this.command.impl
    }

    public makeFunction(): Function {
        return eval(`(() => ${this.getImpl()})()`)
    }
}

export default new Spoken()

export { ModuleDefinition, CommandDefinition }
