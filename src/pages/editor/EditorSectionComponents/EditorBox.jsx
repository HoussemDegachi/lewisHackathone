import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import LoadingEditor from "./LoadingEditor.jsx";
import { useEditorDataProvider } from "@/contexts/EditorDataProvider.jsx";
import BrokenEditorLine from "./BrokenEditorLine.jsx";
import { useToast } from "@/components/ui/use-toast.js";
import { getRandomNumber } from "@/lib/utils.js";
import MovingCodeItem from "./MovingCodeItem.jsx";

function EditorBox({ data }) {
  const { toast } = useToast();
  const { setErrors, errors, code, setCode, removeLine, pushLine } = useEditorDataProvider();
  const [isBroken, setIsBroken] = useState(false);
  // wasBroken gurantess that editor can brake only once before timeouting
  const [wasBroken, setWasBroken] = useState(false);
  const [movingCode, setMovingCode] = useState(null);
  const [solvedLines, setSolvedLines] = useState([]);
  const [lines, setLines] = useState([]);

  // when errors occure in code it changes the errors variable
  // to new errors
  function handleEditorValidation(markers) {
    setErrors(markers);
  }

  // making your line of code
  // imigrate to other files
  const minMoveTime = 2 * 60000; // min 2m (in ms)
  const maxMoveTime = 8 * 60000; // max 8m (in ms)
  const runningTime = 20 * 1000; // runs in screen for 10s (in ms)

  function tryMoveCode() {
    if (code) {
      // remove code
      const removedData = removeLine();

      // make code move
      setMovingCode(removedData);

      // alert user
      toast({
        title: "Oh no a line of code is escaping!",
        description: "Catch it now or it will never comeback",
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
      if (timeoutFunc) clearTimeout(timeoutFunc)

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

  // responsible for breaking the editor
  // if it passes x mistakes
  const maxMistakes = 5;
  useEffect(() => {
    const linesElems = document.querySelectorAll(".view-line");
    if (errors.length >= maxMistakes && !wasBroken && !isBroken) {
      toast({
        title: "Max number of errors exceded!",
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
    pushLine(movingCode.deletedLine, movingCode.lineNumber)
    setMovingCode(null)
  }

  useEffect(() => {
    if (solvedLines.length == lines.length && isBroken) {
      setIsBroken(false);
      setWasBroken(true);
      setSolvedLines([]);

      toast({
        title: "Hury up!",
        description: "You have 30s to get below errors limit",
        variant: "destructive",
      });

      // allows editor to break again after 30s
      // if needed
      setTimeout(() => {
        setWasBroken(false);
      }, 30000);
    }
  }, [solvedLines]);

  return (
    <div className="h-full bg-editor relative">
      <Editor
        // className={`${isBroken && "hidden"}`}
        height="100%"
        defaultLanguage={data.language ? data.language : "javascript"}
        defaultValue={code ? code : ""}
        value={code}
        loading={<LoadingEditor />}
        theme="vs-dark"
        onValidate={handleEditorValidation}
        onChange={handleEditorChange}
        options={{ readOnly: isBroken }}
      />

      {isBroken && (
        <div className="absolute top-0 right-0 h-full w-full overflow-scroll py-6">
          {lines.map((line, i) => (
            <BrokenEditorLine
              text={line.innerText}
              onClick={() => handleOnBrokenClick(i, line)}
              className={`${solvedLines.includes(i) && "hidden"}`}
              key={i}
            />
          ))}
        </div>
      )}

      {movingCode && <MovingCodeItem codeText={movingCode.deletedLine} onClick={handleOnRunningClick} />}
    </div>
  );
}

export default EditorBox;
