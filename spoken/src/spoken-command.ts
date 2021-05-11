import { State } from './recognizer/automata'
import { TransitionsTypes } from './recognizer/transition'
type PathType = State['path']

type CommandDetails = {
    id: string,
    lang: string,
    impl: string
} & { [key: string]: string }

export default class SpokenCommand {
    id: string
    label: string
    lang: string
    langName: string
    title: string
    desc: string
    path: PathType
    args: Record<string, string | number | any>
    impl: string
    extra: Record<string, any>

    constructor(command: CommandDetails | Record<string, string>, path: PathType = []) {
        this.id = command.id
        this.label = command.label
        this.lang = command.lang
        this.langName = command.langName
        this.title = command.title
        this.desc = command.desc
        this.impl = command.impl
        this.path = path
        this.args = SpokenCommand.extractArgs(path)
        this.args.extra = { lang: command.lang }
        this.extra = {}

        if (command.extraArgs)
            this.args.extra = {...this.args.extra, ...JSON.parse(command.extraArgs) }
    }

    static extractArgs(path: PathType) {
        // Keep only {store: 'value to be stored'}
        const args = path.filter(
            item => item != null && typeof item !== 'string' && Object.keys(item).length === 1
        ) as Record<string, TransitionsTypes>[]

        return args.reduce((acc: Record<string, any>, el) => {
            const key = Object.keys(el)[0]
            const val = SpokenCommand.maybeParseArgs(el[key])

            if (Array.isArray(acc[key])) {
                acc[key].push(val)
            } else if (false && typeof acc[key] === 'string') {
                acc[key] += ' ' + val
            } else if (acc[key] != undefined) {
                acc[key] = [acc[key], val]
            } else {
                acc[key] = val
            }

            return acc
        }, {})
    }

    static maybeParseArgs(automata: any) {
        if (!automata.id || !automata.lang || !automata.impl || !automata.path) return automata

        return new SpokenCommand(automata, automata.path)
    }
}