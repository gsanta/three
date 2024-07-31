import BlockDecoration from '../../types/BlockCategory';
import { BlockState } from './blockSlice';
import { UpdateBlock } from './blockSlice.types';

class BlocksUpdater {
  constructor(slice: 'city' | 'building') {
    this.slice = slice;
  }

  update(state: BlockState, updates: UpdateBlock<BlockDecoration>[]) {
    updates
      .filter((update) => update.slice === this.slice)
      .forEach((update) => {
        if ('hover' in update) {
          if (state.hovered) {
            state.blocks[state.hovered.block].isHovered = false;
          }

          if (update.hover) {
            state.hovered = { block: update.hover, partIndex: update.partIndex };
          } else {
            state.hovered = undefined;
          }

          if (state.hovered) {
            state.blocks[state.hovered.block].isHovered = true;
          }
        } else if ('remove' in update) {
          const rootIndex = state.rootBlocksIds.indexOf(update.remove.id);
          if (rootIndex !== -1) {
            state.rootBlocksIds.splice(rootIndex, 1);
          }

          const blockIdIndex = state.blockIds.indexOf(update.remove.id);
          state.blockIds.splice(blockIdIndex, 1);

          const selectedIndex = state.selectedRootBlockIds.indexOf(update.remove.id);
          if (selectedIndex !== -1) {
            state.selectedRootBlockIds.splice(selectedIndex, 1);
          }

          if (state.selectedBlocks[update.remove.id]) {
            delete state.selectedBlocks[update.remove.id];

            if (Object.keys(state.selectedBlocks).length === 0) {
              state.hasSelection = false;
            }
          }

          const block = state.blocks[update.remove.id];

          if (block) {
            delete state.blocks[update.remove.id];
            block.decorations.forEach((category) => {
              delete state.decorations[category][update.remove.id];
            });
          }
        } else if ('select' in update) {
          if (update.select === null) {
            Object.keys(state.selectedBlocks).forEach((selectedBlock) => {
              state.blocks[selectedBlock].isSelected = false;
              Object.values(state.blocks[selectedBlock].partDetails).forEach((val) => {
                if (val) {
                  val.isSelected = false;
                }
              });
            });
            state.selectedRootBlockIds = [];
            state.selectedPartIndexes = {};
            state.selectedBlocks = {};
            state.hasSelection = false;
          } else {
            if (update.partIndex) {
              if (!state.selectedPartIndexes[update.select]) {
                state.selectedPartIndexes[update.select] = [];
              }

              state.selectedPartIndexes[update.select] = [
                ...new Set([...state.selectedPartIndexes[update.select], update.partIndex]),
              ];

              const partDetail = state.blocks[update.select].partDetails[update.partIndex];
              if (partDetail) {
                partDetail.isSelected = true;
              }
            }
            state.selectedBlocks[update.select] = true;
            state.hasSelection = true;
            state.blocks[update.select].isSelected = true;
            state.selectedRootBlockIds = [...new Set([...state.selectedRootBlockIds, update.select])];
          }
        } else {
          if ('block' in update && update.block) {
            if (!state.blocks[update.block.id]) {
              state.blockIds.push(update.block.id);
            }

            state.blocks[update.block.id] = update.block;

            if (update.block.parentConnection) {
              const rootIndex = state.rootBlocksIds.indexOf(update.block.id);
              if (rootIndex !== -1) {
                state.rootBlocksIds.splice(rootIndex, 1);
              }
            } else {
              const rootIndex = state.rootBlocksIds.indexOf(update.block.id);

              if (rootIndex === -1) {
                state.rootBlocksIds.push(update.block.id);
              }
            }
          }

          if ('decoration' in update) {
            const { decoration } = update;

            if (decoration) {
              state.decorations[decoration.category][decoration.id] = decoration;
            }
          }
        }
      });
  }

  private slice: 'city' | 'building';
}

export default BlocksUpdater;
