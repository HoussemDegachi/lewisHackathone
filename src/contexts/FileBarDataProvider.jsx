import { v4 as uuid } from "uuid";
import { createContext, useContext, useEffect, useState } from "react";
import {
  addFileToDir,
  deleteFileInDir,
  getFilePathInDir,
  updateFileInDir,
} from "@/lib/directoryOps";
import { fileExtensionMap } from "@/lib/utils";

const FileBarDataContext = createContext();

export const useFileBarDataProvider = () => useContext(FileBarDataContext);

export function FileBarDataProvider({ children }) {
  const [newFile, setNewFile] = useState(null);
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
    if (newFile) return;
    const newObj = {
      name: "",
      type: "rename",
      toBeType: type,
      id: uuid(),
    };
    setNewFile(newObj.id);

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
    if (newFile === fileId) setNewFile(null);
    if (data.type === "file" && data.extension) {
      const localData = JSON.parse(localStorage.getItem(fileId));
      localData.language = fileExtensionMap[data.extension] || data.extension;
      localData.fullName = `${data.name}.${data.extension}`;
      localStorage.setItem(fileId, JSON.stringify(localData));
    }
    setDirectory({ ...updateFileInDir(directory, fileId, data) });
  };

  const deleteFile = (fileId) => {
    if (newFile === fileId) setNewFile(null);
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
