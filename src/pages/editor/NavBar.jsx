import { Braces, FileDown, FolderDown } from "lucide-react";
import { useParams } from "react-router-dom";

function NavBar() {
  const { fileId } = useParams();
  const file = JSON.parse(localStorage.getItem(fileId));

  const downloadFile = (fileId) => {
    const file = JSON.parse(localStorage.getItem(fileId));
    if (file && file.language && file.content) {
      const blob = new Blob([file.content]);
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.download = file.fullName;
      link.href = url;
      link.click();
    }
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
          className="bg-gray-700 py-1.5 px-3 h-10 rounded-md group flex items-center flex-1 text-base"
        >
          <FileDown size={22} />
          {file?.fullName && (
            <span className="max-w-0 group-hover:max-w-20 group-hover:pl-1 whitespace-nowrap overflow-hidden transition-all duration-500">
              {file.fullName}
            </span>
          )}
        </button>
        <button className="bg-gray-700 py-1.5 px-3  h-10 rounded-md group flex items-center flex-1 text-base">
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
