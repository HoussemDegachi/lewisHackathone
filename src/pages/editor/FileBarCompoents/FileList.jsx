import React from "react";
import File from "./File";
import Folder from "./Folder";
import RenameFile from "./RenameFile";

function FileList({ file }) {
  let item = null;
  if (file.type === "file") item = <File file={file} />;
  if (file.type === "folder") item = <Folder folder={file} />;
  if (file.type === "rename") item = <RenameFile item={file} />;

  return item;
}

export default FileList;
