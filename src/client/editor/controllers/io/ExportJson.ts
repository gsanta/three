import { Store } from '@/client/common/utils/store';
import BlockData from '../../models/block/BlockData';
import { BlockState } from '../../stores/block/blockSlice.types';
import BlockPartLookupData from '../../models/block/part/BlockPartLookupData';

class ExportJson {
  constructor(store: Store) {
    this.store = store;
  }

  export(): { city: BlockState } {
    return {
      city: this.exportBlockState(this.store.getState().block.present),
    };
  }

  private exportBlockState(blockState: BlockState) {
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
      selectedRootBlockIds: [],
      selectedBlocks: [],
      selectedPartIndexes: {},
    };
  }

  private store: Store;
}

export default ExportJson;
