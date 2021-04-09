const Editor = require('./index').default

async function main() {
    Editor.onStatusChange(() => {
        console.log(Editor.status)
    })
    
    Editor.turnOn()
    await wait(2000)
    // await Editor.newLine(1)
    // console.log(await Editor.moveCursorTo('END_LINE'))
    // console.log(await Editor.moveCursorTo(null, undefined, 6))
    console.log(await Editor.moveCursorTo('SYMBOL', 'o', 4))
    Editor.turnOff()
}

function wait(time = 300) {
    return new Promise((res, rej) => {
        setTimeout(res, time)
    })
}

(async function(){
    try {
        await main()
    } catch (err) {
        console.log(err.toString())
        Editor.turnOff()
    }
})()