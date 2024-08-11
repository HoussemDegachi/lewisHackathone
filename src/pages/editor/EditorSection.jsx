import React from 'react'
import EditorBox from './EditorBox'
import FilePathDisplay from './FilePathDisplay'

function EditorSection() {
  return (
    <div className='h-full'>
        <FilePathDisplay path={"folder/folder/file"} />
        <EditorBox />
    </div>
  )
}

export default EditorSection