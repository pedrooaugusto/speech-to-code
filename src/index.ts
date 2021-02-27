import { app, BrowserWindow, ipcMain, screen, globalShortcut } from 'electron'
import path from 'path'
import SpokenInterface from './spoken-interface'

interface MyBrowserWindow extends BrowserWindow {
	recording?: boolean
}

let window: MyBrowserWindow | null = null

async function createWindow(): Promise<void> {
	window = new BrowserWindow({
		width: 300,
		height: 650,
		x: screen.getPrimaryDisplay().size.width - 350,
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
		console.log('[SpeechToText.index] Toggle Recording!')

		if (window != null) {
			window.webContents.send('VoiceRecognition:toggleRecording', !window.recording)
			window.recording = !window.recording
		}
	})

	if (!ret) {
		console.log('registration failed')
	}
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
	globalShortcut.unregister('CommandOrControl+X')
	// Unregister all shortcuts.
	globalShortcut.unregisterAll()
	app.quit()
})

ipcMain.on('Spoken:analyze', SpokenInterface.onComand)
