import React from 'react'
import { act, render, screen } from '@testing-library/react'
import { waitFor } from '@testing-library/dom'

import useAzureVoiceRecognition from '../services/azure/use-voice-recognition'
import { VoiceRecognitionHook } from '../services/use-voice-recognition'
import MyRecognizer from '../services/azure/voice-recognizer'

declare global {
    namespace NodeJS {
        interface Global {
            ipcRenderer: {
                send: jest.Mock
                on: jest.Mock 
            }
        }
    }
}

beforeAll(() => {
    jest.spyOn(MyRecognizer.prototype, 'init').mockImplementation(() => Promise.resolve())
})

test('it does not break', async () => {
    async function doRecognition(phrase: string, args: any) {
        act(() => {
            result.analyzeSentence(phrase, 1000)
        })

        const r = {
            _rawVoiceToTextResponse: { text: phrase },
            phrase: [phrase],
            command: args == null ? args : expect.objectContaining(args)
        }
    
        await waitFor(() => expect(global.ipcRenderer.send).toHaveBeenCalledWith('Spoken:analyze', r), { timeout: 2000 })
    }

    const result = setup()
    expect(result.results).toBe('')

    await doRecognition('TEST', null)

    await doRecognition('declarar constante chamada bola', {
        commandArgs: {
            memType: 0,
            name: "bola"
        }
    })

})

function setup(...args: any) {
    const returnVal = {}

    function TestComponent() {
      Object.assign(returnVal, useAzureVoiceRecognition())

      return null
    }

    render(<TestComponent />)

    return returnVal as ReturnType<VoiceRecognitionHook>
}
