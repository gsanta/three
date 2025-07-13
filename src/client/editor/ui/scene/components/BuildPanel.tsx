import React, { useMemo, useState } from 'react';
import Avatar from '@/client/common/components/lib/Avatar';
import { useAppSelector } from '@/client/common/hooks/hooks';
import BlockConstantData from '@/client/editor/models/block/BlockConstantData';
import useEditorContext from '@/app/editor/useEditorContext';

type BuildPanelProps = {
  onSelect(blockType: BlockConstantData): void;
  selectedBlockType?: string;
};

const BuildPanel = ({ onSelect, selectedBlockType }: BuildPanelProps) => {
  const blockTypes = useAppSelector((state) => state.blockType.blocks);
  const finishable = useAppSelector((state) => state.blockType.addAction?.finishable);
  const cancelable = useAppSelector((state) => state.blockType.addAction?.cancelable);

  const { buildService } = useEditorContext();

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
    <>
      {selectedBlockType && (
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-2 items-center">
            <Avatar colorScheme="selected" placeholder={selectedBlockType} />
            {cancelable && (
              <Avatar colorScheme="secondary" onClick={() => buildService.cancel()} placeholder="Cancel" />
            )}
            {finishable && <Avatar colorScheme="success" onClick={() => buildService.finish()} placeholder="Finish" />}
          </div>
          <Avatar colorScheme="secondary" onClick={() => buildService.setBuildBlock(undefined)} placeholder="Back" />
        </div>
      )}
      {selectedCategory && !selectedBlockType && (
        <div className="flex justify-between">
          <div className="flex flex-wrap gap-2">
            {actieveBlockTypes?.map((blockType) => (
              <Avatar
                colorScheme={blockType.type === selectedBlockType ? 'selected' : 'normal'}
                onClick={() => handleBlockTypeClick(blockType)}
                placeholder={blockType.type}
              />
            ))}
          </div>
          <Avatar colorScheme="secondary" onClick={() => setSelectedCategory(undefined)} placeholder="Back" />
        </div>
      )}
      {!selectedCategory && !selectedBlockType && (
        <div className="flex flex-wrap gap-2">
          {Object.keys(categories).map((category) => (
            <Avatar onClick={() => setSelectedCategory(category)} placeholder={category} />
          ))}
        </div>
      )}
    </>
  );
};

export default BuildPanel;
