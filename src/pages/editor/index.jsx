import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable.jsx";
import FileBar from "./FileBar.jsx";
import EditorSection from "./EditorSection.jsx";
import NoFile from "./EditorSectionComponents/NoFile.jsx";
import { EditorDataProvider } from "@/contexts/EditorDataProvider.jsx";

function index({ isRoot }) {
  return (
    // create a resizable panel with two sides
    <ResizablePanelGroup
      direction="horizontal"
      className="w-full min-h-[100dvh] max-h-[100dvh]"
    >
      
      <EditorDataProvider>
        {/* small side is for file bar */}
        <ResizablePanel
          defaultSize={20}
          className="min-w-[180px] max-w-[300px]"
        >
          <div className="h-full">
            <FileBar />
          </div>
        </ResizablePanel>
        <ResizableHandle className={"bg-neutral-400"} />
        {/* large side is for code editor section */}
        <ResizablePanel defaultSize={80}>
          <div className="h-full">
            {isRoot ? <NoFile /> : <EditorSection />}
          </div>
        </ResizablePanel>
      </EditorDataProvider>
    </ResizablePanelGroup>
  );
}

export default index;
