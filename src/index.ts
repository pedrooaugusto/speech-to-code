import { app, BrowserWindow, ipcMain, clipboard, screen } from 'electron'
import path from 'path'
import SpokenInterface from './spoken-interface'

let window = null

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

	await window.loadFile('dist/webapp/index.html')
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
	app.quit()
})

ipcMain.on('command', SpokenInterface.onComand)
