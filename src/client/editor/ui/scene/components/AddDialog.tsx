import React, { useMemo, useState } from 'react';
import useEditorContext from '@/app/editor/useEditorContext';
import Avatar from '@/client/common/components/lib/Avatar';
import { useAppSelector } from '@/client/common/hooks/hooks';
import BlockConstantData from '@/client/editor/models/block/BlockConstantData';

const AddDialog = () => {
  const blockTypes = useAppSelector((state) => state.blockType.blocks);
  const { blockTypeSelectorService } = useEditorContext();

  const [selectedCategory, setSelectedCategory] = useState<string>();

  const categories = useMemo(
    () =>
      blockTypes.reduce<Record<string, BlockConstantData[]>>((categoryMap, nextType) => {
        if (!categoryMap[nextType.category]) {
          categoryMap[nextType.category] = [];
        }
        categoryMap[nextType.category].push(nextType);
        return categoryMap;
      }, {}),
    [blockTypes],
  );

  const actieveBlockTypes = useMemo(() => {
    if (selectedCategory) {
      return categories[selectedCategory];
    }
    return undefined;
  }, [categories, selectedCategory]);

  return (
    <dialog id="add-dialog" className="modal modal-top">
      <div className="modal-box max-w-full rounded-none">
        <h3 className="divider font-bold text-lg">Add item</h3>

        <div className="flex flex-wrap gap-2">
          {selectedCategory ? (
            <>
              {actieveBlockTypes?.map((blockType) => (
                <Avatar
                  onClick={() => blockTypeSelectorService.setSelectedBlockType(blockType)}
                  placeholder={blockType.type}
                />
              ))}
            </>
          ) : (
            <>
              {Object.keys(categories).map((category) => (
                <Avatar onClick={() => setSelectedCategory(category)} placeholder={category} />
              ))}
            </>
          )}
        </div>
      </div>
    </dialog>
  );
};

export default AddDialog;
