const net = require('net')
const readline = require('readline')
const client = new net.Socket()
let rl = null

client.connect(1337, '127.0.0.1', () => {
	console.log('Connected');
	rl = readline.createInterface(process.stdin, process.stdout)
	rl.setPrompt(`>`);
	rl.on('line', (teksti) => {
		client.write(teksti)
	});
});

client.on('data', (data) => {
	console.log(data.toString())
	rl.prompt()
});

client.on('close', () => {
	rl.close();
	console.log('Connection closed');
});