import Dialog from '@/ui/components/dialog/Dialog';
import DialogFooter from '@/ui/components/dialog/DialogFooter';
import DialogBody from '@/ui/components/dialog/DialogBody';
import React, { useState } from 'react';
import { Button, Input } from '@chakra-ui/react';
import ToggleButton from '@/ui/components/button/ToggleButton';
import { observer } from 'mobx-react-lite';
import useAppContext from '@/ui/hooks/useAppContext';

type LayerDialogProps = {
  isOpen: boolean;
  onClose(): void;
};

const LayerDialog = observer(({ isOpen, onClose }: LayerDialogProps) => {
  const [layerName, setLayerName] = useState('');
  const { layerHandler } = useAppContext();

  const handleAddLayer = () => {
    layerHandler.createLayer(layerName);
    setLayerName('');
    onClose();
  };

  return (
    <Dialog isOpen={isOpen} onClose={onClose} title="Add layer">
      <DialogBody>
        <Input onChange={(e) => setLayerName(e.target.value)} placeholder="Layer name" value={layerName} />
      </DialogBody>
      <DialogFooter>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleAddLayer}>Add</Button>
      </DialogFooter>
    </Dialog>
  );
});

export default LayerDialog;
