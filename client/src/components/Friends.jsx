import React from 'react'
import { useState } from 'react';

export default function Friends({ socket }) {
    //TODO: Fix when changing roomg if necessary
    const [users, setUsers] = useState([]);

    socket.on("users", (data) => {
        //console.log("userssss", data)
        //console.log("im here, hh", [...users, data])
        setUsers([...data]);
    });

    return (
        <div>  
            <div className='flex flex-col gap-3.5 w-fit p-4 border-2 border-cyan-400 '>
                {users.map((user, index) => {
                    //console.log("inside map", user)
                    //console.log("inside", user.name)
                    return (
                        <p key={index}> x: {user.name}</p>
                    )
                }) }
            </div> 
        </div>
    )
}