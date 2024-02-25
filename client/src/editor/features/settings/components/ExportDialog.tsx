import React, { useState } from 'react';
import Dialog, { DialogProps, DialogBody, DialogFooter } from '../../../../common/components/Dialog';
import { Button, FormControl, FormLabel, Select } from '@chakra-ui/react';
import FileType, { getFileTypes } from '../types/FileType';

const ExportDialog = ({ isOpen, onClose }: Omit<DialogProps, 'title' | 'children'>) => {
  const [selectedFileType, setSelectedFileType] = useState<FileType>(FileType.json);

  const exportImage = () => {
    onClose();
  };

  const exportDocument = () => {
    onClose();
  };

  const handleExport = () => {
    switch (selectedFileType) {
      case FileType.png:
        exportImage();
        break;
      case FileType.json:
      default:
        exportDocument();
        break;
    }
  };

  const handleFileTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedFileType(e.target.value as FileType);
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="Export">
      <DialogBody>
        <FormControl>
          <FormLabel>Type</FormLabel>
          <Select onChange={handleFileTypeChange}>
            {getFileTypes().map((fileType) => (
              <option key={fileType} value={fileType} selected={fileType === selectedFileType}>
                {fileType}
              </option>
            ))}
          </Select>
        </FormControl>
      </DialogBody>
      <DialogFooter>
        <Button size="sm" onClick={onClose}>
          Close
        </Button>
        <Button size="sm" colorScheme="orange" onClick={handleExport}>
          Export
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ExportDialog;
