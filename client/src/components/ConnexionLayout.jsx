import React from 'react'
import { useEffect, useState } from 'react';
import t1 from '../assets/tgauche.svg';
import t2 from '../assets/thaut.svg';
import t3 from '../assets/navigateRight.svg';


export default function ConnexionLayout({ setIsConnected, socket, name, setName, inRoom }) {



    //sert a se deconnecter 
    const disconect = () => {
        socket.emit("disconnected", name);
        // socket.disconnect();
        setName("");
        setIsConnected(false);

    }

    //sert a se connecter
    const connect = (e) => {
        e.preventDefault();
        //console.log("je suis bien ici")
        console.log(document.querySelector("#name_input").value);
        setName(document.querySelector("#name_input").value);
        setIsConnected(true);
        //console.log(socket.id)
        socket.emit("con", {
            name: document.querySelector("#name_input").value,
            id: socket.id,
            inRoom: inRoom
        });
    }


    //composant pour se connecter 
    const Connexion = () => {


        return (
           
            <div className="w-[100vw] h-[100vh] bg-white">
                <img className='absolute bottom-0' src={t1} alt="triangle" />
                <img className="absolute top-0 right-0" src={t2} alt="" />
                <div className='flex flex-col justify-center items-center gap-[40px] h-screen'>

                    <h1 className=' origin-top-left rotate-[-2.25deg] text-blue-700 text-[58.25px] font-normal font-patua tracking-[2.62px]'>
                        My IRC Program
                    </h1>
                    <form onSubmit={connect} className="flex w-[500px] h-[100px] origin-top-left rotate-[3.94deg] bg-indigo-500 rounded-[10px] shadow border border-indigo-600" >
                        <div className='h-[100%] w-[70%]'>
                            <input id='name_input' className=" pl-5 h-full w-[100%]" placeholder='name....' />
                        </div>
                        <div className='flex justify-center items-center w-[30%] h-[100%] flex flex-col'>
                            <img className="h-[50px]" src={t3} alt="image" />
                            <button className='text-white font-patua'>Se connecter</button>
                        </div>
                    </form>
                </div>
            </div>
        )

    }

    //coposant pour se deconnecter
    const Deconnexion = () => {
        return (
            <button onClick={disconect}>Deconnexion</button>
        )
    }

    return (
        <div className={`w-[100vw] h-[100vh] ${ name ? 'hidden':''}`}>
            {/* {name && <Deconnexion />} */}
            {!name && <Connexion />}
        </div>
    )
}

