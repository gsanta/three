import Dialog from '@/ui/components/dialog/Dialog';
import DialogFooter from '@/ui/components/dialog/DialogFooter';
import DialogBody from '@/ui/components/dialog/DialogBody';
import React, { useState } from 'react';
import { Button, Input } from '@chakra-ui/react';
import { useAppDispatch } from '@/hooks';
import { createLayer } from '../../state/layerSlice';

type LayerDialogProps = {
  isOpen: boolean;
  onClose(): void;
};

const AddLayerDialog = ({ isOpen, onClose }: LayerDialogProps) => {
  const [layerName, setLayerName] = useState('');
  const dispatch = useAppDispatch();

  const handleAddLayer = () => {
    dispatch(createLayer(layerName));
    setLayerName('');
    onClose();
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="Add layer">
      <DialogBody>
        <Input
          autoFocus
          onChange={(e) => setLayerName(e.target.value)}
          placeholder="Layer name"
          value={layerName}
          variant="filled"
        />
      </DialogBody>
      <DialogFooter>
        <Button onClick={onClose} size="sm">
          Close
        </Button>
        <Button onClick={handleAddLayer} size="sm" colorScheme="orange" isDisabled={!layerName}>
          Add
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default AddLayerDialog;
