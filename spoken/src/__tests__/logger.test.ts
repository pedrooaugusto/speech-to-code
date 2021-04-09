import Logger from '../logger'

test('it can log shit', async () => {
    doShit()
})


function doShit() {
    Logger.info('Hello')
}