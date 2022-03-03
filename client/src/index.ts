require('dotenv').config({ path: require('path').resolve(__dirname, '.env') })

import { app, BrowserWindow, ipcMain, screen, globalShortcut, dialog, session } from 'electron'
import Spoken from 'spoken'
import path from 'path'
import { isDev, appVersion, tryAndGetGrammarFromNetwork } from './utils'
import SpokenInterface from './spoken-interface'
import EditorService from './editors/editor-service'

declare global {
	namespace NodeJS {
		interface Global { appRoot: string }
	}
}

declare interface MyBrowserWindow extends BrowserWindow {
	recording?: boolean
}

global.appRoot = path.resolve(__dirname, 'resources')

let window: MyBrowserWindow | null = null

async function createWindow(): Promise<void> {

	try {
		await EditorService.editors[0].checkPrerequisites()
	} catch (error) {
		dialog.showErrorBox('Error Locating Visual Studio Code', error.message)
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

	window.setMenuBarVisibility(false && isDev())

	window.webContents.on('new-window', function(e, url) {
		e.preventDefault()
		require('electron').shell.openExternal(url)
	})

	try {
		// Enforcing some headers required to access the api...
		const filter = { urls: [process.env.URL_FILTER as string] }

		session.defaultSession.webRequest.onBeforeSendHeaders(filter, (details, callback) => {
			const headerName = process.env.SPEECH2CODE_HEADER_NAME as string
			const headerValue = process.env.SPEECH2CODE_HEADER_VALUE as string

			details.requestHeaders[headerName] = headerValue
			details.requestHeaders['Speech2Code-Electron-Client-Version'] = appVersion

			callback({ requestHeaders: details.requestHeaders })
		})

		await Spoken.init(await tryAndGetGrammarFromNetwork(process.env.SERVICE_URL as string))

		await window.loadURL(process.env.SERVICE_URL as string)
	} catch(err) {
		const errPath = path.resolve(__dirname, 'error.html')

		console.log(err)
		console.log('Loading instead: ' + errPath)

		await window.loadFile(errPath)

		return
	}

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

