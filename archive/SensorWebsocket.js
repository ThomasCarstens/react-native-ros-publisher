// import { createServer } from "http";
// import { parse } from "url";
// import { WebSocketServer } from "ws";

// Create the https server
// const server = createServer();
const http = require('http');
const server = http.createServer();

const webSocketsServerPort = 8000;
server.listen(webSocketsServerPort);
// Create two instance of the websocket server
const webSocket = require('websocket');
const ws1 = webSocket.server();
const ws2 = webSocket.server();
const wss1 = new ws1({ noServer: true });
const wss2 = new ws2({ noServer: true });

// Take note of client or users connected
const users = new Set();
 
/*For the first connection "/request" path
 We take note of the clients that initiated connection and saved it in our list
 */
wss1.on("connection", function connection(socket) {
  console.log("wss1:: User connected");
  const userRef = {
    socket: socket,
    connectionDate: Date.now(),
  };
  console.log("Adding to set");
  users.add(userRef);
});
 
/*
 For the second connection "/sendSensorData" path
 This is where we received the sensor reads from the ESP32 Dev module.
 Upon receiving the sensor read, we broadcast it to all the client listener
*/
wss2.on("connection", function connection(ws) {
  console.log("wss2:: socket connection ");
  ws.on('message', function message(data) {
      const now = Date.now();
 
      const parseData = JSON.parse(data);
      let message = { date: now, sensorData: parseData.value };
      const jsonMessage = JSON.stringify(message);
      sendMessage(jsonMessage);
  });
});
 
 
/*
This is the part where we create the two paths.  
Initial connection is on HTTP but is upgraded to websockets
The two path "/request" and "/sendSensorData" is defined here
*/
server.on("upgrade", function upgrade(request, socket, head) {
  const { pathname } = parse(request.url);
  console.log(`Path name ${pathname}`);
 
  if (pathname === "/request") {
    wss1.handleUpgrade(request, socket, head, function done(ws) {
      wss1.emit("connection", ws, request);
    });
  } else if (pathname === "/sendSensorData") {
    wss2.handleUpgrade(request, socket, head, function done(ws) {
      wss2.emit("connection", ws, request);
    });
  } else {
    socket.destroy();
  }
});
 
server.listen(8080);
 
const sendMessage = (message) => {
  // console.log("Sending messages to users!");
  for (const user of users) {
    user.socket.send(message);
  }
};