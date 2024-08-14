import React, { createContext, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';

// initial values for context
const initialContext = {
    code: "",
    setCode: () => {},
    errors: [],
    setErrors: () => {},
    getLine: () => {},
    setLine: () => {},
    removeLine: () => {}
}


const EditorDataContext = createContext(initialContext);
export const useEditorDataProvider = () => useContext(EditorDataContext)

export function EditorDataProvider({ children }) {
  const { fileId } = useParams();
  const [code, setCode] = useState(() => (fileId && JSON.parse(localStorage.getItem(fileId))?.content) || null);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (code) {
      const fileData = JSON.parse(localStorage.getItem(fileId))
      fileData.content = code;
      localStorage.setItem(fileId, JSON.stringify(fileData))
    }
  }, [code])

  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * max) + min
  }

  const getLine = (lineNumber=null) => {
    const lines = code.split("\n")

    if (!lineNumber)
      lineNumber = getRandomNumber(0, lines.length - 1)

    if (lineNumber >= lines.length)
      return null

    return lines[lineNumber]
  }

  const setLine = (value, lineNumber=null) => {
    const lines = code.split("\n")

    if (!lineNumber)
      lineNumber = getRandomNumber(0, lines.length - 1)

    if (lineNumber >= lines.length)
      return null

    lines[lineNumber] = value;
    setCode(lines.join("\n"))
  }

  const removeLine = (lineNumber=null) => {
    const lines = code.split("\n")

    if (!lineNumber)
      lineNumber = getRandomNumber(0, lines.length - 1)

    if (lineNumber >= lines.length)
      return null

    const deletedLine = lines.splice(lineNumber, 1)
    setCode(lines.join("\n"))
    return deletedLine;
  }

  return (
    <EditorDataContext.Provider value={{errors, setErrors, code, setCode, getLine, setLine, removeLine}}>
      {children}
    </EditorDataContext.Provider>
  )
}

export default EditorDataContext