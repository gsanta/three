import { Store } from '@reduxjs/toolkit';
import BlockData from '../../models/block/BlockData';
import BlockPartLookupData from '../../models/block/part/BlockPartLookupData';
import { BlockState } from './blockSlice.types';

class BlockSerializer {
  sliceName = 'block';

  constructor(store: Store) {
    this.store = store;
  }

  export(): BlockState {
    const blockState = this.store.getState().block;

    const blocks: (typeof blockState)['blocks'] = {};

    Object.keys(blockState.blocks).forEach((blockId) => {
      const origBlock = blockState.blocks[blockId];

      const newPartDetails: BlockData['partDetails'] = {};

      Object.keys(origBlock.partDetails).forEach((key) => {
        const origPartDetails = origBlock.partDetails[key] as BlockPartLookupData;
        newPartDetails[key] = {
          ...origPartDetails,
          isSelected: false,
        };
      });

      const newBlock: BlockData = {
        ...origBlock,
        isHovered: false,
        hoveredPart: undefined,
        isSelected: false,
        partDetails: newPartDetails,
      };

      blocks[blockId] = newBlock;
    });

    return {
      blockIds: blockState.blockIds,
      blocks,
      decorations: blockState.decorations,
      rootBlocksIds: blockState.rootBlocksIds,
      selectedBlocks: [],
    };
  }

  private store: Store;
}

export default BlockSerializer;
