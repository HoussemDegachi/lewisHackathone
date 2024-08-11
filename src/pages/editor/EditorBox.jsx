import React from "react";
import Editor from "@monaco-editor/react";
import LoadingEditor from "./LoadingEditor";

function EditorBox() {
  return (
    <Editor
      height="100%"
      defaultLanguage="javascript"
      defaultValue="// some comment"
      loading={<LoadingEditor />}
      theme="vs-dark"
    />
  );
}

export default EditorBox;
