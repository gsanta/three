enum FileType {
  json = 'JSON',
  png = 'PNG',
}

export const getFileTypes = (): FileType[] => Object.values(FileType);

export default FileType;
