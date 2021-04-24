export const config = {
    id: '',
    retry: false,
    silent: false
}

const map = new Map()
let init: Function | null = null
let idInterval: NodeJS.Timeout | null = null
const queue: any[] = []

export function serve(cb: Function) {
    init = cb
}

export const server = {
    start() {
        if (init == null) return

        init()

        idInterval = setInterval(() => {
            const item = queue.splice(0, 1)

            if (!item.length) return

            const { channel, event } = item[0]

            map.get(channel)(event, null)

        }, 700)
    },
    stop() {
        clearInterval(idInterval as NodeJS.Timeout)
        map.clear()
        init = null
    },
    on(channel: string, callback: Function) {
        map.set(channel, callback)
    },
    emit(socket: any, channel: string, evt: any) {
        queue.push({channel, event: evt})
    }
}

export function send(channel: string, evt: any) {
    queue.push({channel, event: evt})
}

export function listen(channel: string, cb: Function) {
    map.set(channel, cb)
}