import useEditorContext from '@/app/editor/useEditorContext';
import Avatar from '@/client/common/components/lib/Avatar';
import { useAppSelector } from '@/client/common/hooks/hooks';
import { useMemo } from 'react';

const SelectionPanel = () => {
  const selectedRootBlockIds = useAppSelector((state) => state.blockCategory.selectedRootBlockIds);

  const { blockStore, blockCategoryStore } = useEditorContext();

  const block = useMemo(() => blockStore.getBlock(selectedRootBlockIds[0]), [blockStore, selectedRootBlockIds]);

  const actions = useMemo(() => {
    if (!selectedRootBlockIds[0]) {
      return [];
    }

    return blockCategoryStore.getActions(block.category);
  }, [block.category, blockCategoryStore, selectedRootBlockIds]);

  return (
    <div className="card w-[37rem] rounded-none bg-base-100 shadow-md">
      <div className="card-body">
        <h2 className="card-title">Add</h2>
        <div className="flex flex-wrap gap-2">
          {actions.map((action) => (
            <Avatar onClick={() => action.execute(block)} placeholder={action.name} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectionPanel;
