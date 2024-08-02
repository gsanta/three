import { Store } from '@/client/common/utils/store';
import Block from '../../types/Block';
import { ModelPartInfo } from '../../types/BlockType';
import { BlockState } from '../../stores/block/blockSlice.types';

class ExportJson {
  constructor(store: Store) {
    this.store = store;
  }

  export(): { city: BlockState; building: BlockState } {
    return {
      city: this.exportBlockState(this.store.getState().block.present),
      building: this.store.getState().building.present,
    };
  }

  private exportBlockState(blockState: BlockState) {
    const blocks: (typeof blockState)['blocks'] = {};

    Object.keys(blockState.blocks).forEach((blockId) => {
      const origBlock = blockState.blocks[blockId];

      const newPartDetails: Block['partDetails'] = {};

      Object.keys(origBlock.partDetails).forEach((key) => {
        const origPartDetails = origBlock.partDetails[key] as ModelPartInfo;
        newPartDetails[key] = {
          ...origPartDetails,
          isSelected: false,
        };
      });

      const newBlock: Block = {
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
      selectedBlocks: {},
      selectedPartIndexes: {},
    };
  }

  private store: Store;
}

export default ExportJson;
