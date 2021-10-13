const WS = require('ws')
const port = 6969
const wss = new WS.Server({ port})
const readline = require('readline')
const rl  =readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
wss.on("connection", (ws) => {
    console.log(`connected to ${ws}`)
    rl.on("line", msg => {
        ws.send(msg)
    })        
    ws.on("message", (message) => {
        console.log(message.toString())
    })
})