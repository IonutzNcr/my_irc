import React from 'react'
import { useRef, useState, useEffect } from "react";

import { socket } from "../connexion.jsx"

import { v4 as uuid } from 'uuid';

export const Chat = ({ username, event, currentRoom, allRooms, updateRooms }) => {
    const message = useRef(null);
    
    const [messages, setMessages] = useState([]);
    const [receiveMessage, setReceiveMessage] = useState(null);
    
   

    const room = currentRoom
    
    
    socket.emit('join_room', { room: room, user: username })

    useEffect(() => {

        if (receiveMessage !== null) {
            setMessages((prevMessages) => [...prevMessages, receiveMessage]);
        }
    }, [receiveMessage]);



    useEffect(() => {
       socket.on('receive_message', (data) => {
            console.log(data);
            setReceiveMessage({ message: data.message, username: data.username });
        });

        return () => {
            socket.off('receive_message');
        };
    }, []);

    
    useEffect(()=>{
        socket.on("users_req",(data)=>{
            console.log("ca ne marche pas ..." , data) // c'est bon jusque la
            setReceiveMessage({ message: data.users.join("/"), username: "info" });
        })
    },[])
       
    
    const sendMessage = () => {    
        // traitement de message // s'il s'agit d'une commande ou d'un message
        if (message?.current?.value.includes("/")) {
           
            let commande = message.current.value.replace("/", "");
            let commande_array = commande.split(" ")

            // console.log("action", commande_array[0]);

            switch (commande_array[0]) {
                case "create":
                    let id = uuid();
                    console.log("id : ", id)
                    updateRooms({ id: id, name: commande_array[1], isActive: false }, commande_array[0], setReceiveMessage)

                    break;
                case "join":
                    //TODO: hmmmm
                    let filtered_room = allRooms.filter(e => e.name == commande_array[1])[0]
                    console.log("filtered room", filtered_room)
                    if(filtered_room === undefined){
                        console.log("room doesn't exist")
                    }
                    updateRooms(filtered_room, commande_array[0],setReceiveMessage)
                   
                    break;
                case "nick":
                    event(commande_array[1])
                    break;
                case "users":
                    socket.emit("users", room )
                    break;
                    
                default:
                    console.log("ayeuh")
            }
            return
        }
        console.log("dans l'event", message.current.value)
        socket.emit('send_message', { message: message.current.value, room: room, username: username });

        setReceiveMessage({ message: message.current.value, username: username })

        message.current.value = "";
        console.log("it should be empty", message.current)

    };


    return (
        <div>
            <div className="chat-container h-100 flex flex-col rounded-md border-4 bg-blue-500 opacity-70 border-purple-400 bottom-0">
                <div className="chat chat-start overflow-y-auto">
                    {room !== '' && messages.length > 0 && receiveMessage !== null ? (
                        messages.map((msg, index) => (
                            <div className="chat-bubble bg-blue-500" key={index}>
                                <p>{msg.username}:</p>
                                <p>{msg.message}</p>
                            </div>
                        ))
                    ) : (
                        <div className="no-messages text-red-500">No messages yet</div>
                    )}
                </div>

                <div className="flex justify-center">
                    <input
                        id="chat"
                        rows="1"
                        className="block mx-4 p-2.5 w-1/3 text-sm text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        ref={message}
                        placeholder="Your message..."
                        
                        
                    />
                    <button
                        className="inline-flex justify-center p-2 text-blue-600 rounded-full cursor-pointer hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
                        onClick={sendMessage}
                    >
                        Send Message
                    </button>
                </div>

            </div>
        </div>
    )
}
