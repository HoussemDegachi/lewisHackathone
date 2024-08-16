import { changePosition } from "@/lib/animation";
import { FolderDown } from "lucide-react";
import React, { useEffect } from "react";

function DownloadProjectBtn({ onClick }) {
  useEffect(() => {
    const button = document.querySelector("#sneaky-folder-btn");
    ["mouseover", "click"].map((type) => changePosition(button, type));

    return () => {
      ["mouseover", "click"].map((type) => {
        button.removeEventListener(type, () => {});
      });
    };
  }, []);

  return (
    <div id="sneaky-folder-btn" className="absolute w-fit z-50 top-3 right-6">
      <button
        onClick={onClick}
        className="bg-gray-700 py-1.5 px-3 h-10 rounded-md group flex items-center text-sm"
      >
        <FolderDown size={22} />
        <span className="max-w-0 group-hover:max-w-20 group-hover:pl-1 whitespace-nowrap overflow-hidden transition-all duration-500">
          Project
        </span>
      </button>
    </div>
  );
}

export default DownloadProjectBtn;
