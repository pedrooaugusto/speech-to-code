export const window = {
    createOutputChannel() {
        return {
            appendLine: (text: string): void => {
                console.log(text)
            }
        }
    },
    showInformationMessage() {}
}

export const commands = {
    registerCommand() {}
}