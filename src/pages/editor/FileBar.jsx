import FileList from "./fileBarComponents/FileList";
import SavePageButton from "@/components/ui/saveButton";
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
    <div className="bg-gray-900 w-full h-full flex flex-col text-white">
<<<<<<< HEAD
      <h2 className="border-gray-700 font-medium border-b-2 p-1.5">EXPLORER</h2>
      <SavePageButton />
=======
      <h2 className="border-gray-700 text-2xs border-b-2 px-5 py-2">EXPLORER</h2>
>>>>>>> d5d3209aee244af7e827e380206b4ce34cfae86e
      <div className="p-1">
        {/* Replace 'dummyDir' with actual data */}
        <FileList file={dummyDir} />
      </div>
    </div>
  );
}

export default FileBar;
