import React from 'react';
import Avatar from '@/client/common/components/lib/Avatar';
import { useAppDispatch, useAppSelector } from '@/client/common/hooks/hooks';
import Dialog, { DialogProps } from '@/client/common/components/Dialog';
import { setActiveBlockType } from '@/client/editor/stores/blockType/blockTypeSlice';
import useEditorContext from '@/app/editor/useEditorContext';

const ItemDialog = ({ isOpen, onClose }: Pick<DialogProps, 'onClose' | 'isOpen'>) => {
  const activeBlockType = useAppSelector((state) => state.blockType.activeBlockType);
  const currentAction = useAppSelector((state) => state.blockCategory.currentAction);

  const { tool } = useEditorContext();

  const dispatcher = useAppDispatch();

  const handleClose = () => {
    dispatcher(setActiveBlockType(undefined));
    onClose?.();
  };

  const handleCancelCableDrawing = () => {
    tool.getCableTool().cancelCableDrawing();
  };

  const handleFinishCableDrawing = () => {
    tool.getCableTool().finishCableDrawing();
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
        {(currentAction === 'cable-drawing' || currentAction === 'finish-cable-drawing') && (
          <Avatar onClick={handleCancelCableDrawing} placeholder="Cancel" />
        )}
        {currentAction === 'finish-cable-drawing' && <Avatar onClick={handleFinishCableDrawing} placeholder="Finish" />}
      </div>
    </Dialog>
  );
};

export default ItemDialog;
