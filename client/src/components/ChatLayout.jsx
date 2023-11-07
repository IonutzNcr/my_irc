import React from 'react'

export const ChatLayout = ({children}) => {
  return (
    <div className='flex flex-col h-screen w-[70%]'>
        {children}
    </div>
  )
}
