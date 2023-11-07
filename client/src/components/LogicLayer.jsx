//Not use anymore

// import React, { useEffect, useState } from 'react'
// import { socket } from "../connexion.jsx"

// import { Chat } from './Chat.jsx';
// import { Rooms } from './Rooms.jsx';

// //event is SetName
// export const LogicLayer = ({ name, event }) => {
//     const [allRooms, setAllRooms] = useState([]); // state pour recuperer tout les rooms depuis le server
//     const [myRooms, setMyRooms] = useState([]);
//     const [currentRoom, setCurrentRoom] = useState(null) // la salle qui est active 

//     useEffect(() => {

//         socket.emit("ask_rooms")

//         socket.on("get_rooms", (recieved) => {
//             //console.log("inside event get room", recieved)
//             setAllRooms(recieved.map((room) => {
//                 return room
//             }))

//         })
//     }, [])

//     useEffect(() => {
//         if (allRooms.length > 0) {
//             //console.log("c'est bon normalement ")
            
//             setCurrentRoom(allRooms[0]?.name)
//         }
//         //console.log("check if allRooms has isActive attribute", allRooms);
        
//     },[allRooms])

//     useEffect(() => {
//         if (currentRoom != undefined) {
//             //console.log("i'm here", currentRoom)
//             socket.emit('join_room', { room: currentRoom, user: name })
//         }

//     }, [currentRoom])


//     return (
//         <div>
//             <Chat username={name} event={event}  allRooms = {allRooms} currentRoom={currentRoom} updateRooms={updateRooms} />
//             {/* <Rooms /> */}

//         </div>
//     )
// }
