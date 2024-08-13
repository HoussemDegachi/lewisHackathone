import React from 'react'
import EditorBox from './EditorSectionComponents/EditorBox.jsx'
import FilePathDisplay from './EditorSectionComponents/FilePathDisplay.jsx'
import { useParams } from 'react-router-dom'

function EditorSection() {
  const { fileId } = useParams();

  const fileData = JSON.parse(localStorage.getItem(fileId));

  if (!fileData)
  {
    // to do
    // not found
  }

  return (
    <div className='h-full'>
        <FilePathDisplay path={fileData.path} />
        <EditorBox data={fileData} dataId={fileId}  />
    </div>
  )
}

export default EditorSection