import JSZip from "jszip";
import { useParams } from "react-router-dom";
import { Braces, FileDown, FolderDown } from "lucide-react";
import { useFileBarDataProvider } from "@/contexts/FileBarDataProvider";
import { saveAs } from "file-saver";

function NavBar() {
  const { fileId } = useParams();
  const file = JSON.parse(localStorage.getItem(fileId));
  console.log(file);

  const { directory } = useFileBarDataProvider();

  const downloadFile = (fileId) => {
    const file = JSON.parse(localStorage.getItem(fileId));
    if (file && file.language && file.content) {
      const blob = new Blob([file.content]);
      saveAs(blob, file.fullName);
    }
  };

  const downloadProject = (directory) => {
    function createZip(directory, folder = new JSZip().folder(directory.name)) {
      if (directory.type === "file") {
        const file = JSON.parse(localStorage.getItem(directory.id));
        console.log(file);

        folder.file(file.fullName, file.content);
      }

      if (directory.type === "folder") {
        let subfolder = folder.folder(directory.name);
        if (directory.contents)
          for (const content of directory.contents)
            createZip(content, subfolder);
      }
      return folder;
    }
    let zip = createZip(directory);
    zip.generateAsync({ type: "blob" }).then(function (blob) {
      saveAs(blob, `${directory.name}.zip`);
    });
  };

  return (
    <div className="bg-gray-950 w-full h-16 border-gray-600 border-b-2 flex items-center justify-between text-white p-2">
      <h1 className="text-3xl font-semibold flex items-center gap-2">
        <Braces size={34} strokeWidth={2.5} />
        Chaos Code Editor
      </h1>
      <div className="mr-5 flex items-center gap-2">
        <button
          onClick={() => downloadFile(fileId)}
          className="bg-gray-700 py-1.5 px-3 h-10 rounded-md group flex items-center text-sm"
        >
          <FileDown size={22} />
          {file?.fullName && (
            <span className="max-w-0 group-hover:max-w-28 group-hover:pl-1 whitespace-nowrap overflow-hidden transition-all duration-500">
              {file.fullName}
            </span>
          )}
        </button>
        <button
          onClick={() => downloadProject(directory)}
          className="bg-gray-700 py-1.5 px-3 h-10 rounded-md group flex items-center text-sm"
        >
          <FolderDown size={22} />
          <span className="max-w-0 group-hover:max-w-20 group-hover:pl-1 whitespace-nowrap overflow-hidden transition-all duration-500">
            Project
          </span>
        </button>
      </div>
    </div>
  );
}

export default NavBar;
