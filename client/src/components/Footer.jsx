import React, { useRef } from 'react'

export const Footer = ( {socket, author, inRoom}) => {

  const messageRef = useRef();

  const send = (e) => {
    e.preventDefault();
    let auth = author;
    let content = messageRef.current.value;
    // console.log("inside send", auth,content);
    // console.log(new Date().toDateString() + new Date().toTimeString() )
    if (socket.connected) {
        socket.emit("message", {
            auth,
            content,
            date: new Date().toDateString() + new Date().toTimeString(),
            inRoom: inRoom
        }, (cb) => {
            console.log(`Message send in room: ${inRoom} || ${cb}`)
            messageRef.current.value = "";
        })
    }

}


  return (
    <form onSubmit={send} className='relative w-full h-[50px] bg-red-800 flex flex-row border-l border-t border-blue-600'>
        <input ref={messageRef} className='pl-24 bg-indigo-100 w-[90%] focus:border-none focus:outline-none font-pompiere'/>
        <button type='submit' className='cursor-mine flex items-center justify-center box-border h-full w-[10%] bg-indigo-600 text-white text-[18px] hover:bg-indigo-500 font-patua '>Envoyer</button>
    </form>
  )
}
