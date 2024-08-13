export function addFileToDir(directory, folderId, newItem) {
  if (directory.type === "file") return directory;
  newItem.path += `/${directory.name}`;

  if (directory.type === "folder") {
    if (directory.id === folderId) {
      newItem.path += `/${newItem.name}`;
      directory.contents.push(newItem);
      return directory;
    }
  }

  for (const content of directory.contents) {
    addFileToDir(content, folderId, newItem);
  }

  return directory;
}
