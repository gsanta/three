import React from 'react';
import Dialog, { DialogProps } from '@/ui/components/dialog/Dialog';
import DialogBody from '@/ui/components/dialog/DialogBody';
import DialogFooter from '@/ui/components/dialog/DialogFooter';
import { Button } from '@chakra-ui/react';
import DropZone from './DropZone';

const ImportDialog = ({ isOpen, onClose }: Omit<DialogProps, 'title' | 'children'>) => {
  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="Import">
      <DialogBody>
        <DropZone />
      </DialogBody>
      <DialogFooter>
        <Button size="sm" onClick={onClose}>
          Close
        </Button>
        <Button size="sm" colorScheme="orange">
          Import
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ImportDialog;
