import React from 'react';
import Dialog, { DialogProps } from '@/ui/components/dialog/Dialog';
import DialogBody from '@/ui/components/dialog/DialogBody';
import DialogFooter from '@/ui/components/dialog/DialogFooter';
import { Button, FormControl, FormLabel, Select } from '@chakra-ui/react';
import downloadBlob from './utils/downloadBlob';
import useAppContext from '@/ui/hooks/useAppContext';

const ExportDialog = ({ isOpen, onClose }: Omit<DialogProps, 'title' | 'children'>) => {
  const { editorApi } = useAppContext();

  const handleExportImage = () => {
    editorApi.exportImage();
    const data = editorApi.getImageData();
    const size = editorApi.getImageSize();
    const buffer = new Uint8Array(Module.HEAPU8.buffer, data, size);
    downloadBlob(buffer);
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="Export">
      <DialogBody>
        <FormControl>
          <FormLabel>Type</FormLabel>
          <Select>
            <option value="option1">PNG</option>
          </Select>
        </FormControl>
      </DialogBody>
      <DialogFooter>
        <Button size="sm" onClick={onClose}>
          Close
        </Button>
        <Button size="sm" colorScheme="orange" onClick={handleExportImage}>
          Export
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ExportDialog;
