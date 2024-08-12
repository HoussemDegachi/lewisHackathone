import React from 'react'

function BrokenEditorLine({ text, onClick, className }) {
  const randomX = Math.floor(Math.random() * 90)
  const randomY = Math.floor(Math.random() * 90)
  console.log(randomX, randomY)
  return (
    <div style={{top: `${randomY}%`, left: `${randomX}%`}} className={`absolute text-white text-md font-light px-2 w-max flex items-center justify-center min-w-[150px] rounded-sm bg-neutral-600 mb-2 animate-space-float opacity-75 backdrop-blur-2xl ${className}`} onClick={onClick}>{text}</div>
  )
}

export default BrokenEditorLine