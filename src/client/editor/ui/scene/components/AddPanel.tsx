import Avatar from '@/client/common/components/lib/Avatar';
import { useAppDispatch, useAppSelector } from '@/client/common/hooks/hooks';
import { setSelectedGeometry } from '@/client/editor/stores/blockType/blockTypeSlice';
import { useMemo, useState } from 'react';

const AddPanel = () => {
  const blockTypes = useAppSelector((state) => state.blockType.blocks);

  const dispatch = useAppDispatch();

  const [selectedCategory, setSelectedCategory] = useState<string>();

  const categories = useMemo(
    () =>
      blockTypes.reduce<Record<string, string[]>>((categoryMap, nextType) => {
        if (!categoryMap[nextType.category]) {
          categoryMap[nextType.category] = [];
        }
        categoryMap[nextType.category].push(nextType.type);
        return categoryMap;
      }, {}),
    [blockTypes],
  );

  const types = useMemo(() => {
    if (selectedCategory) {
      return categories[selectedCategory];
    }
    return undefined;
  }, [categories, selectedCategory]);

  const handleSelectType = (val: string) => {
    dispatch(setSelectedGeometry(val));
  };

  return (
    <div className="card w-[37rem] rounded-none bg-base-100 shadow-md">
      <div className="card-body">
        <h2 className="card-title">Add</h2>
        <div className="flex flex-wrap gap-2">
          {selectedCategory ? (
            <>{types?.map((type) => <Avatar onClick={() => handleSelectType(type)} placeholder={type} />)}</>
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
