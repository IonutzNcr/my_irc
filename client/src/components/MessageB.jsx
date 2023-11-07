import React from 'react'

export const MessageB = ({author,message}) => {
  return (
    <div className = "flex flex-col w-4/5 p-2 bg-indigo-100 shadow-md rounded-2xl">
        <p className = "underline font-patua">{author}</p>
        <p className='font-Pompiere font-pompiere'>{message}</p>
    </div>
  )
}
