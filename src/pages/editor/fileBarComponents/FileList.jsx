import React, { useState } from "react";
import { ChevronDown, ChevronRight, FolderPlus, FilePlus2 } from "lucide-react";
import { Link } from "react-router-dom";

function createFileElement(file) {
  return (
    <div className="cursor-pointer pl-1.5 rounded-sm hover:bg-gray-700">
      {/* 
        File.name must be changed later to file.id
      */}
      <Link to={`/${file.name}`} className="w-full">
      {file.name}
      </Link>
    </div>
  );
}

function createFolderElement(folder) {
  const [open, setOpen] = useState(false);
  const toggleOpen = (e) => {
    e.stopPropagation();
    setOpen((state) => !state);
  };
  return (
    <div onClick={toggleOpen} className="cursor-pointer rounded-sm">
      <div className="flex items-center justify-between hover:bg-gray-700 group">
        <div className="flex items-center">
          {open ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          <span>{folder.name}</span>
        </div>
        <div className="mr-1.5 flex gap-1.5 opacity-0 group-hover:opacity-100 duration-100">
          <button>
            <FilePlus2 size={16} className=" opacity-50 hover:opacity-100" />
          </button>
          <button>
            <FolderPlus size={16} className=" opacity-50 hover:opacity-100" />
          </button>
        </div>
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
