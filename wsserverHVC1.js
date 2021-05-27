const WebSocket = require('ws');

console.log('Welcome');

const wss = new WebSocket.Server({ port: 8888 });

wss.on('connection', function connection(ws) {
    console.log('connected to websocket');
    console.log('Number connections: '+wss.clients.size);
    ws.on('close', function close() {
        //connected=false;
        /*hvcp2_R.disconnect().then(() => {
            console.log('Disconnecting.');
        }).catch((error) => {
            console.error(error);
        });*/
        if (wss.clients.size==0){
            connected=false;
        }
        console.log('disconnected');
    });
    //ws.send('hello world');
});
