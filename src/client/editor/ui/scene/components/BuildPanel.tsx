import React, { useMemo, useState } from 'react';
import Avatar from '@/client/common/components/lib/Avatar';
import { useAppSelector } from '@/client/common/hooks/hooks';
import BlockConstantData from '@/client/editor/models/block/BlockConstantData';

type BuildPanelProps = {
  onSelect(blockType: BlockConstantData): void;
  selectedBlockType?: string;
};

const BuildPanel = ({ onSelect, selectedBlockType }: BuildPanelProps) => {
  const blockTypes = useAppSelector((state) => state.blockType.blocks);
  const finishable = useAppSelector((state) => state.blockType.addAction?.finishable);

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

  const handleBlockTypeClick = (blockType: BlockConstantData) => {
    onSelect(blockType);
  };

  return (
    <div className="flex flex-wrap gap-2">
      {selectedBlockType && (
        <>
          <Avatar colorScheme="selected" placeholder={selectedBlockType} />
          <Avatar colorScheme="secondary" placeholder="Cancel" />
          {finishable && <Avatar colorScheme="success" placeholder="Finish" />}
        </>
      )}
      {selectedCategory && !selectedBlockType && (
        <>
          {actieveBlockTypes?.map((blockType) => (
            <Avatar
              colorScheme={blockType.type === selectedBlockType ? 'selected' : 'normal'}
              onClick={() => handleBlockTypeClick(blockType)}
              placeholder={blockType.type}
            />
          ))}
        </>
      )}
      {!selectedCategory && !selectedBlockType && (
        <>
          {Object.keys(categories).map((category) => (
            <Avatar onClick={() => setSelectedCategory(category)} placeholder={category} />
          ))}
        </>
      )}
    </div>
  );
};

export default BuildPanel;
