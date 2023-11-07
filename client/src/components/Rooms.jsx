// import { useEffect, useState } from "react"

// //channels 
// // doit avoir acces a quoi??? --> a rien || aux rooms si on decide de les mettre au niveau superieur via context ou etat
// // qui peut agir sur channels??? --> le chat via des commandes 

// export default function Rooms({ socket, author }) {

//     const [rooms, setRooms] = useState([]);
//     const [modal, setModal] = useState(false);

//     socket.on("rooms", (data) => {
//         setRooms(data);
//     })

//     function openModalCreate(){
//         setModal("create");
//     }

//     function cancel(){
//         setModal(false);
//     }

//     function createRoom(e){
//         e.preventDefault();
//         console.log(e.target[0].value);
//         socket.emit("createAndJoin",{
//             name:e.target[0].value,
//             admin: author,
//         })
//     }

//     function joinRoom(e){
//         e.preventDefault();
//         console.log(e.target[0].value);
//         socket.emit("join",{
//             name:e.target[0].value,
//             user: author,

//         }, (data)=>{
//             console.log(data);
//         })
//     }

//     return (
//         <div className="w-[24%]">
//             <div >
//                 {rooms.map((room, index) => {
//                     if (room.users.filter(u => u.id === socket.id).length === 1) {
//                         return (
//                             <div key={room.id} className="text-green-400">
//                                 {room.name}
//                             </div>
//                         )
//                     }
//                     if (index < 10) {
//                         return (
//                             <div key={room.id} className="text-grey-500">
//                                 {room.name}
//                             </div>
//                         )
//                     }

//                 })}
//             </div>
//         <div className="flex flex-col gap-5">
//                 <button onClick={openModalCreate} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Create Room</button>
//                 <button onClick={() => setModal("join")} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Join Room</button>
//             </div>
//             {
//                 (modal === "create") && 
//                 <form onSubmit={createRoom}>
//                     <label htmlFor="name"></label>
//                     <input placeholder="...name" type="text" />
//                     <button type="submit">Create</button>
//                     <button onClick={cancel} type="button">Cancel</button>
//                 </form>
//             }

// {
//                 (modal === "join") && 
//                 <form onSubmit={joinRoom}> 
//                     <label htmlFor="name"></label>
//                     <input placeholder="...name" type="text" />
//                     <button type="submit">Join</button>
//                     <button type="button">Cancel</button>
//                 </form>
//             }
//         </div>

//     )
// }
