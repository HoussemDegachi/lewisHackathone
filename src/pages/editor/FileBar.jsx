import React from "react";
import FileList from "./FileBarCompoents/FileList";
import { useFileBarDataProvider } from "@/contexts/FileBarDataProvider";

function FileBar() {
  const { directory } = useFileBarDataProvider();

  return (
    <div className="w-full h-full flex flex-col text-white bg-[#1E1E3F]">
          <h2 className="text-xs bg-slate-950 bg-opacity-20 pl-3 py-2">
            EXPLORER
          </h2>
          <div className="p-1 select-none">
            <FileList file={directory} />
          </div>
    </div>
  );
}

export default FileBar;
