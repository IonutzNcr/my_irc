import React from 'react'
import { useRef, useState, useEffect } from "react";
import { MessageB } from './MessageB';
import { MessageA } from './MessageA';
import { v4 as uuid } from 'uuid';


export const Chat = ({ socket, author, inRoom }) => {


    const [messages, setMessages] = useState([]);


    useEffect(()=>{
        console.log("*********************")
        socket.emit("join",{name:inRoom, user:author}, (data)=>{
            console.log("data", data)
        }
        )
        
    },[inRoom])


    useEffect(() => {
       

        console.log("********* Msg ***********")

        socket.on("messages", (msgs) => {
            console.log("********* MESSAGES ***********")
            console.log("in chat inRoom", inRoom)
            // console.log("in chat omg ", msgs, inRoom)
            // console.log('egalité', msgs[0]?.inRoom === inRoom)
            if(msgs.length === 0){
                console.log("**** inside first if ")
                setMessages([]);
            }
    
            if (msgs[0]?.inRoom === inRoom) {
                console.log("**** inside second if ")
                setMessages([...msgs]);
            } 
            
           
        })
        
      

    }, [])





    return (

        <div className='flex bg-gray-200 overflow-x-auto p-5 flex-col items-center gap-[10px] border-l border-blue-600' style={{ height: 'calc(100vh - 50px - 66.5px)' }}>
            {messages.map((message, index) => {
                // console.log(message)
                if (message.auth === author) {
                    return (
                        <MessageB key={index} author={message.auth} message={message.content} />
                    )
                } else {
                    return (
                        <MessageA key={index} author={message.auth} message={message.content} />
                    )
                }
            }
            )}

        </div>
    )
}
