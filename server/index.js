const express = require('express');
const app = express();
const http = require('http');
const { Server } = require ('socket.io');
const cors = require('cors');

// room => id, name, admin, users
const rooms = [
    {
        id:0,
        name: "general",
        admin:"admin",
        users: [],
        messages: []
    }
];
// let storage_users = [{room:"general", users:new Set()}]
// let messages = [] // {name:general, messages: [{user:"",text:""}]}


app.use(cors())
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
       
    },
});



io.on('connection', (socket) => {
    // //console.log(`Here comes a new Challenger!`, socket.client.id);

    socket.on("con", (data)=>{
        //console.log("connected: ", data);
        rooms[0].users.push(data)
        //console.log("users: ", rooms[0].users)
        socket.emit("con", data + " just connected");
        io.emit("users", rooms[0].users);
        io.emit("rooms", rooms)
        io.emit("messages", rooms[0].messages)
    })
    
    socket.on("message", (message)=>{
        rooms[0].messages.push(message);
        console.log(message)
        io.emit("messages", rooms[0].messages)
    })

   

   
    socket.on("disconnected", (data)=>{
        //console.log("disconnected: ", data);
        rooms[0].users = rooms[0].users.filter(e=>e.id !== data.id);
        socket.emit("disconnected", rooms[0].users);
    })

    socket.on('disconnect', () => {
        rooms[0].users = rooms[0].users.filter(e=>e.id !== socket.id);
        //console.log('User disconnected', socket.id);
    }
    );
});

server.listen(3009, () => {
    console.log('Server is running in the 3009');
    
})