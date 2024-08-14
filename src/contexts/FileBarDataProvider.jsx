import { v4 as uuid } from "uuid";
import { createContext, useContext, useEffect, useState } from "react";
import {
  addFileToDir,
  deleteFileInDir,
  getFilePathInDir,
  updateFileInDir,
} from "@/lib/directoryOps";

const FileBarDataContext = createContext();

export const useFileBarDataProvider = () => useContext(FileBarDataContext);

export function FileBarDataProvider({ children }) {
  const [directory, setDirectory] = useState(
    JSON.parse(localStorage.getItem("directory")) || {
      id: uuid(),
      type: "folder",
      name: "untitled project",
      contents: [],
    }
  );

  useEffect(() => {
    localStorage.setItem("directory", JSON.stringify(directory));
  }, [directory]);

  const createFile = (type, folderId) => {
    const newObj = {
      name: "",
      type: "rename",
      toBeType: type,
      id: uuid(),
    };

    if (type === "folder") newObj.contents = [];

    if (type === "file") {
      newObj.extension = "";
      newObj.language = "text";
      localStorage.setItem(
        newObj.id,
        JSON.stringify({
          content: "",
          language: newObj.language,
        })
      );
    }

    setDirectory({ ...addFileToDir(directory, folderId, newObj) });
  };

  const updateFile = (fileId, data) => {
    if (data.type === "file" && data.language) {
      const localData = JSON.parse(localStorage.getItem(fileId));
      localData.language = data.language;
      localStorage.setItem(fileId, localData);
    }
    setDirectory({ ...updateFileInDir(directory, fileId, data) });
  };

  const deleteFile = (fileId) => {
    localStorage.removeItem(fileId);
    setDirectory({ ...deleteFileInDir(directory, fileId) });
  };

  const getFilePath = (fileId) => getFilePathInDir(directory, fileId);

  return (
    <FileBarDataContext.Provider
      value={{ directory, createFile, updateFile, deleteFile, getFilePath }}
    >
      {children}
    </FileBarDataContext.Provider>
  );
}
