import useEditorContext from '@/app/editor/useEditorContext';
import Dialog, { DialogProps } from '@/client/common/components/Dialog';
import Button from '@/client/common/components/lib/Button';
import { useAppSelector } from '@/client/common/hooks/hooks';
import { useMemo } from 'react';

const SelectionDialog = ({ onClose, isOpen }: Pick<DialogProps, 'onClose' | 'isOpen'>) => {
  const selectedRootBlockIds = useAppSelector((state) => state.blockCategory.selectedRootBlockIds);

  const { blockStore, blockCategoryStore, tool } = useEditorContext();

  const block = useMemo(() => {
    if (!selectedRootBlockIds[0]) {
      return null;
    }

    return blockStore.getBlock(selectedRootBlockIds[0]);
  }, [blockStore, selectedRootBlockIds]);

  const actions = useMemo(() => {
    if (!block) {
      return [];
    }

    return blockCategoryStore.getActions(block.category);
  }, [block, blockCategoryStore]);

  const handleClose = () => {
    tool.getSelectTool().deselect();
    onClose?.();
  };

  return (
    <Dialog id="selection-dialog" isOpen={isOpen} onClose={handleClose} placement="modal-bottom" title="Selection">
      {actions.map((action) => (
        <Button onClick={() => block && action.execute(block)}>{action.name}</Button>
      ))}
    </Dialog>
  );
};

export default SelectionDialog;
