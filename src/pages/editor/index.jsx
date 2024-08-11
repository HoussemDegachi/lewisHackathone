import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import FileBar from "./fileBar";
import EditorSection from "./EditorSection";

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
      <ResizableHandle className={"bg-neutral-400"} />
      <ResizablePanel defaultSize={80}>
        <div className="h-full">
          <EditorSection />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}

export default index;
