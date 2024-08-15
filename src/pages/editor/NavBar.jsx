import { Braces, Download } from "lucide-react";
import React from "react";
import { useParams } from "react-router-dom";

function NavBar() {
  const { fileId } = useParams();
  const file = JSON.parse(localStorage.getItem(fileId));
  console.log(file);

  const handleDownload = () => {
    if (file && file.language && file.content) {
      const blob = new Blob([file.content], {
        type: "text/javascript",
      });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.download = `apple.js`;
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
      <button
        onClick={handleDownload}
        className="mr-5 text-base capitalize flex items-center gap-1.5 bg-gray-700 py-1 px-3 rounded-md"
      >
        <Download />
        DOWNLOAD
      </button>
    </div>
  );
}

export default NavBar;
