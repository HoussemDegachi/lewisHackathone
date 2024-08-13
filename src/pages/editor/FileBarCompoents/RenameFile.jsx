import { useFileBarDataProvider } from "@/contexts/FileBarDataProvider";
import React, { useEffect, useRef, useState } from "react";

function RenameFile({ item, defaultVal = "" }) {
  const [name, setName] = useState(defaultVal);
  const { updateFile, deleteFile } = useFileBarDataProvider();
  const ref = useRef(null);

  const saveChanges = () => {
    if (name) updateFile(item.id, { name, type: item.toBeType });
    else deleteFile(item.id)
  }

  const handleClickOutSide = (event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      saveChanges()
    }
  };

  // useEffect(() => {
  //   return () => {
  //     deleteFile(item.id);
  //   };
  // }, []);

  useEffect(() => {
    document.addEventListener("click", handleClickOutSide);
    return () => {
      document.removeEventListener("click", handleClickOutSide);
    };
  });

  useEffect(() => {
    return () => {
      console.log(name)
    }
  }, [name])

  const handleChange = (e) => setName(e.target.value);
  const handleSubmit = (e) => {
    e.preventDefault()
    saveChanges()
  }

  return (
    <div className="w-full" onClick={(e) => e.stopPropagation()}>
      <form onSubmit={handleSubmit}>
      <input
        value={name}
        ref={ref}
        onChange={handleChange}
        className="bg-slate-700 outline-none w-full px-1 ring-2"
        />
        </form>
    </div>
  );
}

export default RenameFile;
