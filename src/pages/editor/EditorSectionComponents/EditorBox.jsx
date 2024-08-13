import React, { useEffect } from "react";
import Editor from "@monaco-editor/react";
import LoadingEditor from "./LoadingEditor.jsx";
import { useEditorDataProvider } from "@/contexts/EditorDataProvider.jsx";

function EditorBox() {
    const {broken, setErrors, moveCode} = useEditorDataProvider();

    // when errors occure in code it changes the errors variable
    // to new errors
    function handleEditorValidation(markers) {
        setErrors(markers);
    }

    // to do
    // if broken is set to true
    // make the lines of the editor collapse
    useEffect(() => {
        if (!broken)
            return;

    }, [broken])

    // to do
    // if move is set to true
    // chose random line and move it to 
    // random location in random file
    useEffect(() => {
        if (!moveCode)
            return;
    }, [moveCode])


  return (
    <Editor
      height="100%"
      defaultLanguage="javascript"
      defaultValue="// some comment"
      loading={<LoadingEditor />}
      theme="vs-dark"
      onValidate={handleEditorValidation}
    />
  );
}

export default EditorBox;
