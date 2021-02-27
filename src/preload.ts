import { contextBridge, ipcRenderer } from 'electron'

contextBridge.exposeInMainWorld(
    'ipcRenderer',
    {
        send: (channel: string, data: any) => {
            ipcRenderer.send(channel, data)
        },
        on: (channel: string, func: Function) => {
            ipcRenderer.on(channel, (event, ...args) => func(...args))
        }
    }
)
