import React from "react";
import FileList from "./FileBarCompoents/FileList";
import { useFileBarDataProvider } from "@/contexts/FileBarDataProvider";
import SavePageButton from "@/components/ui/saveButton";

function FileBar() {
  const { directory } = useFileBarDataProvider();
  // console.dir(directory);

  return (
    <div className="w-full h-full flex flex-col text-white bg-slate-900">
      <h2 className="border-gray-700 font-medium border-b-2 p-1.5">EXPLORER</h2>
      <SavePageButton />
      <div className="p-1 select-none">
        <FileList file={directory} />
      </div>
    </div>
  );
}

export default FileBar;
