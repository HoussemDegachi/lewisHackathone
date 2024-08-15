import { getRandomNumber } from '@/lib/utils';
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
    removeLine: () => {},
    pushLine: () => {},
    fileId: "",
    setFileId: () => {}
}


const EditorDataContext = createContext(initialContext);
export const useEditorDataProvider = () => useContext(EditorDataContext)

export function EditorDataProvider({ children }) {
  const [fileId, setFileId] = useState(null)
  const [code, setCode] = useState(null);
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    setCode(fileId && JSON.parse(localStorage.getItem(fileId))?.content)
  }, [fileId])

  useEffect(() => {
    if (code != null) {
      const fileData = JSON.parse(localStorage.getItem(fileId))
      fileData.content = code;
      localStorage.setItem(fileId, JSON.stringify(fileData))
    }
  }, [code])


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

    return {deletedLine, lineNumber};
  }

  const pushLine = (value, lineNumber) => {
    const lines = code.split("\n")
    if (lineNumber >= lines.length)
      return null
    lines.splice(lineNumber, 0, value)
    setCode(lines.join("\n"))
  }

  return (
    <EditorDataContext.Provider value={{errors, setErrors, code, setCode, getLine, setLine, removeLine, pushLine, fileId, setFileId}}>
      {children}
    </EditorDataContext.Provider>
  )
}

export default EditorDataContext