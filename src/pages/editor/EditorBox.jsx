import React from "react";
import Editor from "@monaco-editor/react";

function EditorBox() {
  return (
    <Editor
      height="100%"
      defaultLanguage="javascript"
      defaultValue="// some comment"
      theme="vs-dark"
    />
  );
}

export default EditorBox;
