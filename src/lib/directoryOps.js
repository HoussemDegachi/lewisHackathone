export function addFileToDir(directory, folderId, newItem) {
  if (directory.type === "file") return directory;

  if (directory.type === "folder") {
    if (directory.id === folderId) {
      directory.contents.push(newItem);
      return directory;
    }
    if (directory.contents)
      for (const content of directory.contents) {
        content = addFileToDir(content, folderId, newItem);
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
