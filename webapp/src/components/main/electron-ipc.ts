type ElectronIpc = {
    send: (channel: string, ...args: any) => void,
    on: (channel: string, cb: (...args: any) => void) => void
}

const fakeIpc: ElectronIpc = {
    send(channel) { console.warn('IPC not defined (this is a electron application!)') },
    on(channel, cb) { console.warn('IPC not defined (this is a electron application!)') }
}

// @ts-ignore
const _ipcRenderer: ElectronIpc = window?.ipcRenderer || fakeIpc

export default _ipcRenderer
export { _ipcRenderer as ipcRenderer }
