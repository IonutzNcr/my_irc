import React from 'react'

export const DividerMe = ({who}) => {
    return (
        <div className="w-[393px] h-[46px] p-[5px] bg-blue-100 flex flex-row  justify-between items-center rounded-[10px] drop-shadow-xl">
            <div className='h-[3px] w-[40%] bg-blue-400'></div>
            <div className='font-patua text-[12px]'>{who}</div>
            <div className='h-[3px] w-[40%] bg-blue-400'></div>
          
        </div>
    )
}
