import React, { useEffect, useState } from "react";
import EditorBox from "./EditorSectionComponents/EditorBox.jsx";
import FilePathDisplay from "./EditorSectionComponents/FilePathDisplay.jsx";
import { Navigate, useParams } from "react-router-dom";
import { useFileBarDataProvider } from "@/contexts/FileBarDataProvider.jsx";
import { useEditorDataProvider } from "@/contexts/EditorDataProvider.jsx";

function EditorSection() {
  const { fileId } = useParams();
  const { getFilePath } = useFileBarDataProvider()
  const { setFileId } = useEditorDataProvider()

  useEffect(() => {
    setFileId(fileId)
  }, [fileId])

  const fileData = JSON.parse(localStorage.getItem(fileId));
  const filePath = getFilePath(fileId)

  return (
    fileData ?
    (<div className="h-full">
    <FilePathDisplay path={filePath} />
      <EditorBox />
    </div>) : <Navigate to="/" />
  
  );
}

export default EditorSection;
