import { useFileBarDataProvider } from "@/contexts/FileBarDataProvider";
import React, { useEffect, useRef, useState } from "react";

function RenameFile({ item, defaultVal = "" }) {
  const [name, setName] = useState(defaultVal);
  const { updateFile, deleteFile } = useFileBarDataProvider();
  const ref = useRef(null);

  const handleClickOutSide = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      if (name) updateFile(item.id, { name, type: item.toBeType });
      else deleteFile(item.id);
    }
  };

  useEffect(() => {
    return () => {
      deleteFile(item.id);
    };
  }, []);

  useEffect(() => {
    document.addEventListener("click", handleClickOutSide);
    return () => {
      document.removeEventListener("click", handleClickOutSide);
    };
  });

  const handleChange = (e) => setName(e.target.value);

  return (
    <div className="w-full" onClick={(e) => e.stopPropagation()}>
      <input
        value={name}
        ref={ref}
        onChange={handleChange}
        className="bg-gray-700 outline-none w-full px-1 ring-2"
      />
    </div>
  );
}

export default RenameFile;
