const ws = require('ws')
const http = require('http')

const wss = new ws.Server({port: 8080})

let clients = []

wss.on('connection', (ws) => {
	console.log("New client connected")
	ws.nickname = "Anonymous"+Math.floor(Math.random() * 1000)
	ws.send("Tervetuloa palvelimelle "+ws.nickname)
	clients.push(ws)
	ws.on('message', (data) => {
		console.log(data)
		clients.forEach((item) => {
			if(ws.nickname !== item.nickname) {
				item.send(ws.nickname+": "+data)
			}
		})
	})
})



/*const accept = (req, res) => {
	if(!req.headers.upgrade || req.headers.upgrade.toLowerCase() != 'websocket'){
		res.end()
		return
	}
	if(!req.headers.connection.match(/\bupgrade\b/i)){
		res.end()
		return
	}
	wss.handleUpgrade(req,req.socket, Buffer.alloc(0), onConnect)
}*/

/*const onConnect = (ws) =>{
	ws.on('connection', (ws) => {
		console.log("???")
	})
	ws.on('message', (message) => {
		console.log("New client connected")
		console.log(message)
		ws.send("VASTAUS")
	})
}*/

/*
if (!module.parent) {
	http.createServer(accept).listen(8080)
}else {
	exports.accept = accept
}*/
