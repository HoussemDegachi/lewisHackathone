import { changePosition } from "@/lib/animation";
import { FileDown } from "lucide-react";
import React, { useEffect } from "react";

function DownloadFileBtn({ onClick, file }) {
  useEffect(() => {
    const button = document.querySelector("#sneaky-file-btn");
    changePosition(button, "mouseover");

    return () => {
      button.removeEventListener("mouseover", () => {});
    };
  }, []);

  return (
    <div className="absolute w-fit z-75 right-[144px] top-3" id="sneaky-file-btn">
      <button
        onClick={onClick}
        className="bg-gray-700 py-1.5 px-3 h-10 rounded-md flex gap-1 items-center text-sm"
      >
        <FileDown size={22} />
        {file?.fullName && (
          <span className="max-w-24 whitespace-nowrap overflow-hidden">
            {file.fullName}
          </span>
        )}
      </button>
    </div>
  );

}

export default DownloadFileBtn;
