import React, { useEffect, useState } from 'react'

import { DividerMe } from './DividerMe';
import { CJButton } from './CJButton';
import { UserTemplate } from './UserTemplate';
import { RoomTemplate } from './RoomTemplate';

export default function InfoBar({ admin, socket, activeTab, setActiveTab, author, room, setModal, modal, setInRoom, inRoom }) {


    const [users, setUsers] = useState([]);
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        socket.on("update", (data) => {
            console.log("*************update", data)
            //data is rooms, users* impossible this one cause i dont know which room it is in 
            let myRoomWasDeleted = false;
            for (let key in data.roomsToDelete) {
                console.log("***update inside for", data.roomsToDelete[key].name, inRoom)
                if (data.roomsToDelete[key].name === inRoom) {
                    myRoomWasDeleted = true;

                }
            }
            if (myRoomWasDeleted) {
                console.log("*************update inside myRoomWasDeleted = true", [...data.rooms[0].users])
                setInRoom("default");
                setUsers([...data.rooms[0].users])
            } else {
                //FIXME: find another way to set up the users
                for (let key in data.rooms) {
                    if (data.rooms[key].name === inRoom) {
                        setUsers([...data.rooms[key].users])
                    }
                }

            }
            //filtrer les rooms dans lequel l'user est
            let rs = data.rooms.filter((r) => {
                for (let key in r.users) {
                    if (r.users[key].name === author) {
                        return r;
                    }
                }
            }
            )

            console.log("*************update inside rs", rs)
            setRooms([...rs]);

        })
        return () => {
            socket.off("update")
        }
    }, [inRoom])

    useEffect(() => {
        socket.on("users", (data) => {
            console.log("***** INFOBAR ****")
            console.log("in infobar inRoom", inRoom, room)
            console.log("in infobar data", data)
            if (data[0].inRoom === inRoom) {
                console.log("**inside info bar if", data)
                setUsers([...data]);
            }

        });

        return () => {
            socket.off("users")
        }
    }, [inRoom])
    //FIXME: second only sending rooms in which the users is
    socket.on("rooms", (data) => {
        setRooms(data);
    })

    const Users = () => {
        return (
            <div className="flex flex-col items-center pt-[69px] w-[531px] h-[100vh] bg-indigo-100" >

                <CJButton setModal={setModal} modal={modal} />

                <div className='flex flex-col gap-[5px] mt-[20px]'>
                    <DividerMe who='moi' />
                    {users.map((user, index) => {
                        console.log("yooo", user)
                        if (user.name === author) {
                            return <UserTemplate key={index} name={user.name} admin={admin} />
                        }
                    }
                    )}
                </div>

                <div className='flex flex-col gap-[5px] mt-[40px] overflow-y-auto'>
                    <DividerMe who='autres' />
                    {users.map((user, index) => {
                        if (user.name !== author) {
                            return <UserTemplate key={index} name={user.name} admin={admin} />
                        }
                    }
                    )}
                </div>

            </div>
        )
    }

    const Rooms = () => {
        return (
            <div className="flex flex-col items-center pt-[69px] w-[531px] h-[100vh] bg-indigo-100" >

                <CJButton setModal={setModal} modal={modal} />

                <div className='flex flex-col gap-[5px] mt-[40px] overflow-y-auto'>
                    <DividerMe who='in room' />

                    {rooms.map((r, index) => {
                        // console.log("yooo room", r.name, room)
                        if (r.name === room) {
                            return <RoomTemplate author={author} socket={socket} key={index} name={r.name} setInRoom={setInRoom} inRoom={inRoom} />
                        }
                    }
                    )}
                </div>

                <div className='flex flex-col gap-[5px] mt-[40px] overflow-y-auto'>
                    <DividerMe who='others rooms' />

                    {rooms.map((r, index) => {
                        // console.log("yooo room2", r.name, room)
                        if (r.name !== room) {
                            return <RoomTemplate key={index} author={author} socket={socket} name={r.name} setInRoom={setInRoom} inRoom={inRoom} />
                        }
                    }
                    )}
                </div>

            </div>
        )
    }

    if (activeTab === 'users') {
        return <Users />;
    }

    if (activeTab === 'rooms') {
        return <Rooms />;
    }
}
