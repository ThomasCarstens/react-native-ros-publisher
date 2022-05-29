const webSocketsServerPort = 8000;
const webSocketServer = require('websocket').server;
const http = require('http');
// Spinning the http server and the websocket server.
const server = http.createServer();
server.listen(webSocketsServerPort);
const wsServer = new webSocketServer({
  httpServer: server
});

// I'm maintaining all active connections in this object
const clients = {};

// This code generates unique userid for everyuser.
const getUniqueID = () => {
  const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  return s4() + s4() + '-' + s4();
};

wsServer.on('request', function(request) {
  var userID = getUniqueID();
  console.log((new Date()) + ' Recieved a new connection from origin ' + request.origin + '.');
  // You can rewrite this part of the code to accept only the requests from allowed origin
  const connection = request.accept(null, request.origin);
  clients[userID] = connection;
  console.log('connected: ' + userID + ' in ' + Object.getOwnPropertyNames(clients))
});

wsServer.on('close', function(connection) {
  console.log((new Date()) + " Peer " + userID + " disconnected.");
  const json = { type: typesDef.USER_EVENT };
  userActivity.push(`${users[userID].username} left the document`);
  json.data = { users, userActivity };
  delete clients[userID];
  delete users[userID];
  sendMessage(JSON.stringify(json));
});


/* When a user joins, I notify the
server that a new user has joined to edit the document. */
logInUser = () => {
  const username = this.username.value;
  if (username.trim()) {
    const data = {
      username
    };
    this.setState({
      ...data
    }, () => {
      client.send(JSON.stringify({
        ...data,
        type: "userevent"
      }));
    });
  }
}

/* When content changes, we send the
current content of the editor to the server. */
onEditorStateChange = (text) => {
 client.send(JSON.stringify({
   type: "contentchange",
   username: this.state.username,
   content: text
 }));
};