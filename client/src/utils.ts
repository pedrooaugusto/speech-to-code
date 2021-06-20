export function isDev() {
    return process?.mainModule?.filename?.indexOf?.('app.asar') === -1
}

export const appVersion = require('../package.json').version
