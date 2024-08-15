import React from 'react'

function BrokenEditorLine({ text, onClick, className }) {
  const randomX = Math.floor(Math.random() * 90)
  const randomY = Math.floor(Math.random() * 90)
  console.log(randomX, randomY)
  return (
    <div style={{top: `${randomY}%`, left: `${randomX}%`}} className={`absolute broken-line animate-space-float ${className}`} onClick={onClick}>{text}</div>
  )
}

export default BrokenEditorLine