const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const User = require("../Modals/User");
 
let Messages =[];

const io = require("socket.io")(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    }
  });


const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

console.log("Server Running")
io.listen(port, () => {
    console.log(`server is running at ${port}`);
});

io.on('connection', (socket)=>{
    console.log("A User Has Connected");
    io.emit('chat_message', Messages);
    socket.on('message', (msg) => {
        const UserMessage =  JSON.parse(msg);
        console.log('message: ' + msg);
        console.log('message: ' + UserMessage);
        Messages.unshift(UserMessage);
        if (Messages.length>20) {
            Messages.pop();
        }
        io.emit('chat_message', Messages);
        
    });
    socket.on('message1', (msg) => {
        console.log('message: ' + msg);
    });
    socket.on('message2', (msg) => {
        console.log('message: ' + msg);
    });
    socket.on('disconnect', (msg) => {
        console.log('user Disconnected: ' + msg);
    });
})

const addMessage =async (Email)=>{
    const existUser = await User.findOne({ Email: Email });
}

// io.on('disconnect', () => {
//     console.log('user disconnected');
// });


