export default {
    info(...data: any[]) {
        if (process?.env?.JEST_WORKER_ID) return

        const lines = Error().stack?.split('\n').slice(2, 3)[0]

        console.info('[INFO]', '[' + lines?.trim() + ']:', ...data)
    }
}