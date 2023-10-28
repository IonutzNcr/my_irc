import React from 'react'
import { useEffect, useState } from 'react';


export default function ConnexionLayout({ setIsConnected, socket, name, setName }) {

   


    socket.on("con", (data) => {
        //console.log(data);
    });


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
        // //console.log(e.target.children[0].value);
        setName(e.target.children[0].value);
        setIsConnected(true);
        //console.log(socket.id)
        socket.emit("con", {
            name: e.target.children[0].value,
            id:socket.id,
        });
    }


    //composant pour se connecter 
    const Connexion = () => {


        return (
            <form onSubmit={connect} >
                Name
                <input type="text" placeholder='name' />
            </form >
        )

    }

    //coposant pour se deconnecter
    const Deconnexion = () => {
        return (
            <button onClick={disconect}>Deconnexion</button>
        )
    }

    return (
        <div>
            {name && <Deconnexion />}
            {!name && <Connexion />}
        </div>
    )
}

