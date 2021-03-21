const fakeIpc = {
    send() { console.warn('IPC not defined (this is a electron application!)') },
    on() { console.warn('IPC not defined (this is a electron application!)') }
}

const _ipcRenderer = window.ipcRenderer || fakeIpc

export default _ipcRenderer
export { _ipcRenderer as ipcRenderer }
