import React from 'react'
// import { socket } from '../connexion';
import { useEffect, useState } from 'react';




export const AppLayout = ({socket, children, modal}) => {

    return (
        <div className={`flex ${modal? 'blur-[2px]':''}`}>
            {children}
        </div>
    )
}
