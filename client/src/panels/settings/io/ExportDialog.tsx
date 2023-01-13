import React, { useState } from 'react';
import Dialog, { DialogProps } from '@/ui/components/dialog/Dialog';
import DialogBody from '@/ui/components/dialog/DialogBody';
import DialogFooter from '@/ui/components/dialog/DialogFooter';
import { Button, FormControl, FormLabel, Select } from '@chakra-ui/react';
import { downloadBlob, downloadString } from '../utils/fileUtils';
import useAppContext from '@/ui/hooks/useAppContext';
import FileType, { getFileTypes } from './FileType';
import { observer } from 'mobx-react-lite';

const ExportDialog = observer(({ isOpen, onClose }: Omit<DialogProps, 'title' | 'children'>) => {
  const { editorApi } = useAppContext();
  const [selectedFileType, setSelectedFileType] = useState<FileType>(FileType.json);

  const exportImage = () => {
    editorApi.exportImage();
    const data = editorApi.getImageData();
    const size = editorApi.getImageSize();
    const buffer = new Uint8Array(Module.HEAPU8.buffer, data, size);
    downloadBlob(buffer);
    onClose();
  };

  const exportDocument = () => {
    const doc = editorApi.exportDocument();
    downloadString(doc, 'spright.json');
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
              <option value={fileType} selected={fileType === selectedFileType}>
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
});

export default ExportDialog;
