import React from 'react';
import Dialog, { DialogProps } from '@/ui/components/dialog/Dialog';
import DialogBody from '@/ui/components/dialog/DialogBody';
import DialogFooter from '@/ui/components/dialog/DialogFooter';
import { Button } from '@chakra-ui/react';

const ExportDialog = ({ isOpen, onClose }: Omit<DialogProps, 'title' | 'children'>) => {
  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="Export">
      <DialogBody>
        <Button colorScheme="gray">Export as png</Button>
      </DialogBody>
      <DialogFooter>
        <Button colorScheme="orange" onClick={onClose}>
          Close
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default ExportDialog;
