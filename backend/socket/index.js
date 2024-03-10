const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

io.on('connection', (socket)=>{
    console.log("A User Has Connected");

    socket.on('message', (msg) => {
        console.log('message: ' + msg);
        io.emit('chat message', msg);
    });
    socket.on('message1', (msg) => {
        console.log('message: ' + msg);
    });
    socket.on('message2', (msg) => {
        console.log('message: ' + msg);
    });
})

io.on('disconnect', () => {
    console.log('user disconnected');
});


app.listen(port, () => {
    console.log(`server is running at ${port}`);
});