import React from 'react'

export const Header = () => {
    return (
        <div className='box-border w-full h-[66.5px] bg-indigo-100 flex items-center pl-24 pr-24 justify-start gap-20 border-l border-b border-blue-600'>
            <span className='text-indigo-600 text-3xl font-patua'>Channel</span>
            <div className='w-[1px] bg-indigo-500 h-[60%]'></div>
            <span className='text-indigo-700 text-3xl font-patua'>Default</span>
            <button className='w-40 h-10 flex justify-center items-center bg-red-600 text-white ml-auto rounded-lg shadow-md font-patua'>Quitter</button>
        </div>
    )
}
