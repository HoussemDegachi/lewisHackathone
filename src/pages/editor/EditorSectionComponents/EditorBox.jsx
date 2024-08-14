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
  // wasBroken gurantess that editor can brake only once before timeouting
  const [wasBroken, setWasBroken] = useState(false);
  const [solvedLines, setSolvedLines] = useState([]);
  const [lines, setLines] = useState([]);

  // when errors occure in code it changes the errors variable
  // to new errors
  function handleEditorValidation(markers) {
    setErrors(markers);
  }

  // to do
  // if move is set to true
  // chose random line and move it to
  // random location in random file
  useEffect(() => {
    if (!moveCode) return;
  }, [moveCode]);

  // this will run when the code changes (onChange)
  function handleEditorChange(value, event) {
    data.content = value;
    localStorage.setItem(dataId, JSON.stringify(data));
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

  useEffect(() => {
    // console.log(lines.length, solvedLines.length)
    // console.log(lines, solvedLines)

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
        defaultValue={data.content ? data.content : ""}
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
    </div>
  );
}

export default EditorBox;
