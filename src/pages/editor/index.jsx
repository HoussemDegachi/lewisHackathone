import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import FileBar from "./fileBar";

function index() {
  return (
    <ResizablePanelGroup
      direction="horizontal"
      className="w-full min-h-[100dvh] max-h-[100dvh]"
    >
      <ResizablePanel defaultSize={20}>
        <div className="h-full">
          <FileBar />
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={80}>
        <div className="h-full">
          <span className="font-semibold">Content</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

export default index;
