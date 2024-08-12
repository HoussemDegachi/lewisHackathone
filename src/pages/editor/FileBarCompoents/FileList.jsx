import React from "react";
import File from "./File";
import Folder from "./Folder";

function FileList({ file }) {
  if (file.type === "file") return <File file={file} />;
  if (file.type === "folder") return <Folder folder={file} />;
  return null;
}

export default FileList;
