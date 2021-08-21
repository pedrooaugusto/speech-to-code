import { ElectronIpc } from '../../../services/electron-ipc'
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
        this.onMain('Spoken:executeCommand', SpokenInterface.onComand)
        this.onMain('Config:changeEditor', (event: IPCEvent, editor: any) => {
            this.send('Config:onChangeEditorState', [{ name: 'CODEMIRROR', status: 'ON', current: true }])
        })

        this.onMain('VoiceRecognition:setRecording', (event: IPCEvent, value: boolean) => {
            this.send('VoiceRecognition:toggleRecording', value)
        })
    }

    send(channel: string, ...args: any) {
        if (this.handles.has(channel)) {
            const cb = this.handles.get(channel)!

            setTimeout(() => cb({ reply: this.send.bind(this) }, ...args), 75)
        }
    }

    removeAllListeners (channel: string) {
        this.handles.delete(channel)
    }

    on(channel: string, cb: (...args: any) => void) {
        // Remove Event argument
        this.handles.set(channel, (event: IPCEvent, ...args) => cb(...args))
    }

    onMain(channel: string, cb: (event: IPCEvent, ...args: any) => void) {
        this.handles.set(channel, cb)
    }
}

window.ipcRenderer = window.ipcRenderer || new IPCService()

export default window.ipcRenderer