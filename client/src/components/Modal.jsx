import React, { useEffect, useRef, useState } from 'react'

export const Modal = ({ socket, user, setModal, setInRoom }) => {
    const [searchRooms, setSearchRooms] = useState([]);
    const [error, setError] = useState(false);
    const [sendSearch, setSendSearch] = useState(false);


    const roomTerm = useRef();
    const searchTerm = useRef();


    useEffect(() => {
        console.log("search", searchTerm.current.value)
        socket.emit("searchRooms", { searchTerm: searchTerm.current.value, user }, (data) => {
            setSearchRooms([...data]);
        }
        )

        return () => {
            socket.off("searchRooms")
        }
    }, [sendSearch])

    const filterRooms = searchRooms.filter((room) => {
        return room.name.includes(searchTerm.current.value)
    }
    )

    function cancel() {
        roomTerm.current.value = "";
        searchTerm.current.value = "";
        setModal(false);
        setError(false);
    }

    function createRoom(e) {
        e.preventDefault();

        socket.emit("createAndJoin", {
            name: roomTerm.current.value,
            admin: user,
        }, (data) => {
            if (data?.error) {
                setError(data.error)
            } else {
                setError(false);
                setModal(false);
                console.log("inside createAndJoin", roomTerm.current.value)
                setInRoom(roomTerm.current.value);
            }
        }

        )
        socket.off("createAndJoin")
    }

    function search(e) {
        e.preventDefault()
        setSendSearch(!sendSearch);
    }

    async function join(inRoom) {

        await socket.emit("join", { name: inRoom, user: user }, (data) => {
            // console.log("data", data)
            setInRoom(inRoom);
            setModal(false);
            socket.off("join")
        }
        )

    }

    return (
        <div className="w-screen h-screen top-0 left-0 absolute flex justify-center items-center ">
            <div className='shadow-2xl flex flex-col items-center p-10 w-[500px] h-[550px] gap-[20px] border-2 border-blue-500 bg-white rounded-[10px]'>
                <div className='flex w-[400px]'>
                    <p className='font-patua text-[25px]'>Créer un salon</p>
                    <button onClick={cancel} className='ml-auto'>X</button>
                </div>

                <form onSubmit={createRoom} className='flex justify-between w-[400px] flex-wrap'>
                    <p className={`${error ? '' : 'hidden'} text-red-400  w-[400px] h-[30px] p-2`}> {error} </p>
                    <input ref={roomTerm} className='bg-blue-200 w-[400px] h-[50px] p-2' placeholder="rooom...." type="text" />
                    <button type='submit' className='hover:bg-green-400 mt-[15px] rounded-[10px] w-[40%] h-[50px] bg-green-500 text-white font-patua'>Créer</button>
                    <button onClick={cancel} className='hover:bg-red-500 mt-[15px] rounded-[10px] w-[40%] h-[50px] bg-red-600 text-white font-patua' >Annuler</button>
                </form>
                <p className='font-patua text-[25px] self-start' >Chercher un salon</p>
                <form onSubmit={search} className='flex flex-row w-[400px]'>
                    <input ref={searchTerm} className='bg-blue-200 w-[70%] h-[50px] p-2' placeholder="rooom...." type="text" />
                    <button className=' w-[40%] h-[50px] bg-blue-500 text-white font-patua'>Chercher</button>
                </form>
                <div className='flex flex-col gap-[10px] '>
                    {filterRooms.map((room, index) => {
                        if(index > 2){
                            return null;
                        }
                        return (
                            <div key={index} className=' w-[400px] h-[50px] flex flex-row border-[2px] rounded-[10px] border-blue-400 font-patua items-center justify-between'>
                                <p className='p-[10px]'>{room.name}</p>
                                <div className='h-[80%] w-[2px] bg-blue-300 ml-auto '> </div>
                                <button className='p-[10px] text-[12px] text-blue-600 hover:bg-blue-100 h-full' onClick={() => join(room.name)}>Rejoindre</button>
                            </div>
                        )
                    })
                    }
                    {filterRooms.length === 0 && <p>Aucun salon trouvé</p>}
                </div>

            </div>
        </div>
    )
}
