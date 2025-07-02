import React from 'react';
import Avatar from '@/client/common/components/lib/Avatar';
import { useAppDispatch, useAppSelector } from '@/client/common/hooks/hooks';
import Dialog, { DialogProps } from '@/client/common/components/Dialog';
import { setActiveBlockType } from '@/client/editor/stores/blockType/blockTypeSlice';

const ItemDialog = ({ isOpen, onClose }: Pick<DialogProps, 'onClose' | 'isOpen'>) => {
  const activeBlockType = useAppSelector((state) => state.blockType.activeBlockType);
  const dispatcher = useAppDispatch();

  const handleClose = () => {
    dispatcher(setActiveBlockType(undefined));
    onClose?.();
  };

  return (
    <Dialog
      id={'item-dialog'}
      hasBackdrop={false}
      isOpen={isOpen}
      onClose={handleClose}
      placement="modal-bottom"
      title={'Item'}
    >
      <div className="flex flex-wrap gap-2">
        <Avatar placeholder={activeBlockType} />
      </div>
    </Dialog>
  );
};

export default ItemDialog;
