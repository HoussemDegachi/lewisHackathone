import React from "react";
import FileList from "./fileBarComponents/FileList";

//Dummy data
const dummyDir = {
  type: "folder",
  name: "lewis",
  contents: [
    {
      type: "folder",
      name: "node_modules",
      contents: [
        {
          type: "folder",
          name: "node_modules",
        },
        {
          type: "folder",
          name: "src",
        },
        {
          type: "file",
          name: ".gitignore",
        },
      ],
    },
    {
      type: "folder",
      name: "src",
      contents: [
        {
          type: "file",
          name: "index",
        },
        {
          type: "file",
          name: "main",
        },
        {
          type: "file",
          name: "item",
        },
        {
          type: "file",
          name: "list",
        },
        {
          type: "file",
          name: "readme",
        },
      ],
    },
    {
      type: "file",
      name: ".gitignore",
    },
    {
      type: "file",
      name: "components",
    },
    {
      type: "file",
      name: "eslint.config",
    },
    {
      type: "file",
      name: "index",
    },
  ],
};

function FileBar() {
  return (
    <div className="bg-gray-900 w-full h-full flex flex-col text-white space-y-1">
      <h2 className="border-gray-700 border-b-2 p-1.5">EXPLORER</h2>
      <div className="p-1">
        {/* Replace 'dummyDir' with actual data */}
        <FileList file={dummyDir} />
      </div>
    </div>
  );
}

export default FileBar;
