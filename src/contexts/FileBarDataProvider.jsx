import { v4 as uuid } from "uuid";
import { createContext, useContext, useEffect, useState } from "react";
import {
  addFileToDir,
  deleteFileInDir,
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
      name: null,
      type: "rename",
      toBeType: type,
      id: uuid(),
    };

    if (type === "folder") newObj.contents = [];

    if (type === "file") {
      localStorage.setItem(
        newObj.id,
        JSON.stringify({
          content: "",
          language: "",
        })
      );
    }

    setDirectory({ ...addFileToDir(directory, folderId, newObj) });
  };

  const updateFile = (fileId, data) => {
    setDirectory({ ...updateFileInDir(directory, fileId, data) });
  };

  const deleteFile = (fileId) => {
    localStorage.removeItem(fileId);
    setDirectory({ ...deleteFileInDir(directory, fileId) });
  };

  return (
    <FileBarDataContext.Provider
      value={{ directory, createFile, updateFile, deleteFile }}
    >
      {children}
    </FileBarDataContext.Provider>
  );
}
