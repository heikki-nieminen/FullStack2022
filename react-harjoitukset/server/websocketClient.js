const readline = require('readline')
const {WebSocket} = require('ws')
let rl = null
const socket = new WebSocket('ws://localhost:8080/')

socket.onopen = (e) => {
	rl = readline.createInterface(process.stdin, process.stdout)
	rl.setPrompt(`>`);
	rl.on('line', (teksti) => {
		socket.send(teksti)
	})
	
}

socket.onmessage = (e) => {
	console.log(">"+e.data.toString())
	rl.prompt()
}

socket.onerror = (err) => {
	console.log("ERROR: "+err.message)
}