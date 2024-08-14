import { Link } from "react-router-dom";
import { File as FileIcon } from "lucide-react";

function File({ file }) {
  return (
    <Link to={`/${file.id}`} onClick={(e) => e.stopPropagation()}>
      <div className="cursor-pointer rounded-sm hover:bg-gray-700 whitespace-nowrap overflow-hidden flex gap-1 items-center">
        <FileIcon size={16} className="flex-shrink-0" />
        {file.name}
      </div>
    </Link>
  );
}

export default File;
