import { Box, Input } from '@chakra-ui/react';
import React, { ChangeEvent, useRef } from 'react';
import DropZoneBanner from './DropZoneBanner';

type DropZoneProps = {
  fileName?: string;
  setFile(fileName: string, fileContent: string): void;
};

const DropZone = ({ fileName, setFile }: DropZoneProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const readFile = (file: File) => {
    const fileReader = new FileReader();
    fileReader.onload = function () {
      setFile(file.name, fileReader.result as string);
    };

    fileReader.readAsText(file);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      readFile(file);
    }
  };

  const handleDrop = (file: File) => {
    readFile(file);
  };

  return (
    <Box display="flex" flexDir="column" alignItems="center" justifyContent="center" width="100%">
      <DropZoneBanner fileName={fileName} onClick={handleClick} onDrop={handleDrop} />
      <Input
        accept=".json,application/json"
        aria-label="add file"
        display="none"
        onChange={handleChange}
        ref={inputRef}
        type="file"
      />
    </Box>
  );
};

export default DropZone;
