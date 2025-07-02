import React, { useMemo, useState } from 'react';
import useEditorContext from '@/app/editor/useEditorContext';
import Avatar from '@/client/common/components/lib/Avatar';
import { useAppSelector } from '@/client/common/hooks/hooks';
import BlockConstantData from '@/client/editor/models/block/BlockConstantData';
import Dialog, { DialogProps } from '@/client/common/components/Dialog';
import Button from '@/client/common/components/lib/Button';

const AddDialog = (props: Pick<DialogProps, 'onClose' | 'isOpen'>) => {
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

  const handleBlockTypeClick = (blockType: BlockConstantData) => {
    blockTypeSelectorService.setSelectedBlockType(blockType);
    props.onClose?.();
  };

  return (
    <Dialog
      {...props}
      id={'add-dialog'}
      leftAction={
        <Button colorScheme="accent" isDisabled={!selectedCategory} onClick={() => setSelectedCategory(undefined)}>
          Back
        </Button>
      }
      placement="modal-bottom"
      title={'Add'}
    >
      <div className="flex flex-wrap gap-2">
        {selectedCategory ? (
          <>
            {actieveBlockTypes?.map((blockType) => (
              <Avatar onClick={() => handleBlockTypeClick(blockType)} placeholder={blockType.type} />
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
    </Dialog>
  );
};

export default AddDialog;
