import { app, BrowserWindow, ipcMain, screen, globalShortcut, dialog } from 'electron'
import Spoken from 'spoken'
import path from 'path'
import SpokenInterface from './spoken-interface'
import EditorService from './editors/editor-service'

declare global {
	namespace NodeJS {
		interface Global { appRoot: string }
	}
}

global.appRoot = path.resolve(__dirname, 'resources')

interface MyBrowserWindow extends BrowserWindow {
	recording?: boolean
}

let window: MyBrowserWindow | null = null

async function createWindow(): Promise<void> {

	const requisities = await EditorService.editors[0].checkPrerequisities()

	if (requisities != null) {
		if (requisities.error) {
			dialog.showErrorBox('Error Locating Visual Studio Code', requisities.message)

			return app.quit()
		}

		if (requisities.message != null && requisities.message != '') {
			// @ts-ignore
			dialog.showMessageBoxSync(null, {
				type: 'info',
				title: 'Required Visual Studio Code extension not found!',
				message: requisities.message
			})
		}
	}

	window = new BrowserWindow({
		width: 320,
		height: 685,
		x: screen.getPrimaryDisplay().size.width - 370,
		y: 50,
		alwaysOnTop: true,
		webPreferences: {
			nodeIntegration: false,
			contextIsolation: true,
			preload: path.resolve(__dirname, 'preload.js')
		},
		icon: path.resolve(__dirname, 'icons', 'icon36x36.ico')
	})

	window.webContents.on('new-window', function(e, url) {
		e.preventDefault()
		require('electron').shell.openExternal(url)
	})

	window.setMenuBarVisibility(false)

	await Spoken.init()
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

	EditorService.onStateChange((s) => window?.webContents?.send?.('Config:onChangeEditorState', s))
	EditorService.init()

	ipcMain.on('Spoken:executeCommand', SpokenInterface.onComand)
	ipcMain.on('Config:changeEditor', (event, editor) => {
		if (editor) EditorService.setCurrentEditor(editor)

		event.reply('Config:onChangeEditorState', EditorService.state)
	})

	ipcMain.on('VoiceRecognition:setRecording', (event, value: boolean) => {
		window!.webContents.send('VoiceRecognition:toggleRecording', value)
		window!.recording = value
	})
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
	setTimeout(() => {
		EditorService.stop()
		globalShortcut.unregister('CommandOrControl+X')
		// Unregister all shortcuts.
		globalShortcut.unregisterAll()
		app.quit()
	}, 1000)
})
