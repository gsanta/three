import { worldToGridIndex } from '../../models/Grid';
import Vector from '../../models/math/Vector';
import { UpdateBlock } from '../block/blockSlice.types';
import { GridState } from './gridSlice';

class GridUpdater {
  update(state: GridState, updates: UpdateBlock[]) {
    updates.forEach((update) => {
      if ('block' in update && update.block) {
        const gridIndex = worldToGridIndex(
          new Vector(update.block.position),
          state.gridCols,
          state.gridSize,
          state.gridOffset,
        );
        state.blockToGridIndex[update.block.id] = gridIndex;

        if (!state.gridIndexToBlocks[gridIndex]) {
          state.gridIndexToBlocks[gridIndex] = [];
        }

        if (!state.gridIndexToBlocks[gridIndex].includes(update.block.id)) {
          state.gridIndexToBlocks[gridIndex].push(update.block.id);
        }
      } else if ('remove' in update) {
        const gridIndex = state.blockToGridIndex[update.remove.id];
        delete state.blockToGridIndex[update.remove.id];

        const removeIndex = state.gridIndexToBlocks[gridIndex].indexOf(update.remove.id);
        state.gridIndexToBlocks[gridIndex].splice(removeIndex, 1);

        if (state.gridIndexToBlocks[gridIndex].length === 0) {
          delete state.gridIndexToBlocks[gridIndex];
        }
      }
    });
  }
}

export default GridUpdater;
