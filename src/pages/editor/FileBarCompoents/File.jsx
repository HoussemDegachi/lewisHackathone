import { Link } from "react-router-dom";

function File({ file }) {
  return (
    <Link to={`/${file.id}`} onClick={(e) => e.stopPropagation()}>
      <div className="cursor-pointer pl-1.5 rounded-sm hover:bg-gray-700 whitespace-nowrap overflow-hidden">
        {file.name}
      </div>
    </Link>
  );
}

export default File;
