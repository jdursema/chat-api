const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const bodyParser = require('body-parser');
const port = 3000;
const db = require('./postgresClient');
const querystring = require('querystring');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.get('/users', db.getUsers);

app.post('/users', db.addUser);

app.get('/messages', db.getMessages);

app.post('/messages', db.sendMessage);

server.listen(port, () => {
  console.log('listening on *:'+ port);
})

module.exports = server;
