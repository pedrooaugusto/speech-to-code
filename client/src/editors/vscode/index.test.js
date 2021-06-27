const Editor = require('./index').default

async function main() {
    Editor.onStatusChange(() => {
        console.log(Editor.status)
    })
    
    Editor.turnOn()
    await wait(2000)

    const info = await Editor.fileInfo()

    await Editor.remove(4)

    // await Editor.writeOnTerminal('node "' + info.fileName + '"')
    // await Editor.newLine(1)
    // console.log(await Editor.moveCursorTo('END_LINE'))
    // console.log(await Editor.moveCursorTo(null, undefined, 6))
    // console.log(await Editor.moveCursorTo('SYMBOL', 'o', 4))
    // console.log(await Editor.select(12, 14, !false))
    // await Editor.moveCursorTo('BEGIN_LINE')
    // const b = await Editor.moveCursorTo('SYMBOL', 'c', 3, !false)
    // const a = await Editor.findPositionOf('b')
    // const b = await Editor.findPositionOf(']')

    // console.log(a)
    // console.log(b)
    // const c = await Editor.select(a[0][0], b[2][1] - 1, false)
    // console.log(c)
    //const e = await Editor.moveCursorTo('SYMBOL', 'e', undefined, false)
    //console.log(await Editor.select(b, e, false))
    // await Editor.write('hello')
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