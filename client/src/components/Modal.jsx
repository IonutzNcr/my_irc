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
    }

    function search(e){
        e.preventDefault()
        setSendSearch(!sendSearch);
    }

    return (
        <div className="w-screen h-screen top-0 left-0 absolute flex justify-center items-center ">
            <div className='shadow-2xl flex flex-col items-center p-10 w-[500px] h-[500px] gap-[20px] border-2 border-blue-500 bg-white rounded-[10px]'>
                <div className='flex w-[400px]'>
                    <p className='font-patua text-[25px]'>Créer un salon</p>
                    <button onClick={cancel} className='ml-auto'>X</button>
                </div>

                <form onSubmit={createRoom} className='flex justify-between w-[400px] flex-wrap'>
                    <p  className={`${error ? '' : 'hidden' } text-red-400  w-[400px] h-[30px] p-2`}> { error } </p>
                    <input ref={roomTerm} className='bg-blue-200 w-[400px] h-[50px] p-2' placeholder="rooom...." type="text" />
                    <button type='submit' className='rounded-[10px] w-[40%] h-[50px] bg-green-500 text-white font-patua'>Créer</button>
                    <button onClick={cancel} className='rounded-[10px] w-[40%] h-[50px] bg-red-500 text-white font-patua' >Annuler</button>
                </form>
                <p className='font-patua text-[25px] self-start' >Chercher un salon</p>
                <form onSubmit ={search} className='flex flex-row w-[400px]'>
                    <input ref={searchTerm} className='bg-blue-200 w-[70%] h-[50px] p-2' placeholder="rooom...." type="text" />
                    <button className=' w-[40%] h-[50px] bg-blue-500 text-white font-patua'>Chercher</button>
                </form>
                {filterRooms.map((room) => {
                    return (
                        <div className='w-[400px] h-[50px] '>
                            <p>{room.name}</p>
                            <button>Rejoindre</button>
                        </div>
                    )
                })
                }
                {filterRooms.length === 0 && <p>Aucun salon trouvé</p>}
            </div>
        </div>
    )
}
