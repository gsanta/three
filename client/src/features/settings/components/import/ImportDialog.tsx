import React, { useEffect, useState } from 'react';
import Dialog, { DialogProps, DialogBody, DialogFooter } from '@/common/components/Dialog';
import { Button } from '@chakra-ui/react';
import DropZone from './DropZone';
import { useAppDispatch, useAppSelector } from '@/common/hooks/hooks';
import { importDocument } from '../../state/settingsSlice';

const ImportDialog = ({ isOpen, onClose }: Omit<DialogProps, 'title' | 'children'>) => {
  const editor = useAppSelector((state) => state.tool.editor);
  const dispatch = useAppDispatch();

  const [isImporting, setImporting] = useState(false);

  const [fileName, setFileName] = useState<string>();
  const [fileContent, setFileContent] = useState<string>();

  const handleSetFile = (name: string, content: string) => {
    setFileName(name);
    setFileContent(content);
  };

  useEffect(() => {
    if (isImporting && fileContent && editor) {
      dispatch(importDocument(fileContent, editor));
      setImporting(false);
      onClose();
    }
  }, [isImporting, setImporting, dispatch, fileContent, editor, onClose]);

  const handleImport = () => {
    setImporting(true);
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
        <Button
          size="sm"
          colorScheme="orange"
          isLoading={isImporting}
          disabled={fileName === undefined}
          onClick={handleImport}
        >
          Import
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ImportDialog;
