import React, { useEffect, useState } from "react";
import Editor, { loader, useMonaco } from "@monaco-editor/react";
import LoadingEditor from "./LoadingEditor.jsx";
import { useEditorDataProvider } from "@/contexts/EditorDataProvider.jsx";
import BrokenEditorLine from "./BrokenEditorLine.jsx";
import { useToast } from "@/components/ui/use-toast.js";
import { getRandomNumber } from "@/lib/utils.js";
import MovingCodeItem from "./MovingCodeItem.jsx";
import gloom from "@/theme/gloom.json";

function EditorBox({ }) {
  const { toast } = useToast();
  const { setErrors, errors, code, setCode, removeLine, pushLine, language } = useEditorDataProvider();
  const [isBroken, setIsBroken] = useState(false);
  const [wasBroken, setWasBroken] = useState(false);
  const [movingCode, setMovingCode] = useState(null);
  const [solvedLines, setSolvedLines] = useState([]);
  const [lines, setLines] = useState([]);

  // Define the custom "Glitchy Madness" theme
  const handleEditorDidMount = (monaco) => {
    monaco.editor.defineTheme("gloom", {
      inherit: true,
      base: "vs-dark",
      ...gloom,
    });
  };

  // Handle editor validation and update errors
  function handleEditorValidation(markers) {
    setErrors(Object.keys(markers));
  }

  // making your line of code
  // escape out of your file
  const minMoveTime = 40 * 1000; // min 40s (in ms)
  const maxMoveTime = 60 * 1000; // max 60s (in ms)
  const runningTime = 20 * 1000; // runs in screen for 20s (in ms)

  function tryMoveCode() {
    if (code) {
      // remove code
      const removedData = removeLine();

      // make code move
      setMovingCode(removedData);

      // alert user
      toast({
        title: "Oh no a line of code is escaping!",
        description: "Catch it now or it will never come back",
        variant: "destructive",
      });
    } else {
      setMovingCode(null);
    }
  }

  let timeoutFunc;
  useEffect(() => {
    if (movingCode === null) {
      const nextIn = getRandomNumber(minMoveTime, maxMoveTime);
      if (timeoutFunc) clearTimeout(timeoutFunc);

      setTimeout(() => {
        setMovingCode("");
      }, nextIn);
    } else if (!movingCode) {
      tryMoveCode();
    } else {
      timeoutFunc = setTimeout(() => {
        setMovingCode(null);
      }, runningTime);
    }
  }, [movingCode]);

  // this will run when the code changes (onChange)
  function handleEditorChange(value, event) {
    setCode(value);
  }

  // Maximum allowed mistakes before breaking the editor
  const maxMistakes = 5;
  useEffect(() => {
    const linesElems = document.querySelectorAll(".view-line");
    if (errors.length >= maxMistakes && !wasBroken && !isBroken) {
      toast({
        title: "Max number of errors (5) exceeded!",
        description: "Catch your code to return it back",
        variant: "destructive",
      });
      setIsBroken(true);

      // get all lines of code
      const arrElemes = [];
      linesElems.forEach((lineElem) => {
        // hide them
        if (lineElem.innerText) {
          lineElem.classList.add("hide");
          arrElemes.push(lineElem);
        }
      });

      setLines(arrElemes);
    }
  }, [errors, wasBroken]);

  // when a user clicks on a broken line pieace
  // this event fires
  function handleOnBrokenClick(i, line) {
    line.classList.remove("hide");
    if (!solvedLines.includes(i)) setSolvedLines([...solvedLines, i]);
  }

  function handleOnRunningClick() {
    pushLine(movingCode.deletedLine, movingCode.lineNumber);
    setMovingCode(null);
  }

  // Monitor solved lines to restore the editor once all pieces are clicked
  useEffect(() => {
    if (solvedLines.length == lines.length && isBroken) {
      setIsBroken(false);
      setWasBroken(true);
      setSolvedLines([]);

      toast({
        title: "Hurry up!",
        description: "You have 30s to get below the errors limit (5)",
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
        beforeMount={handleEditorDidMount} // Set up the custom theme before the editor mounts
        height="100%"
        language={language}
        defaultValue={code ? code : ""}
        value={code}
        loading={<LoadingEditor />}
        theme="gloom"
        onValidate={handleEditorValidation}
        onChange={handleEditorChange}
        options={{
          readOnly: isBroken,
          fontSize: 14,
          fontLigatures: true,
          wordWrap: "on",
          minimap: {
            enabled: false,
          },
          bracketPairColorization: {
            enabled: true,
          },
          cursorBlinking: "expand",
          formatOnPaste: true,
          suggest: {
            showFields: false,
            showFunctions: false,
          },
        }}
      />

      {isBroken && (
        <div className="absolute top-0 right-0 h-full w-full overflow-scroll py-6">
          {lines.map((line, i) => (
            <BrokenEditorLine text={line.innerText} onClick={() => handleOnBrokenClick(i, line)} className={`${solvedLines.includes(i) && "hidden"}`} key={i} />
          ))}
        </div>
      )}

      {movingCode && <MovingCodeItem codeText={movingCode.deletedLine} onClick={handleOnRunningClick} />}
    </div>
  );
}

export default EditorBox;
