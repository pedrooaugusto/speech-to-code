type IO = {
    to: () => void
}

type Socket = {
    emit: (channel: string, ...args: any) => void,
    on: (channel: string, cb: (...args: any) => void) => void
}

// @ts-ignore
const _io: IO = window.io
// @ts-ignore
const socket: Socket = window.io()

export default socket
export { _io as io }