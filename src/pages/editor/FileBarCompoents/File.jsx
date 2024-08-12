import React from "react";
import { Link } from "react-router-dom";

function File({ file }) {
  return (
    <Link to={`/${file.id}`}>
      <div
        className="cursor-pointer pl-1.5 rounded-sm hover:bg-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        {file.name}
      </div>
    </Link>
  );
}

export default File;
