import React from "react";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { FilePen, FileX } from "lucide-react";

import File from "./File";
import Folder from "./Folder";
import RenameFile from "./RenameFile";
import { useFileBarDataProvider } from "@/contexts/FileBarDataProvider";

function FileList({ file }) {
  const { updateFile, deleteFile } = useFileBarDataProvider();
  const { directory } = useFileBarDataProvider();

  const handleRename = (e) => {
    e.stopPropagation();
    updateFile(file.id, {
      name: file.name,
      type: "rename",
      toBeType: file.type,
    });
  };

  const deleteRename = (e) => {
    console.log(e);

    e.stopPropagation();
    deleteFile(file.id);
  };

  let item = null;
  if (file.type === "file") item = <File file={file} />;
  if (file.type === "folder") item = <Folder folder={file} />;
  if (file.type === "rename") item = <RenameFile item={file} />;

  return (
    <ContextMenu>
      <ContextMenuTrigger>{item}</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={handleRename}>
          <FilePen size={14} className="mr-1.5" />
          Rename
        </ContextMenuItem>
        {file !== directory && (
          <ContextMenuItem onClick={deleteRename}>
            <FileX size={14} className="mr-1.5" />
            Delete
          </ContextMenuItem>
        )}
      </ContextMenuContent>
    </ContextMenu>
  );
}

export default FileList;
