import { app, BrowserWindow, ipcMain, screen, globalShortcut } from 'electron'
import path from 'path'
import SpokenInterface from './spoken-interface'
import EditorService from './editors/editor-service'

interface MyBrowserWindow extends BrowserWindow {
	recording?: boolean
}

let window: MyBrowserWindow | null = null

async function createWindow(): Promise<void> {
	window = new BrowserWindow({
		width: 320,
		height: 650,
		x: screen.getPrimaryDisplay().size.width - 370,
		y: 50,
		alwaysOnTop: true,
		webPreferences: {
			nodeIntegration: false,
			contextIsolation: true,
			preload: path.resolve(__dirname, 'preload.js')
		},
	})

	await window.loadURL('http://localhost:3000/')

	const ret = globalShortcut.register('CommandOrControl+X', () => {
		console.log('[wrapper.createWindow] Toggle Recording!')

		if (window != null) {
			window.webContents.send('VoiceRecognition:toggleRecording', !window.recording)
			window.recording = !window.recording
		}
	})

	if (!ret) {
		console.log('[wrapper.createWindow] Registration failed')
	}

	setTimeout(() => {
		window?.webContents?.send?.('Config:onChangeEditor', EditorService.state)
	}, 300)

	EditorService.onStateChange((s) => {
		window?.webContents?.send?.('Config:onChangeEditor', s)
	})

	ipcMain.on('Spoken:analyze', SpokenInterface.onComand)
	ipcMain.on('Config:onChangeEditor', (event, editor) => {
		EditorService.setCurrentEditor(editor)
		event.reply('Config:onChangeEditor', EditorService.state)
	})
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
	globalShortcut.unregister('CommandOrControl+X')
	// Unregister all shortcuts.
	globalShortcut.unregisterAll()
	app.quit()
})
