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
    <div id="sneaky-folder-btn" className="absolute z-75 top-3 right-6">
      <button
        onClick={onClick}
        className="bg-gray-700 py-1.5 px-3 h-10 rounded-md group flex gap-1 items-center text-sm"
      >
        <FolderDown size={22} />
        <span className="max-w-24 whitespace-nowrap overflow-hidden">
          Project
        </span>
      </button>
    </div>
  );
}

export default DownloadProjectBtn;
