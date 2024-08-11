import React, { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

function createFileElement(file) {
  return <div className="cursor-pointer pl-1.5">{file.name}</div>;
}

function createFolderElement(folder) {
  const [open, setOpen] = useState(false);
  const toggleOpen = (e) => {
    e.stopPropagation();
    setOpen((state) => !state);
  };
  return (
    <div onClick={toggleOpen} className="cursor-pointer">
      <div className="flex items-center">
        {open ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
        <span>{folder.name}</span>
      </div>
      {open && (
        <div className="pl-2">
          {folder?.contents?.map((file) => (
            <FileList file={file} key={file.name} />
          ))}
        </div>
      )}
    </div>
  );
}

function FileList({ file }) {
  if (file.type === "file") return createFileElement(file);
  else if (file.type === "folder") return createFolderElement(file);
  else return null;
}

export default FileList;
