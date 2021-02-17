import yaml from 'yaml'
import fs from 'fs'
import path from 'path'

class Spoken {
    private langs: LanguageDefinition[] = []

    constructor() {
        this.langs.push(
            yaml.parse(fs.readFileSync(path.resolve(__dirname, 'spoken.yaml'), 'utf-8'))
        )
    }

    private phraseToRegex(text: string): RegExp {
        return new RegExp(
            text
            .replace(/{term}/gi, '(.*)')
            .replace(/{numeral}/gi, '(\\d+)'),
            'gi'
        )
    }

    public matchPhrase(phrase: string, lang: string): Command | null {
        console.log('[Spoken.matchPhrase] Looking for match of: ' + phrase)
        const c = this.findCommand(command => {
            const matchedPhrase = command.phrases[lang].find(item => {
                return this.phraseToRegex(item).exec(phrase)
            })

            if (matchedPhrase) return this.phraseToRegex(matchedPhrase).exec(phrase) || false

            return false
        })

        if (c) console.log('[Spoken.matchPhrase] Match found at: ' + c.getRegexExecResult())
        else console.log('[Spoken.matchPhrase] Match not found')

        return c
    }

    public matchId(id: number): Command | null {
        return this.findCommand(a => a.id === id)
    }

    private findCommand(predicate: (command: CommandDefintion) => boolean | RegExpExecArray): Command | null {
        for (const lang of this.langs) {
            for (const categorie in (lang.categories || {})) {
                const command = lang.categories?.[categorie]?.commands?.find?.(predicate)

                if (command) {
                    return new Command(command, predicate(command) as RegExpExecArray)
                }
            }
        }
        return null
    }
}

class Command {
    private command: CommandDefintion
    private regexMatch: RegExpExecArray

    constructor(command: CommandDefintion, regexMatch: RegExpExecArray) {
        this.command = command
        this.regexMatch = regexMatch
    }

    public getId(): number {
        return this.command.id
    }

    public getDesc(): string {
        return this.getDesc()
    }

    public getRegexExecResult(): RegExpExecArray {
        return this.regexMatch
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

export type LanguageDefinition = {
    name: string,
    desc: string,
    commands?: CommandDefintion[],
    categories?: {
        [key: string]:  {
            desc: string,
            commands: CommandDefintion[]
        }
    }
}

export type CommandDefintion = {
    id: number,
    desc: string,
    phrases: {
        [key: string]: string[]
    }
    impl: string
}
