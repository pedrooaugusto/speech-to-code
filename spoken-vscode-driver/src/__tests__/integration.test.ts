jest.mock('../vscode', () => {
	const Fake = require('./my-vscode')

	return { ...Fake }
})

jest.mock('node-ipc', () => {
	const Fake = require('./my-node-ipc')

	return { ...Fake }
})

jest.mock('../robot-vscode')

import { activate, deactivate } from '../extension'
import { send, listen } from './my-node-ipc'
import RobotVscode from '../robot-vscode'
import * as vscode from 'vscode'


beforeAll(() => {
	activate(new FakeExtensionContext() as vscode.ExtensionContext)
})

afterAll(() => {
	deactivate()
})

test('it does not break', (done) => {
	send('runCommand', {
		type: 'write',
		context: {},
		extra: {
			args: ['hello man']
		},
		id: 42
	})

	listen('runCommand/response', (evt: any) => {
		expect(evt.id).toBe(42)
		expect(RobotVscode.write).toHaveBeenCalledWith('hello man')
		done()
	})
})


class FakeExtensionContext {
	subscriptions: { dispose(): any} [] = []
}
