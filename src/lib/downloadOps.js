import JSZip from "jszip";
import { saveAs } from "file-saver";

const text2binary = (text) => {
  let result = "";
  for (let i = 0; i < text.length; i++)
    result += text[i].charCodeAt(0).toString(2) + " ";
  return result;
};

export const downloadFile = (fileId, isBinary) => {
  const file = JSON.parse(localStorage.getItem(fileId));
  if (file && file.fullName) {
    let data = isBinary ? text2binary(file.content) : file.content;
    const blob = new Blob([data]);
    const fileName = `${file.fullName}${isBinary ? ".bin" : ""}`;
    saveAs(blob, fileName);
  }
};

export const downloadFolder = (root, isBinary) => {
  function createZip(root, folder = new JSZip().folder(root.name)) {
    if (root.type === "file") {
      const file = JSON.parse(localStorage.getItem(root.id));
      let data = isBinary ? text2binary(file.content) : file.content;
      const fileName = `${file.fullName}${isBinary ? ".bin" : ""}`;
      folder.file(fileName, data);
    }

    if (root.type === "folder") {
      let subfolder = folder.folder(root.name);
      if (root.contents)
        for (const content of root.contents) createZip(content, subfolder);
    }
    return folder;
  }
  let zip = createZip(root);
  zip.generateAsync({ type: "blob" }).then(function (blob) {
    saveAs(blob, `${root.name}.zip`);
  });
};
