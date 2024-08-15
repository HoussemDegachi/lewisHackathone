import JSZip from "jszip";
import { saveAs } from "file-saver";

export const downloadFile = (fileId) => {
  const file = JSON.parse(localStorage.getItem(fileId));
  if (file && file.language && file.content) {
    const blob = new Blob([file.content]);
    saveAs(blob, file.fullName);
  }
};

export const downloadFolder = (root) => {
  function createZip(root, folder = new JSZip().folder(root.name)) {
    if (root.type === "file") {
      const file = JSON.parse(localStorage.getItem(root.id));
      folder.file(file.fullName, file.content);
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
