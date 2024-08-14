import React, { useEffect, useState } from "react";
import EditorBox from "./EditorSectionComponents/EditorBox.jsx";
import FilePathDisplay from "./EditorSectionComponents/FilePathDisplay.jsx";
import { Navigate, useParams } from "react-router-dom";

function EditorSection() {
  const { fileId } = useParams();
  const fileData = JSON.parse(localStorage.getItem(fileId));

  return (
  
    fileData ?
    (<div className="h-full">
    <FilePathDisplay path={fileData.path} />
    <EditorBox data={fileData} />
    </div>) : <Navigate to="/" />
  
  );
}

export default EditorSection;
