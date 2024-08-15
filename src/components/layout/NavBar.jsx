import { useParams } from "react-router-dom";
import { Braces, FileDown, FolderDown } from "lucide-react";
import { useFileBarDataProvider } from "@/contexts/FileBarDataProvider";
import { downloadFile, downloadFolder } from "@/lib/downloadOps";
import { useState } from "react";
import Modal from "../ui/Modal";
import Quizz from "../ui/Quizz";

function NavBar() {
  const [quizState, setQuizState] = useState(false);
  const { fileId } = useParams();
  const file = JSON.parse(localStorage.getItem(fileId));
  const { directory } = useFileBarDataProvider();

  const triggerQuiz = (item) => setQuizState(item);

  const closeQuiz = () => setQuizState(false);

  const handleDownload = (setBinary) => {
    if (quizState === "file") downloadFile(fileId, setBinary);
    else if (quizState === "folder") downloadFolder(directory, setBinary);
  };

  return (
    <>
      {quizState && (
        <Modal onClose={closeQuiz}>
          <Quizz
            onSuccess={() => handleDownload(false)}
            onFailure={() => handleDownload(true)}
          />
        </Modal>
      )}
      <div className="bg-gray-900 w-full h-16 border-gray-600 border-b-2 flex items-center justify-between text-white p-2">
        <h1 className="text-3xl font-semibold flex items-center gap-2">
          <Braces size={34} strokeWidth={2.5} />
          Chaos Code Editor
        </h1>
        <div className="mr-5 flex items-center gap-2">
          {file && (
            <button
              onClick={() => triggerQuiz("file")}
              className="bg-gray-700 py-1.5 px-3 h-10 rounded-md group flex items-center text-sm"
            >
              <FileDown size={22} />
              {file?.fullName && (
                <span className="max-w-0 group-hover:max-w-28 group-hover:pl-1 whitespace-nowrap overflow-hidden transition-all duration-500">
                  {file.fullName}
                </span>
              )}
            </button>
          )}
          <button
            onClick={() => triggerQuiz("folder")}
            className="bg-gray-700 py-1.5 px-3 h-10 rounded-md group flex items-center text-sm"
          >
            <FolderDown size={22} />
            <span className="max-w-0 group-hover:max-w-20 group-hover:pl-1 whitespace-nowrap overflow-hidden transition-all duration-500">
              Project
            </span>
          </button>
        </div>
      </div>
    </>
  );
}

export default NavBar;
