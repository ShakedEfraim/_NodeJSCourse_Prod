const WebSocket = require('ws');
const http = require('http');
const path = require('path');
const fs = require('fs');

const chatHandler = server => {
    const wss = new WebSocket.Server({server});

    wss.on('connection', ws =>{
        ws.on('message', message => {
            console.log(`Received:  ${message}`);        
            wss.clients.forEach(client => {
                if(client.readyState === WebSocket.OPEN){                
                    client.send(message);
                }
            });
        });
        ws.send(`Welcome to the chat`);
        console.log('Client connected');
    });
}
module.exports = {chatHandler};
