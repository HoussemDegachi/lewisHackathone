import React from 'react'

function BrokenEditorLine({ text, onClick, className }) {
  const randomX = Math.floor(Math.random() * 60)
  const randomY = Math.floor(Math.random() * 60)
  return (
    <div style={{top: `${randomY}%`, left: `${randomY}%`}} className={`absolute text-white text-md font-light px-2 w-max flex items-center justify-center min-w-[150px] rounded-sm bg-neutral-600 mb-2 animate-space-float opacity-75 ml-[50%] backdrop-blur-2xl ${className}`} onClick={onClick}>{text}</div>
  )
}

export default BrokenEditorLine