import { useFileBarDataProvider } from "@/contexts/FileBarDataProvider";
import { FilePen } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import FileList from "./FileList";
import AlertModal from "./AlertModal";

const fileExtensionMap = {
  ts: "typescript",
  js: "javascript",
  css: "css",
  less: "less",
  scss: "scss",
  json: "json",
  html: "html",
};

function RenameFile({ item }) {
  const [input, setInput] = useState(
    `${item.name}${item.extension ? `.${item.extension}` : ""}` || ""
  );
  const [modal, setModal] = useState(false);

  const [fileName, fileExtension] = input.split(/\.(?=[^.]+$)/);
  const { updateFile, deleteFile } = useFileBarDataProvider();
  const ref = useRef(null);

  const saveChanges = () => {
    const updateData = {
      type: item.toBeType,
    };
    if (item.toBeType === "folder") {
      updateData.name = input;
    }
    if (item.toBeType === "file") {
      updateData.name = fileName;
      updateData.extension = fileExtension || "txt";
    }

    if (input) updateFile(item.id, updateData);
    else if (item.name) updateFile(item.id, updateData);
    else deleteFile(item.id);
  };

  const handleModalSubmit = () => {
    setModal(false);
    saveChanges();
  };

  const handleClickOutSide = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      if (item.toBeType === "file") {
        if (!fileExtensionMap[fileExtension]) setModal(true);
        else saveChanges();
      } else if (item.toBeType === "folder") saveChanges();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutSide);
    return () => {
      document.removeEventListener("click", handleClickOutSide);
    };
  });

  const handleChange = (e) => setInput(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (item.toBeType === "file") {
      if (!fileExtensionMap[fileExtension]) setModal(true);
      else saveChanges();
    } else if (item.toBeType === "folder") saveChanges();
  };

  return (
    <>
      {modal && <AlertModal onSubmit={handleModalSubmit} />}
      <div className="w-full" onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <div className="flex items-center">
            <FilePen size={16} />
            <input
              name="input"
              value={input}
              ref={ref}
              onChange={handleChange}
              autoFocus
              className="bg-slate-700 outline-none w-full px-1 focus:ring-2"
            />
          </div>
        </form>
        <div className="pl-3">
          {item?.contents?.map((file) => (
            <FileList file={file} key={file.id} />
          ))}
        </div>
      </div>
    </>
  );
}

export default RenameFile;
