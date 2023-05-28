import React, { useState } from 'react';
import Dialog, { DialogProps, DialogBody, DialogFooter } from '@/components/dialog/Dialog';
import { Button } from '@chakra-ui/react';
import DropZone from './DropZone';
import { useAppSelector } from '@/hooks';

const ImportDialog = ({ isOpen, onClose }: Omit<DialogProps, 'title' | 'children'>) => {
  const editor = useAppSelector((state) => state.tool.editor);

  const [fileName, setFileName] = useState<string>();
  const [fileContent, setFileContent] = useState<string>();

  const handleSetFile = (name: string, content: string) => {
    setFileName(name);
    setFileContent(content);
  };

  const handleImport = () => {
    if (fileContent && editor) {
      editor.importDocument(fileContent);
    }
    onClose();
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="Import">
      <DialogBody>
        <DropZone fileName={fileName} setFile={handleSetFile} />
      </DialogBody>
      <DialogFooter>
        <Button size="sm" onClick={onClose}>
          Close
        </Button>
        <Button size="sm" colorScheme="orange" disabled={fileName === undefined} onClick={handleImport}>
          Import
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ImportDialog;
