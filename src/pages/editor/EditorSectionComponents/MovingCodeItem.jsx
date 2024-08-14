import React from 'react'

function MovingCodeItem({ codeText, onClick }) {
  return (
    <div onClick={onClick} className='fixed top-0 left-0 broken-line animate-run-out'>{codeText}</div>
  )
}

export default MovingCodeItem