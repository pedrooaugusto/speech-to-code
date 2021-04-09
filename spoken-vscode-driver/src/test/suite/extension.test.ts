import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
// import * as myExtension from '../../extension';
import { createInstance } from '../../robot-vscode'

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.')
	const robotEditor = createInstance()

	test('Sample test', () => {
		assert.strictEqual(-1, [1, 2, 3].indexOf(5))
		assert.strictEqual(-1, [1, 2, 3].indexOf(0))
	})

	test('Sample test', (done) => {
		vscode.commands.executeCommand('workbench.action.files.newUntitledFile').then(a => {
			robotEditor.write('hello').then(() => {				
				robotEditor.newLine(1).then(() => {
					robotEditor.newLine(0).then(done)
				})
			})
		})
	})
})
