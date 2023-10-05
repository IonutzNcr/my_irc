const express = require('express');
const app = express();
const http = require('http');
const { Server } = require ('socket.io');
const cors = require('cors');


let storage_rooms = [{id:0, name: "general", admin:"admin"}];
let storage_users = [{room:"general", users:new Set()}]
let messages = [] // {name:general, messages: [{user:"",text:""}]}


app.use(cors())
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST']
    },
});

io.on('connection', (socket) => {
    console.log(`Here comes a new Challenger!:${socket.id}`);

    socket.on("ask_rooms",(data)=>{
        console.log(data);
        console.log("envoyé ::: ")
        socket.emit("get_rooms", storage_rooms.map((e)=>{return {id: e.id, admin:e.admin ,name: e.name}} ))
    })

    socket.on('join_room', (data) => {
        console.log("join data: ", data.room, data.user)
         
        // chercher dans l'array pour voir si je peux joindre 
        let found = storage_rooms.filter(item=>item.name = data.room)[0] ?? null
        if(found) {
            let index = storage_users.findIndex(item=>item.room == data.room);
            if(index == -1) {
                storage_users.push({room:data.room, users: new Set([data.user])})
            } else {
                storage_users.users.add(data.user)
            }
            socket.join(data.room)
        } else {
            socket.emit("join_erreur", `${data.room} doesn't exists! `)
        }
        
       
            
    });

  
    socket.on("create_room",(room)=>{
        let filteredItems = storage.filter(channel => channel.name == room.name)
        if(filteredItems.length > 0) {
            socket.emit('message_create_room', {message: `${room.name} already exist`, username:"info"})
        } else {
            let newChannel = {id:room.id, name:room.name, admin:room.admin, users:[]}
            storage.push(newChannel);
            socket.emit("message_create_room", true);
        }
    })
    
    socket.on('send_message', (data) => {
        // console.log("debug(1):",data.room); // room n'existe pas wtf
        socket.to(data.room).emit('receive_message', data);
    });

    /************* Users ******************/

    // socket.on("users", (data)=>{
    //     console.log("in users: ", data);
    //     let users = storage.find(e=> e.name === data )     
    //     console.log("users in ...", users);
    //     socket.emit("users_req", users);
    // })

    socket.on('disconnect', () => {
        console.log('User disconnected', socket.id);
    }
    );
});

server.listen(3009, () => {
    console.log('Server is running in the 3009');
})