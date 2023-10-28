import React from 'react'
import { useRef, useState, useEffect } from "react";

import { v4 as uuid } from 'uuid';


export const Chat = ({ socket, author }) => {

    const messageRef = useRef();
    const [messages, setMessages] = useState([]);

    socket.on("messages",(messages)=>{
        setMessages([...messages]);
    })

    const send = (e) =>{
        e.preventDefault();
        let auth = author ?? "Yoyo";
        let content = messageRef.current.value;
        // console.log("inside send", auth,content);
        // console.log(new Date().toDateString() + new Date().toTimeString() )
        socket.emit("message",{
            auth,
            content,
            date: new Date().toDateString() + new Date().toTimeString()
        })
    }


    return (
        <div>
            <div>
                <p>Where all messages will been displayed</p>
                <div>
                    {messages.map((message, index)=>{
                        return (
                            <div key = {index}>
                                <p className='text-orange-500'>{message.auth} said</p>
                                <p>{message.content}</p>
                            </div>
                        )
                    }) }
                </div>
            </div>
            <form onSubmit={send}>
                <input ref={messageRef}  type="text" placeholder='message...' />
            </form>
        </div>
    )
}
