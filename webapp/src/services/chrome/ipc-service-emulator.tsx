import { ElectronIpc } from '../electron-ipc'
import SpokenInterface from './spoken-interface'

declare global {
    interface Window { recording: boolean }
}

export interface IPCEvent {
    reply: (channel: string, ...args: any) => void
}

class IPCService implements ElectronIpc {
    private handles = new Map<string, (event: IPCEvent, ...args: any) => void>()

    constructor() {        
        this.on('Spoken:executeCommand', SpokenInterface.onComand)
        this.on('Config:changeEditor', (event: IPCEvent, editor: any) => {
            this.send('Config:onChangeEditorState', [{ name: 'CODEMIRROR', status: 'ON', current: true }])
        })

        this.on('VoiceRecognition:setRecording', (event: IPCEvent, value: boolean) => {
            this.send('VoiceRecognition:toggleRecording', value)
        })
    }

    send(channel: string, ...args: any) {
        if (this.handles.has(channel)) {
            const cb = this.handles.get(channel)!

            // please dont do that
            // @ts-ignore
            if (cb.length === 1) setTimeout(() => cb(...args), 75)
            else setTimeout(() => cb({ reply: this.send.bind(this) }, ...args), 75)
        }
    }

    removeAllListeners (channel: string) {
        this.handles.delete(channel)
    }

    on(channel: string, cb: (event: IPCEvent, ...args: any) => void) {
        this.handles.set(channel, cb)
    }
}

window.ipcRenderer = window.ipcRenderer || new IPCService()

export default window.ipcRenderer