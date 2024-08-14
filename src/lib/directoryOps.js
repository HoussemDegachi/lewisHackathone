export function addFileToDir(directory, folderId, newItem) {
  if (directory.type === "file") return directory;

  if (directory.type === "folder") {
    if (directory.id === folderId) {
      directory.contents.push(newItem);
      return directory;
    }
    if (directory.contents)
      for (const content of directory.contents) {
        addFileToDir(content, folderId, newItem);
      }
  }
  return directory;
}

export function updateFileInDir(directory, objId, data) {
  if (directory.id === objId) {
    for (let key in data) {
      directory[key] = data[key];
    }
    return directory;
  }

  if (directory.contents)
    for (const content of directory.contents) {
      updateFileInDir(content, objId, data);
    }

  return directory;
}

export function deleteFileInDir(directory, itemId) {
  if (directory.type === "file") return directory;

  if (directory.type === "folder") {
    if (directory.contents) {
      directory.contents = directory.contents.filter(
        (content) => content.id !== itemId
      );

      for (const content of directory.contents)
        deleteFileInDir(content, itemId);
    }
    return directory;
  }
}

export function getFilePathInDir(directory, fileId, path = "") {
  if (directory.type === "file" && directory.id === fileId)
    return `${path}/${directory.name}`;

  if (directory.type === "folder") {
    if (directory.contents)
      for (const content of directory.contents) {
        const subPath = getPath(content, fileId, `${path}/${directory.name}`);
        if (subPath) return subPath;
      }
  }
  return "";
}
