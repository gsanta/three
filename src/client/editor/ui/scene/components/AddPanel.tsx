import useEditorContext from '@/app/editor/useEditorContext';
import Avatar from '@/client/common/components/lib/Avatar';
import { useAppSelector } from '@/client/common/hooks/hooks';
import BlockConstantData from '@/client/editor/models/block/BlockConstantData';
import { useMemo, useState } from 'react';

const AddPanel = () => {
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
    <div className="card w-[37rem] rounded-none bg-base-100 shadow-md">
      <div className="card-body">
        <h2 className="card-title">Add</h2>
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
        {selectedCategory && (
          <div className="card-actions justify-start">
            <button className="btn btn-lg btn-primary" onClick={() => setSelectedCategory(undefined)}>
              Back
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddPanel;
