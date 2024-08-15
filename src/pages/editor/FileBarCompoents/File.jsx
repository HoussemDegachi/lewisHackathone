import { Link, useParams } from "react-router-dom";
import { File as FileIcon } from "lucide-react";

function File({ file, currentFile }) {
  
  return (
    <Link to={`/${file.id}`} onClick={(e) => e.stopPropagation()}>
      <div className={`cursor-pointer rounded-sm ${currentFile === file.id ? "bg-slate-600" : "hover:bg-gray-700 "} text-neutral-300 whitespace-nowrap overflow-hidden flex gap-1 items-center`}>
        <FileIcon size={16} className="flex-shrink-0" />
        {file.name + "." + file.extension}
      </div>
    </Link>
  );
}

export default File;
