import { v4 as uuid } from "uuid";
import { createContext, useContext, useState } from "react";
// const { createContext, useContext, useState, useEffect } = require("react");

const FileBarDataContext = createContext();

export const useFileBarDataProvider = () => useContext(FileBarDataContext);

export function FileBarDataProvider({ children }) {
  const [directory, setDirectory] = useState(
    JSON.parse(localStorage.getItem("directory")) || {
      id: uuid(),
      type: "folder",
      name: "untitled folder",
      contents: [],
    }
  );

  const createFile = (type, folderId) => {
    const newObj = {
      name: `untitled ${type}`,
      type,
      id: uuid(),
      contents: [],
    };
    if (type === "folder") newObj.contents = [];

    function addFile(directory, folderId, newObj) {
      if (directory.type === "file") return directory;

      if (directory.type === "folder" && directory.id === folderId) {
        directory.contents.push(newObj);
        return directory;
      }
      for (const content of directory.contents) {
        addFile(content, folderId, newObj);
      }
      return directory;
    }

    setDirectory({ ...addFile(directory, folderId, newObj) });
  };

  return (
    <FileBarDataContext.Provider value={{ directory, createFile }}>
      {children}
    </FileBarDataContext.Provider>
  );
}
