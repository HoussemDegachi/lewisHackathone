import React from 'react'
import EditorBox from './EditorSectionComponents/EditorBox.jsx'
import FilePathDisplay from './EditorSectionComponents/FilePathDisplay.jsx'

function EditorSection() {
  return (
    <div className='h-full'>
        <FilePathDisplay path={"folder/folder/file"} />
        <EditorBox />
    </div>
  )
}

export default EditorSection