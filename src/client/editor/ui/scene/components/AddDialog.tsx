import React, { useState } from 'react';
import Dialog, { DialogProps } from '@/client/common/components/Dialog';
import Button from '@/client/common/components/lib/Button';
import BuildPanel from './BuildPanel';
import BlockConstantData from '@/client/editor/models/block/BlockConstantData';
import useEditorContext from '@/app/editor/useEditorContext';
import { useAppSelector } from '@/client/common/hooks/hooks';

const AddDialog = (props: Pick<DialogProps, 'onClose' | 'isOpen'>) => {
  const [selectedCategory, setSelectedCategory] = useState<string>();

  const { buildService } = useEditorContext();

  const handleSelect = (blockType: BlockConstantData) => {
    buildService.setBuildBlock(blockType);
    props.onClose?.();
  };

  const activeBlockType = useAppSelector((state) => state.blockType.addAction?.blockType);

  return (
    <Dialog
      {...props}
      id={'add-dialog'}
      leftAction={
        <Button colorScheme="accent" isDisabled={!selectedCategory} onClick={() => setSelectedCategory(undefined)}>
          Back
        </Button>
      }
      hasBackdrop={false}
      placement="modal-bottom"
      size="sm"
      title={'Add'}
    >
      <BuildPanel onSelect={handleSelect} selectedBlockType={activeBlockType} />
    </Dialog>
  );
};

export default AddDialog;
