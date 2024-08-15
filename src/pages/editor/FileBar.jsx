import React from "react";
import FileList from "./FileBarCompoents/FileList";
import { useFileBarDataProvider } from "@/contexts/FileBarDataProvider";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import TimeLine from "./FileBarCompoents/TimeLine";

function FileBar() {
  const { directory } = useFileBarDataProvider();

  return (
    <div className="w-full h-full flex flex-col text-white bg-[#1E1E3F]">
      <ResizablePanelGroup direction={"vertical"}>
        <ResizablePanel defaultSize={80}>
      <h2 className="text-xs bg-slate-950 bg-opacity-20 pl-3 py-2">EXPLORER</h2>
      <div className="p-1 select-none">
        <FileList file={directory} />
      </div>
        </ResizablePanel>
        <ResizableHandle withHandle={false} className={"bg-neutral-400"} />
        <ResizablePanel defaultSize={20} className="max-h-[50%]">
          <TimeLine /> 
        </ResizablePanel>
    </ResizablePanelGroup>
    </div>
  );
}

export default FileBar;
