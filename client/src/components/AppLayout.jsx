import React from 'react'
// import { socket } from '../connexion';
import { useEffect, useState } from 'react';




export const AppLayout = ({socket, children}) => {

    return (
        <div>
            {children}
        </div>
    )
}
