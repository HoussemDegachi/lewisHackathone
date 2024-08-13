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
      name: "untitled",
      type: "rename",
      toBeType: type,
      id: uuid(),
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

  const updateFile = (fileId, data) => {
    function updateObj(obj, objId, data) {
      if (obj.id === objId) for (let key in data) obj[key] = data[key];

      if (obj.contents)
        for (const content of obj.contents) updateObj(content, objId, data);
      return obj;
    }
    setDirectory({ ...updateObj(directory, fileId, data) });
  };

  return (
    <FileBarDataContext.Provider value={{ directory, createFile, updateFile }}>
      {children}
    </FileBarDataContext.Provider>
  );
}
