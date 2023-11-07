import React from 'react'

export const MessageA = ({author, message}) => {
  return (
    <div className = "flex flex-col w-4/5 p-2 bg-white shadow-md rounded-2xl">
        <p className = "underline font-patua">{author}</p>
        <p className='font-pompiere'>{message}</p>
    </div>
  )
}
