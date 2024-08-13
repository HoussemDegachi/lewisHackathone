import React from "react";
import File from "./File";
import Folder from "./Folder";
import RenameFile from "./RenameFile";

function FileList({ file }) {
  if (file.type === "file") return <File file={file} />;
  if (file.type === "folder") return <Folder folder={file} />;
  if (file.type === "rename") return <RenameFile item={file} />;
  return null;
}

export default FileList;
