let ws;

function connectWebSocket(){
    ws = new WebSocket('ws://localhost:3000');

    ws.onopen = () =>{
        console.log('Connected to the ws server');
    };
    ws.onmessage = (event) =>{
        const chat = document.getElementById('chat');
        const message = document.createElement('div');
       const reader = new FileReader();

       reader.onload = () => {
        message.textContent = reader.result;
        chat.appendChild(message);
       };

       if(event.data instanceof Blob){
        reader.readAsText(event.data);
       }
    };

    ws.onclose = () =>{};    
}
function sendMessage () {
    if (ws.readyState === WebSocket.OPEN){
        const input = document.getElementById('message');
        ws.send(input.value);
    }
}

connectWebSocket();