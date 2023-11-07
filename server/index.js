const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

// room => id, name, admin, users, messages
const rooms = [
    {
        id: 0,
        name: "default",
        admin: "admin",
        users: [],
        messages: []
    },
    // {
    //     id:1,
    //     name:'general',
    //     admin:'admin',
    //     users:[],
    //     messages:[]
    // }
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

    // socket.on("con", (data) => {
    //     console.log("************** CON **************");
    //     let room = rooms.filter(room => room.name === data.inRoom);
    //     room[0].users.push(data)
    //     socket.join(data.inRoom)
    //     //console.log("users: ", rooms[0].users)
    //     io.to(data.inRoom).emit("con", data.name + " just connected");
    //     io.to(data.inRoom).emit("users", room[0].users);
    //     io.to(data.inRoom).emit("rooms", rooms)
    //     io.to(data.inRoom).emit("messages", room[0].messages)
    // })

        //FIXME: debugging
    socket.on("message", (message, cb) => {
        console.log("************** MESSAGES **************");
        let room = rooms.filter(r => r.name === message.inRoom)[0]
        // let troom = rooms.filter(r=>r.name === message.inRoom)
        // console.log("this is for tRoom ", troom)
        room.messages.push(message);
        console.log("in message socket", message, message.inRoom)

        io.to(message.inRoom).emit("messages", room.messages)
        console.log("***message envoyé")
        cb(`${message.inRoom}`);
    })

    // create rooms
    socket.on("createAndJoin", (room, cb) => {
        console.log("****** CreateAndJoin *******")
        //check if room exist
        if (rooms.filter(r => r.name === room.name).length == 1) {
            cb({ error: `Err : ${room.name} exists already!` })
            return
        }

        //stocker la room
        rooms.push({
            id: rooms.length + 1,
            name: room.name,
            admin: room.admin,
            users: [{ name: room.admin, id: socket.id, inRoom: room.name }],
            messages: []
        })

        // console.log("I have this many", rooms)
        //rejoindre le channel créer
        let r = rooms.filter(r => r.name === room.name)
        socket.join(room.name)
        socket.emit("joined", room.name) // send the room name to the client for it to know in wich room it is
        console.log("***messages envoyé vers le front ", r[0].messages)
        socket.emit("messages", r[0].messages)
        socket.emit("users", r[0].users)
        //FIXME: can be filtered to only send rooms in wich he is 
        socket.emit("rooms", rooms)
        cb({})
    })

    socket.on("join", (room, cb) => {
        console.log("************** JOIN **************");
        //check if room exist
        console.log("room is in socket join ", room)
        let filteredRoom = rooms.filter(r => r.name === room.name)
        console.log("filteredRoom", filteredRoom)
        if (filteredRoom.length === 1) {
            let userIn = false;
            for(let key in filteredRoom.users){
                if(filteredRoom.users[key] === room.user){
                    console.log("user is in room")
                    userIn = true;
                }
            }
            if(!userIn){
                filteredRoom[0].users.push({ name: room.user, id: socket.id, inRoom: room.name })
            }
           console.log("inside joined stuff", filteredRoom[0])
            socket.join(room.name);
            socket.emit("joined", room.name, room.admin);
            console.log("***messages envoyé vers le front ", filteredRoom[0].messages)
            socket.emit("messages", filteredRoom[0].messages)
            socket.emit("users", filteredRoom[0].users)
            //FIXME: can be filtered to only send rooms in wich he is 
            socket.emit("rooms", rooms)
            cb("joined successfully")
        }


    })

    socket.on('searchRooms',(data,cb)=>{
        console.log("************** SEARCH ROOMS **************");
        let searchedrooms = rooms.filter(room=>{
            if(room.name.includes(data.searchTerm)){
                return room
            }
        })
        // console.log("datasearch", data.searchTerm)
        // console.log(data.user, rooms[0].users)

        let searchedRoomsWithoutUser = searchedrooms.filter(room=>{
            // console.log("room.users.name", room)
            let inTrue = false;
            for(let key in room.users){
               
                if(room.users[key].name === data.user){
                    inTrue = true;
                } 
            }

            if(!inTrue) return room

        })
        console.log("searchedRoomsWithoutUser", searchedRoomsWithoutUser) 
        cb(searchedRoomsWithoutUser);

    })

    socket.on("disconnected", (data) => {
        console.log("************** DISCONNECTED **************");
        //console.log("disconnected: ", data);
        rooms[0].users = rooms[0].users.filter(e => e.id !== data.id);
        socket.emit("disconnected", rooms[0].users);
    })

    socket.on('disconnect', () => {
        console.log("************** DISCONNECT **************");
        rooms[0].users = rooms[0].users.filter(e => e.id !== socket.id);
        //console.log('User disconnected', socket.id);
    }
    );
});

server.listen(3009, () => {
    console.log('Server is running in the 3009');

})



