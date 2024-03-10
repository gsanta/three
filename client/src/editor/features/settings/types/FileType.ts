enum FileType {
  json = 'JSON',
}

export const getFileTypes = (): FileType[] => Object.values(FileType);

export default FileType;
