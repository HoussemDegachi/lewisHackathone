import { useFileBarDataProvider } from "@/contexts/FileBarDataProvider";
import React, { useEffect, useRef, useState } from "react";

function RenameFile({ item }) {
  console.log("render");

  const [name, setName] = useState(item.name || "");
  const { updateFile, deleteFile } = useFileBarDataProvider();
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) ref.current.focus();
  }, []);

  const handleClickOutSide = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      if (name) updateFile(item.id, { name, type: item.toBeType });
      else if (item.name)
        updateFile(item.id, { name: item.name, type: item.toBeType });
      else deleteFile(item.id);
    }
  };

  // useEffect(() => {
  //   console.log(name);
  //   return () => {
  //     console.log(name);
  //     // deleteFile(item.id);
  //   };
  // });

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
        className="bg-slate-700 outline-none w-full px-1 focus:ring-2"
      />
    </div>
  );
}

export default RenameFile;
