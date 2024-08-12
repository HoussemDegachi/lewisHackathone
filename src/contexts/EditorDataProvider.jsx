import React, { createContext, useContext, useState } from 'react'

// initial values for context
const initialContext = {
    errors: [],
    broken: false,
    moveCode: false,
    setErrors: () => {},
    setBroken: () => {},
    setMoveCode: () => {}
}


const EditorDataContext = createContext(initialContext);
export const useEditorDataProvider = () => useContext(EditorDataContext)

export function EditorDataProvider({ children }) {
    const [errors, setErrors] = useState([]);
    const [broken, setBroken] = useState(false);
    const [moveCode, setMoveCode] = useState(false);

  return (
    <EditorDataContext.Provider value={{errors, setErrors, broken, setBroken, moveCode, setMoveCode}}>
      {children}
    </EditorDataContext.Provider>
  )
}

export default EditorDataContext