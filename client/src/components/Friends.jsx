//only logique will remain :

import React from 'react'
import { useState } from 'react';

export default function Friends({ socket, author, admin }) {
    //TODO: Fix when changing roomg if necessary
    const [users, setUsers] = useState([]);

    socket.on("users", (data) => {
        //console.log("userssss", data)
        //console.log("im here, hh", [...users, data])
        setUsers([...data]);
    });

    return (
        <div className='flex flex-col items-center w-[24%] h-[100vh] p-4 border-2 border-cyan-400 '>

            <div className='flex flex-column justify-center w-[80%] bg-stone-200'>
                {users.map((user, index) => {
                    if (user?.name === admin && user?.name === author) {
                        return (
                            <div className='flex flex-row p-[10px] justify-between' key={index}>
                                <div className='w-[50px] h-[50px] bg-red-200 rounded'><img src="" alt="avatar" /></div>
                                <div>
                                    <p className='text-green-400'> {user?.name}</p>
                                    <p> admin </p>
                                </div>
                            </div>
                        )
                    }
                    if (user?.name === author) {
                        return (
                            <div className='flex flex-row p-[10px] justify-between' key={index}>
                                 <div className='w-[50px] h-[50px] bg-red-200 rounded-full'><img  className="rounded-full" src="" alt="avatar" /></div>
                                <div>
                                    <p > x: {user?.name}</p>
                                    <p> member </p>
                                </div>
                            </div>
                        )
                    }
                })}

            </div>

            <div className='flex flex-col gap-3.5   '>
                {users.map((user, index) => {
                    if (user?.name === admin) {
                        return (
                            <div className='flex flex-row p-[10px] justify-between' key={index}>
                                <p className='text-green-400'> {user?.name}</p>
                                <p> admin </p>
                            </div>
                        )
                    }
                    if( user?.name !== admin && user?.name !== author){
                    return (
                        <div className='flex flex-row p-[10px] justify-between' key={index}>
                            <div>
                                <p > x: {user?.name}</p>
                                <p> member </p>
                            </div>
                            <button>X</button>
                        </div>

                    )
                    }
                })}
            </div>
        </div>
    )
}