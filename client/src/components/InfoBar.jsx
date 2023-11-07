import React, { useState } from 'react'

import { DividerMe } from './DividerMe';
import { CJButton } from './CJButton';
import { UserTemplate } from './UserTemplate';
import { RoomTemplate } from './RoomTemplate';

export default function InfoBar({ socket, activeTab, setActiveTab, author, room, setModal, modal, setInRoom, inRoom }) {


    const [users, setUsers] = useState([]);
    const [rooms, setRooms] = useState([]);

    socket.on("users", (data) => {
        setUsers([...data]);
    });
    //FIXME: second only sending rooms in which the users is
    socket.on("rooms", (data) => {
        setRooms(data);
    })

    const Users = () => {
        return (
            <div className="flex flex-col items-center pt-[69px] w-[531px] h-[100vh] bg-indigo-100" >

                <CJButton setModal={setModal} modal={modal} />

                <DividerMe who='moi' />

                {users.map((user, index) => {
                    // console.log("yooo", user.name, author)
                    if (user.name === author) {
                        return <UserTemplate key={index} name={user.name} role={"hmm"} />
                    }
                }
                )}

                <DividerMe who='autres' />

                {users.map((user, index) => {
                    if (user.name !== author) {
                        return <UserTemplate key={index} name={user.name} role={"hmm"} />
                    }
                }
                )}

            </div>
        )
    }

    const Rooms = () => {
        return (
            <div className="flex flex-col items-center pt-[69px] w-[531px] h-[100vh] bg-indigo-100" >

                <CJButton setModal={setModal} modal={modal} />

                <DividerMe who='in room' />

                {rooms.map((r, index) => {
                    // console.log("yooo room", r.name, room)
                    if (r.name === room) {
                        return <RoomTemplate key={index} room={r.name} setInRoom={setInRoom} inRoom={inRoom} />
                    }
                }
                )}

                <DividerMe who='others rooms' />

                {rooms.map((r, index) => {
                    // console.log("yooo room2", r.name, room)
                    if (r.name !== room) {
                        return <RoomTemplate key={index} room={r.name} setInRoom={setInRoom} inRoom={inRoom} />
                    }
                }
                )}


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
