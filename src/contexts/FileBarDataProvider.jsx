import { v4 as uuid } from "uuid";
import { createContext, useContext, useEffect, useState } from "react";
import { addFileToDir } from "@/lib/directoryOps";

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
      path: "",
      id: uuid(),
    };

    if (type === "folder") newObj.contents = [];

    setDirectory({ ...addFileToDir(directory, folderId, newObj) });
    console.log(newObj);

    if (type === "file") {
      const fileInfo = {
        content: "",
        path: newObj.path,
        language: "",
      };
      localStorage.setItem(
        newObj.id,
        JSON.stringify({
          fileInfo,
        })
      );
    }
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
          path = path.split("/");
          path.pop();
          path = path.join("/");
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
