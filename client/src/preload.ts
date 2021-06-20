import { contextBridge, ipcRenderer } from 'electron'
import { appVersion } from './utils'

contextBridge.exposeInMainWorld(
    'ipcRenderer',
    {
        send: (channel: string, ...data: any[]) => {
            ipcRenderer.send(channel, ...data)
        },
        on: (channel: string, func: Function) => {
            ipcRenderer.on(channel, (event, ...args) => func(...args))
        },
        removeAllListeners: (str: string) => {
            ipcRenderer.removeAllListeners(str)
        }
    }
)

contextBridge.exposeInMainWorld('electronShellInfo', {
    appVersion: appVersion
})