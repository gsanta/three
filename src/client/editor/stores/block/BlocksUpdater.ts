import { BlockState, UpdateBlock } from './blockSlice.types';

class BlocksUpdater {
  constructor(slice: 'city' | 'building') {
    this.slice = slice;
  }

  update(state: BlockState, updates: UpdateBlock[]) {
    updates.forEach((update) => {
      if ('hover' in update) {
        if (state.hovered) {
          state.blocks[state.hovered.block].isHovered = false;
          state.blocks[state.hovered.block].hoveredPart = undefined;
        }

        if (update.hover) {
          state.hovered = { block: update.hover, partIndex: update.partIndex };
        } else {
          state.hovered = undefined;
        }

        if (state.hovered) {
          state.blocks[state.hovered.block].isHovered = true;
          state.blocks[state.hovered.block].hoveredPart = update.partIndex;
        }
      } else if ('remove' in update) {
        const rootIndex = state.rootBlocksIds.indexOf(update.remove.id);
        if (rootIndex !== -1) {
          state.rootBlocksIds.splice(rootIndex, 1);
        }

        const blockIdIndex = state.blockIds.indexOf(update.remove.id);
        state.blockIds.splice(blockIdIndex, 1);

        const block = state.blocks[update.remove.id];

        if (block) {
          delete state.blocks[update.remove.id];
          block.decorations.forEach((category) => {
            delete state.decorations[category][update.remove.id];
          });
        }

        const index = state.selectedBlocks.findIndex((blockId) => blockId === update.remove.id);

        if (index !== -1) {
          state.selectedBlocks.splice(index, 1);
        }
      } else if ('select' in update) {
        const player = update.select.find((block) => block.category === 'humans');
        if (player) {
          state.currentPlayer = player.id;
        }

        state.selectedBlocks.forEach((blockId) => (state.blocks[blockId].isSelected = false));
        state.selectedBlocks = [];
        update.select.forEach((block) => {
          state.selectedBlocks.push(block.id);
          state.blocks[block.id].isSelected = true;
        });
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
