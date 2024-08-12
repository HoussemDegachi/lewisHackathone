import React from "react";
import FileList from "./FileBarCompoents/FileList";

//Dummy data
const dummyDir = {
  type: "folder",
  name: "lewis",
  id: "lewis",
  contents: [
    {
      type: "folder",
      name: "node_modules",
      id: "123",
      contents: [
        {
          type: "folder",
          name: "node_modules",
          id: "123",
        },
        {
          type: "folder",
          name: "src",
          id: "123",
        },
        {
          type: "file",
          name: ".gitignore",
          id: "123",
        },
      ],
    },
    {
      type: "folder",
      name: "src",
      id: "123",
      contents: [
        {
          type: "file",
          id: "123",
          name: "index",
        },
        {
          type: "file",
          name: "main",
          id: "123",
        },
        {
          type: "file",
          id: "123",
          name: "item",
        },
        {
          type: "file",
          id: "123",
          name: "list",
        },
        {
          id: "123",
          type: "file",
          name: "readme",
        },
      ],
    },
    {
      type: "file",
      id: "123",
      name: ".gitignore",
    },
    {
      type: "file",
      id: "123",
      name: "components",
    },
    {
      type: "file",
      id: "123",
      name: "eslint.config",
    },
    {
      type: "file",
      id: "123",
      name: "index",
    },
  ],
};

function FileBar() {
  return (
    <div className="bg-gray-900 w-full h-full flex flex-col text-white">
      <h2 className="border-gray-700 font-medium border-b-2 p-1.5">EXPLORER</h2>
      <div className="p-1">
        {/* Replace 'dummyDir' with actual data */}
        <FileList file={dummyDir} />
      </div>
    </div>
  );
}

export default FileBar;
