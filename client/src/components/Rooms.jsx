import { useEffect, useState } from "react"

//channels 
// doit avoir acces a quoi??? --> a rien || aux rooms si on decide de les mettre au niveau superieur via context ou etat
// qui peut agir sur channels??? --> le chat via des commandes 

export default function Rooms({ socket, author }) {

    const [rooms, setRooms] = useState([])

    socket.on("rooms", (data) => {
        setRooms(data);
    })



    return (
        <div >
            <div >
                {rooms.map((room, index) => {
                    if (room.users.filter(u => u.id === socket.id).length === 1) {
                        return (
                            <div key={room.id} className="text-green-400">
                                {room.name}
                            </div>
                        )
                    }
                    if (index < 10) {
                        return (
                            <div key={room.id} className="text-grey-500">
                                {room.name}
                            </div>
                        )
                    }

                })}
            </div>
            <div >
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Create Room</button>
            </div>
        </div>

    )
}
