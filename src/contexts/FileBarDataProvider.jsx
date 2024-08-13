import { v4 as uuid } from "uuid";
import { createContext, useContext, useEffect, useState } from "react";
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

  useEffect(() => {
    localStorage.setItem("directory", JSON.stringify(directory))
  }, [directory])

  const createFile = (type, folderId) => {
    const newObj = {
      name: "untitled",
      type: "rename",
      path: "",
      toBeType: type,
      id: uuid(),
    };
    if (type === "folder") newObj.contents = [];
    else if (type === "file") {
      const fileInfo = {
        content: "",
        path: "",
        language: "",
      };
      localStorage.setItem(newObj.id, JSON.stringify(fileInfo));
    }

    let path = "";
    function addFile(directory, folderId, newObj) {
      if (directory.type === "file") return directory;

      if (directory.type === "folder") {
        if (!path) path = directory.name;
        else path += `/${directory.name}`;

        if (directory.id === folderId) {
          newObj.path = path + `${path ? "/" : ""}${newObj.name}`;
          if (type == "file") {
            const fileData = {
              content: "",
              languge: "",
              path: newObj.path,
            };

            localStorage.setItem(newObj.id, JSON.stringify(fileData));
          }

          directory.contents.push(newObj);
          return directory;
        }
      }
      for (const content of directory.contents) {
        addFile(content, folderId, newObj);
        path = path.split("/")
        path.pop()
        path = path.join("/")
      }
      return directory;
    }

    setDirectory({ ...addFile(directory, folderId, newObj) });
  };

  const updateFile = (fileId, data) => {
    let path = "";
    function updateObj(obj, objId, data) {
      const currentName = obj.name;

      if (obj.id === objId)
        for (let key in data) {
          obj[key] = data[key];
        }

      if (obj.type == "folder") {
        if (!path) path = obj.name;
        else path += `/${obj.name}`;
      } else if (obj.name !== currentName) {
        if (obj.type === "file") {
          obj.path = path + `${path ? "/" : ""}${obj.name}`;
          const data = JSON.parse(localStorage.getItem(obj.id));
          data.path = obj.path;
          localStorage.setItem(obj.id, JSON.stringify(data));
        } else if (obj.type === "folder") {
          obj.path = path;
        }
      }

      if (obj.contents)
        for (const content of obj.contents) {
          updateObj(content, objId, data);
          path = path.split("/")
          path.pop()
          path = path.join("/")
        }
      return obj;
    }
    setDirectory({ ...updateObj(directory, fileId, data) });
  };

  const deleteFile = (fileId) => {
    function deletObj(obj, objId) {
      if (obj.contents)
        obj.contents = obj.contents.filter((content) => content.id !== objId);
      if (obj.contents)
        for (const content of obj.contents) deletObj(content, objId);
      return obj;
    }
    setDirectory({ ...deletObj(directory, fileId) });
  };

  return (
    <FileBarDataContext.Provider
      value={{ directory, createFile, updateFile, deleteFile }}
    >
      {children}
    </FileBarDataContext.Provider>
  );
}
