import { useParams } from "react-router-dom";
import { Braces, Info } from "lucide-react";
import { useFileBarDataProvider } from "@/contexts/FileBarDataProvider";
import { downloadFile, downloadFolder } from "@/lib/downloadOps";
import { useState } from "react";
import Modal from "../ui/Modal";
import Quizz from "../ui/Quizz";
import DownloadProjectBtn from "../ui/DownloadProjectBtn";
import DownloadFileBtn from "../ui/DownloadFileBtn";

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
          <div className="flex items-center gap-2">
            <Info size={12} className="shrink-0" />
            <i className="text-2xs">
              How the files are downloaded will depend upon your quiz
              performance, so no pressure
            </i>
            😁
          </div>
        </Modal>
      )}
      <div className="bg-gray-900 w-full h-16 border-gray-600 border-b-2 flex items-center justify-between text-white p-2">
        <h1 className="text-xl font-semibold flex items-center gap-2 select-none">
          <Braces size={30} strokeWidth={2.5} />
          The Chaotic Editor
        </h1>
        <div>
          {file && (
            <DownloadFileBtn onClick={() => triggerQuiz("file")} file={file} />
          )}
          <DownloadProjectBtn onClick={() => triggerQuiz("folder")} />
        </div>
      </div>
    </>
  );
}

export default NavBar;
