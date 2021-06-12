import React from 'react'
import { act, render, screen } from '@testing-library/react'
import { waitFor } from '@testing-library/dom'
import Spoken from 'spoken'

import useAzureVoiceRecognition from '../services/azure/use-voice-recognition'
import { VoiceRecognitionHook } from '../services/use-voice-recognition'
import MyRecognizer from '../services/azure/voice-recognizer'
import GlobalContext from '../services/global-context'

declare global {
    namespace NodeJS {
        interface Global {
            ipcRenderer: {
                send: jest.Mock
                on: jest.Mock,
                removeAllListeners: jest.Mock
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

        const r = expect.objectContaining(args)

        await waitFor(
            () => expect(global.ipcRenderer.send).toHaveBeenCalledWith('Config:changeEditor', null), { timeout: 4000 }
        )

        await waitFor(
            () => expect(global.ipcRenderer.send).toHaveBeenCalledWith('Spoken:executeCommand', r), { timeout: 4000 }
        )
    }

    const result = setup()
    await waitFor(() => result.analyzeSentence != undefined)
    expect(result.results).toBe(null)

    await doRecognition('declarar constante chamada bola', {
        id: 'variable_assignment',
        args: {
            isNew: true,
            memType: 1,
            varName: 'bola',
            extra: {
                lang: 'pt-BR'
            }
        }
    })

})

function setup(...args: any) {
    const returnVal = {}

    function TestComponent() {
      Object.assign(returnVal, useAzureVoiceRecognition())

      return null
    }

    function Root() {
        return (
            <GlobalContext>
                <TestComponent/>
            </GlobalContext>
        )
    }

    render(<Root />)

    return returnVal as ReturnType<VoiceRecognitionHook>
}
