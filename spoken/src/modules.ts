// import yaml from 'yaml'
import fs from 'fs'
import path from 'path'

export default class Modules {
    private modules: ModuleDefinition[] = []

    constructor(modules: ModuleDefinition[]) {
        this.modules = modules
    }

    newModule(modules: ModuleDefinition) {
        throw new Error("Method not implemented!")
    }

    saveCommand(
        moduleName: string,
        category: { name: string, desc?: string },
        command: CommandDefinition
    ) {
        const module = this.modules.find(m => m.name === moduleName)

        if (!module) throw new Error("Module not found")

        if (!module.categories[category.name]) {
            module.categories[category.name] = { desc: category.desc || '', commands: [] }
        }

        if (command.id == undefined) {
            command.id = +new Date()

            module.categories[category.name].commands.push(command)
        } else {
            const i = module.categories[category.name].commands.findIndex(c => c.id === command.id)
            module.categories[category.name].commands[i] = command
        }

        //fs.writeFileSync(path.resolve(__dirname, 'spoken1.yaml'), yaml.stringify(module) , 'utf-8')
    }

    removeCommand(
        module: string,
        category: { name: string, desc?: string },
        command: CommandDefinition
    ) {

    }

    listCommands() {
        return this.modules 
    }
}

export type ModuleDefinition = {
    name: string,
    desc: string,
    categories: {
        [key: string]:  {
            desc: string,
            commands: CommandDefinition[]
        }
    }
}

export type CommandDefinition = {
    id: number,
    desc: string,
    phrases: {
        [key: string]: string[]
    }
    impl: string
}
