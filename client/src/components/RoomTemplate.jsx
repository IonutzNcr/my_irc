import svg1 from '../assets/messagee.svg'

import React from 'react'

export const RoomTemplate = ({socket ,name, setInRoom, inRoom, author}) => {


    //FIXME: potentiall problem 
    function psuedoJoin(){
        if(inRoom !== name){
            socket.emit("join" ,{name, user:author}, (data)=>{
                console.log("data", data)
                setInRoom(name);
            }
            )
            
        }
        
    }

    return (
        <div onClick={psuedoJoin} className="flex flex-row w-[393px] h-[46px] items-center bg-white border border-blue-400 rounded-[10px] shadow">
            <div className='pl-4 flex justify-start w-[70%] font-patua'> {name}</div>
            <div className='w-[2px] h-[80%] border border-blue-300 ml-auto'></div>
            <div className="pr-4 flex flex-row  gap-2 justify-center w-[20%] ml-auto">
                
                <img src={svg1} alt="triangle" />
            </div>
        </div>
    )
}
