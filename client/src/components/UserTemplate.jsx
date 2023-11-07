import React from 'react'
import svg1 from '../assets/user.svg';
export const UserTemplate = ({name, role}) => {
    
    return (
        <div className="flex flex-row w-[393px] h-[46px] items-center bg-white border border-blue-400 rounded-[10px] shadow">
            <div className='pl-4 flex justify-start w-[40%] font-patua'>  {name} </div>
            <div className='w-[2px] h-[80%] border border-blue-300'></div>
            <div className='flex justify-center w-[40%] font-pompiere'> {role} </div>
            <div className='w-[2px] h-[80%] border border-blue-300'></div>
            <div className="flex justify-center w-[20%]">
                <img src={svg1} alt="triangle" />
            </div>
        </div>
    )
}
