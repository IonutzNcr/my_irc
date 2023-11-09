import React from 'react'

export const CJButton = ({modal, setModal}) => {
    

    return (
        <div onClick = {() => setModal(true)} className="hover:bg-indigo-500 w-[393px] h-11 relative mb-[40px]">
            <div className="hover:bg-indigo-500 w-[393px] h-11 left-0 top-0 absolute bg-[#5566F8] rounded-[10px] shadow border border-indigo-600" />
            <div className="hover:bg-indigo-500 left-[116px] top-[14px] absolute text-white text-sm font-normal font-patua">Créer / joindre un channel</div>
        </div>
    )
}
