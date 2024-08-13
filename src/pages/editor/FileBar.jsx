
import React from "react";
import FileList from "./FileBarCompoents/FileList";
import { useFileBarDataProvider } from "@/contexts/FileBarDataProvider";
import SavePageButton from "@/components/ui/saveButton";

function FileBar() {
  const { directory } = useFileBarDataProvider();

  return (
    <div className="bg-gray-900 w-full h-full flex flex-col text-white">
      <h2 className="border-gray-700 font-medium border-b-2 p-1.5">EXPLORER</h2>
      <div className="p-1 select-none">
        <FileList file={directory} />
      </div>
    </div>
  );
}

export default FileBar;
