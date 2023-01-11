const net = require('net');

const chatters = []

const server = net.createServer((socket) =>{
	socket.on('data',(data) =>{
		let text = data.toString()
		if(text[0].toString() === "/"){
			const words = data.toString().split(' ')
			const command = words[0]
			switch (command) {
				case "/nickname" : {
					socket.nickname = words[1]
					socket.write("Nimimerkki vaihdettu")
					break
				}
				case "/pm" : {
					const message = words.slice(2).join(' ')
					const recipient = chatters.find(item =>{
						return item.nickname === words[1]
					})
					if(recipient){
						recipient.write("PM "+socket.nickname+": "+message)
					}
					else{
						socket.write("Kyseistä chattaajaa ei löydy")
					}
					break
				}
				default : {
					socket.write("Väärä komento")
				}
			}
		}
		else{
			chatters.forEach((item) => {
				if(socket.nickname !== item.nickname){
					item.write(socket.nickname+": "+data)
				}
			})
		}
	});
	socket.on('close', () =>{
		console.log('Connection closed');
	});
})

server.listen(1337, '127.0.0.1');

server.on('connection', (_socket)=> {
	_socket.nickname = "Anonymous"+Math.floor(Math.random() * 1000)
	_socket.write('Echo server\r\n');
	chatters.push(_socket)
	console.log("New client has joined!")
	//console.log(_socket)
})

server.on('error', (err) => {

})

