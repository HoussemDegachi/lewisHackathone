import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import LoadingEditor from "./LoadingEditor.jsx";
import { useEditorDataProvider } from "@/contexts/EditorDataProvider.jsx";
import BrokenEditorLine from "./BrokenEditorLine.jsx";

function EditorBox({ data, dataId }) {
  const { setErrors, errors, moveCode } = useEditorDataProvider();
  const [isBroken, setIsBroken] = useState(false);
  // wasBroken gurantess that editor can brake only once before timeouting
  const [wasBroken, setWasBroken] = useState(false);
  const [solvedLines, setSolvedLines] = useState([])
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
      // get all lines of code

      setIsBroken(true);
      const arrElemes = [];
      linesElems.forEach((lineElem) => {
        // hide them
        lineElem.classList.add("hide");
        arrElemes.push(lineElem);
      });
      
      setLines(arrElemes);
    }
  }, [errors, wasBroken]);


  // when a user clicks on a broken line pieace
  // this event fires
  function handleOnBrokenClick(i, line)
  {
    line.classList.remove("hide");
    if (!solvedLines.includes(i))
      setSolvedLines([...solvedLines, i])

  }

  useEffect(() => {
    if (solvedLines.length == lines.length && isBroken)
    {
      setIsBroken(false);
      setWasBroken(true);
      setSolvedLines([])
      // allows editor to break again after 30s
      // if needed
      setTimeout(() => {
        
        setWasBroken(false)
      }, 30000)
    }
  }, [solvedLines])


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
      />

      {isBroken && (
        <div className="absolute top-0 right-0 h-full w-full overflow-scroll py-6 backdrop-blur-sm">
          {lines.map((line, i) => (
            <BrokenEditorLine text={line.innerText} onClick={() => handleOnBrokenClick(i, line)} className={`${solvedLines.includes(i) && "hidden"}`} key={i} />
          ))}
        </div>
      )}
    </div>
  );
}

export default EditorBox;
