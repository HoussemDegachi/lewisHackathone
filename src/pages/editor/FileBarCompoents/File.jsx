import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useFileBarDataProvider } from "@/contexts/FileBarDataProvider";
import { FilePen, FileX } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

function File({ file }) {
  const { updateFile } = useFileBarDataProvider();

  const handleRename = (e) => {
    e.stopPropagation();
    updateFile(file.id, { name: file.name, type: "rename", toBeType: "file" });
  };

  return (
    <Link to={`/${file.id}`} onClick={(e) => e.stopPropagation()}>
      <ContextMenu>
        <ContextMenuTrigger>
          <div className="cursor-pointer pl-1.5 rounded-sm hover:bg-gray-700 whitespace-nowrap overflow-hidden">
            {file.name}
          </div>
        </ContextMenuTrigger>
        <ContextMenuContent>
          <ContextMenuItem onClick={handleRename}>
            <FilePen size={14} className="mr-1.5" />
            Rename
          </ContextMenuItem>
          <ContextMenuItem>
            <FileX size={14} className="mr-1.5" />
            Delete
          </ContextMenuItem>
        </ContextMenuContent>
      </ContextMenu>
    </Link>
  );
}

export default File;
