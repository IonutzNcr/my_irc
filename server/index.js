const express = require('express');
const app = express();
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

// room => id, name, admin, users, messages
let rooms = [
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

    socket.on("con", (data) => {
        console.log("************** CON **************");
        console.log("data in con", data);
        let room = rooms.filter(room => room.name === data.inRoom);
        room[0].users.push(data)
        // socket.leave(data.inRoom)
        socket.join(data.inRoom)
        //console.log("users: ", rooms[0].users)
        io.to(data.inRoom).emit("con", data.name + " just connected");
        io.to(data.inRoom).emit("users", room[0].users);
        //FIXME: Hope is doing great
        console.log("*****CON rooom", room[0].admin)
        socket.emit("joined", data.inRoom, room[0].admin)
        //FIXME: Fixed for now 


        socket.emit("rooms", [rooms[0]])
        socket.emit("messages", room[0].messages)
    })

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
        socket.leave(room.name)
        socket.join(room.name)
        socket.emit("joined", room.name, room.admin) // send the room name to the client for it to know in wich room it is
        console.log("***messages envoyé vers le front ", r[0].messages)
        socket.emit("messages", r[0].messages)
        socket.emit("users", r[0].users)
        //FIXME: can be filtered to only send rooms in wich he is 
        let filteredRoomsByUser = rooms.filter(r => {
            for (let key in r.users) {
                if (r.users[key].name === room.admin) {
                    return r
                }
            }
        })
        console.log("******** CREATEANDJOIN ********");
        console.log("*******filteredRoomsByUser", filteredRoomsByUser)
        socket.emit("rooms", filteredRoomsByUser)
        cb({})
    })

    //FIXME: big problems here
    socket.on("join", (room, cb) => {
        console.log("**********************START**************************")
        console.log("************** JOIN **************");
        //check if room exist
        console.log("room is in socket join ", room)
        let filteredRoom = rooms.filter(r => r.name === room.name)
        console.log("****filteredRoom", filteredRoom)
        if (filteredRoom.length === 1) {
            let userIn = false;
            for (let key in filteredRoom[0].users) {
                console.log("******* JOIN")
                // console.log("filteredRoom.users[key].name", filteredRoom.users[key].name)
                if (filteredRoom[0].users[key].name === room.user) {
                    console.log("user is in room")
                    userIn = true;
                }
            }
            console.log("*****JOIN");
            console.log("*****userIn", userIn)
            if (!userIn) {
                filteredRoom[0].users.push({ name: room.user, id: socket.id, inRoom: room.name })
            }
            console.log("***inside joined stuff", filteredRoom[0])
            socket.join(room.name);
            //FIXME: problem here
            console.log("****join room.user", room.user);
            socket.emit("joined", room.name, filteredRoom[0].admin) // send the room name to the client for it to know in wich room it is);
            console.log("***messages envoyé vers le front ", filteredRoom[0].messages)

            io.to(room.name).emit("users", filteredRoom[0].users)
            //FIXME: can be filtered to only send rooms in wich he is 
            let filteredRoomsByUser = rooms.filter(r => {
                for (let key in r.users) {
                    if (r.users[key].name === room.user) {
                        return r
                    }
                }
            })
            console.log("******** JOIN ********");
            console.log("*******filteredRoomsByUser", filteredRoomsByUser)
            socket.emit("rooms", filteredRoomsByUser)
            socket.emit("messages", filteredRoom[0].messages)
            cb("joined successfully")
            console.log("**********************END**************************")
        }


    })

    socket.on('searchRooms', (data, cb) => {
        console.log("************** SEARCH ROOMS **************");
        let searchedrooms = rooms.filter(room => {
            if (room.name.includes(data.searchTerm)) {
                return room
            }
        })
        // console.log("datasearch", data.searchTerm)
        // console.log(data.user, rooms[0].users)

        let searchedRoomsWithoutUser = searchedrooms.filter(room => {
            // console.log("room.users.name", room)
            let inTrue = false;
            for (let key in room.users) {

                if (room.users[key].name === data.user) {
                    inTrue = true;
                }
            }

            if (!inTrue) return room

        })
        console.log("searchedRoomsWithoutUser", searchedRoomsWithoutUser)
        cb(searchedRoomsWithoutUser);

    })

    socket.on("leave", (data, cb) => {
        //data.room && data.user
        console.log("************** LEAVE **************");
        console.log("data in leave", data)
        //find the room
        let room = rooms.filter(r => r.name === data.room)[0]
        if (room.admin === data.user) {
            rooms = rooms.filter(r => r.name !== data.room)
            io.emit("update", { rooms, roomsToDelete: [room] });
        } else {
            //remove user from the room
            room.users = room.users.filter(u => u.name !== data.user)
            //leave the room
            socket.leave(data.room)
            //send the updated users list
            io.to(data.room).emit("users", room.users)
            //send the updated rooms list
            let filteredRoomsByUser = rooms.filter(r => {
                for (let key in r.users) {
                    if (r.users[key].name === data.user) {
                        return r
                    }
                }
            })
            console.log("******** LEAVE ********");
            console.log("*******filteredRoomsByUser", filteredRoomsByUser)
            socket.emit("rooms", filteredRoomsByUser)
        }



        cb("left successfully")
    }
    )

    socket.on("disconnected", (data) => {
        console.log("************** DISCONNECTED **************");

        //find the user 
        let user = rooms[0].users.filter(e => e.id === socket.id)[0]
        // find all rooms he created and delete them
        let roomsToKeep = rooms.filter(r => r.admin !== user.name)
        let roomsToDelete = rooms.filter(r => r.admin === user.name)
        rooms = [...roomsToKeep];
        //remove user from all the rooms where he is 
        rooms.forEach(room => {
            room.users = room.users.filter(u => u.name !== user.name)
        })

        io.emit("update", { rooms, roomsToDelete });



    })

    socket.on('disconnect', () => {
        console.log("************** DISCONNECT **************");


        //console.log('User disconnected', socket.id);
    }
    );
});

server.listen(3009, () => {
    console.log('Server is running in the 3009');

})



