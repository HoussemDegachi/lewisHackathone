import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import LoadingEditor from "./LoadingEditor.jsx";
import { useEditorDataProvider } from "@/contexts/EditorDataProvider.jsx";
import BrokenEditorLine from "./BrokenEditorLine.jsx";
import { useToast } from "@/components/ui/use-toast.js";

function EditorBox({ data, dataId }) {
  const { toast } = useToast();
  const { setErrors, errors, moveCode } = useEditorDataProvider();
  const [isBroken, setIsBroken] = useState(false);
  const [wasBroken, setWasBroken] = useState(false);
  const [solvedLines, setSolvedLines] = useState([]);
  const [lines, setLines] = useState([]);

  // Define the custom "Glitchy Madness" theme
  const handleEditorWillMount = (monaco) => {
    monaco.editor.defineTheme("glitchyMadness", {
      base: "vs-dark",
      inherit: true,
      rules: [
        { token: "comment", foreground: "A9A9A9" }, // Dim Gray for comments
        { token: "keyword", foreground: "00FFFF" }, // Electric Blue for keywords
        { token: "string", foreground: "FFFF00" }, // Neon Yellow for strings
        { token: "number", foreground: "FF4500" }, // Glowing Red for numbers/errors
        { token: "variable", foreground: "39FF14" }, // Neon Green for variables
      ],
      colors: {
        "editor.background": "#2C003E", // Dark Purple for background
        "editor.foreground": "#39FF14", // Neon Green for text
        "editorCursor.foreground": "#FF1493", // Bright Pink for cursor
        "editorLineNumber.foreground": "#FF4500", // Glowing Red for line numbers
        // "editor.lineHighlightBackground": "#6F00FF", // Electric Indigo for line highlights
        "editor.selectionBackground": "#FF00FF", // Magenta for selected text background
        "editor.wordHighlightBackground": "#8B0000", // Blood Red for insult text (custom effect needed)
      },
    });
  };

  // Handle editor validation and update errors
  function handleEditorValidation(markers) {
    setErrors(markers);
  }

  // To-do: Handle code movement if moveCode is set to true
  useEffect(() => {
    if (!moveCode) return;
  }, [moveCode]);

  // Handle code changes and save them to local storage
  function handleEditorChange(value, event) {
    data.content = value;
    localStorage.setItem(dataId, JSON.stringify(data));
  }

  // Maximum allowed mistakes before breaking the editor
  const maxMistakes = 5;
  useEffect(() => {
    const linesElems = document.querySelectorAll(".view-line");
    if (errors.length >= maxMistakes && !wasBroken && !isBroken) {
      toast({
        title: "Max number of errors exceeded!",
        description: "Catch your code to return it back",
        variant: "destructive",
      });
      setIsBroken(true);

      // Hide all lines of code when the editor breaks
      const arrElemes = [];
      linesElems.forEach((lineElem) => {
        if (lineElem.innerText) {
          lineElem.classList.add("hide");
          arrElemes.push(lineElem);
        }
      });

      setLines(arrElemes);
    }
  }, [errors, wasBroken]);

  // Handle clicks on broken line pieces to restore them
  function handleOnBrokenClick(i, line) {
    line.classList.remove("hide");
    if (!solvedLines.includes(i)) setSolvedLines([...solvedLines, i]);
  }

  // Monitor solved lines to restore the editor once all pieces are clicked
  useEffect(() => {
    if (solvedLines.length === lines.length && isBroken) {
      setIsBroken(false);
      setWasBroken(true);
      setSolvedLines([]);

      toast({
        title: "Hurry up!",
        description: "You have 30s to get below the errors limit",
        variant: "destructive",
      });

      // Allow the editor to break again after 30 seconds if needed
      setTimeout(() => {
        setWasBroken(false);
      }, 30000);
    }
  }, [solvedLines]);

  return (
    <div className="h-full bg-editor relative">
      <Editor
        beforeMount={handleEditorWillMount} // Set up the custom theme before the editor mounts
        height="100%"
        defaultLanguage={data.language ? data.language : "javascript"}
        defaultValue={data.content ? data.content : ""}
        loading={<LoadingEditor />}
        theme="glitchyMadness" // Apply the "Glitchy Madness" theme
        onValidate={handleEditorValidation}
        onChange={handleEditorChange}
        options={{ readOnly: isBroken }} // Make the editor read-only when broken
      />

      {isBroken && (
        <div className="absolute top-0 right-0 h-full w-full overflow-scroll py-6">
          {lines.map((line, i) => (
            <BrokenEditorLine text={line.innerText} onClick={() => handleOnBrokenClick(i, line)} className={`${solvedLines.includes(i) && "hidden"}`} key={i} />
          ))}
        </div>
      )}
    </div>
  );
}

export default EditorBox;
