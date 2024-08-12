const { createContext, useContext, useState, useEffect } = require("react");

const FileBarDataContext = createContext();

export const useFileBarDataContext = () => useContext(FileBarDataContext);

export function FileBarDataProvider({ children }) {
  const [directory, setDirectory] = useState(
    JSON.parse(localStorage.getItem("directory") || {})
  );

  return <FileBarDataContext.Provider>{children}</FileBarDataContext.Provider>;
}
