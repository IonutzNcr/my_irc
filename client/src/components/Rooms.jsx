import { useEffect } from "react"

//channels 
// doit avoir acces a quoi??? --> a rien || aux rooms si on decide de les mettre au niveau superieur via context ou etat
// qui peut agir sur channels??? --> le chat via des commandes 

export function Rooms() {
  
    // const updateRooms = useUpdateRooms();
 

    return (
        <div >
            <div >
                { rooms.map(channel => {
                if(channel.isActive){
                    return (<div className='w-[100px] h-[100px] p-2 flex items-center bg-red-200'>{channel.name}</div>)
                } else {
                    return (<div className='w-[100px] h-[100px] bg-stone-200'>{channel.name}</div>)
                }
                
            }) }
            Tu me casse les cou.............
            </div>
            <div >
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Create Room</button>
            </div>
        </div>

    )
}
