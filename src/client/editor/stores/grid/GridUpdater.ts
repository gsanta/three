import CableDecorator from '../../models/block/categories/CableDecorator';
import { worldToGridIndex } from '../../models/Grid';
import Num3 from '../../models/math/Num3';
import Vector from '../../models/math/Vector';
import { UpdateBlock } from '../block/blockSlice.types';
import { GridState } from './gridSlice';

const setGridIndexToBlock = (state: GridState, blockId: string, position: Num3) => {
  const gridIndex = worldToGridIndex(new Vector(position), state.gridCols, state.gridSize, state.gridOffset);

  if (!state.blockToGridIndex[blockId]) {
    state.blockToGridIndex[blockId] = [];
  }

  if (!state.blockToGridIndex[blockId].includes(gridIndex)) {
    state.blockToGridIndex[blockId].push(gridIndex);
  }

  if (!state.gridIndexToBlocks[gridIndex]) {
    state.gridIndexToBlocks[gridIndex] = [];
  }

  if (!state.gridIndexToBlocks[gridIndex].includes(blockId)) {
    state.gridIndexToBlocks[gridIndex].push(blockId);
  }
};

class GridUpdater {
  update(state: GridState, updates: UpdateBlock[]) {
    updates.forEach((update) => {
      if ('block' in update && update.block) {
        if (update.block.category === 'cables') {
          return;
        }

        let gridIndex = worldToGridIndex(
          new Vector(update.block.position),
          state.gridCols,
          state.gridSize,
          state.gridOffset,
        );

        if (update.block.parentConnection?.block) {
          gridIndex = state.blockToGridIndex[update.block.parentConnection?.block][0];
        }

        if (!state.blockToGridIndex[update.block.id]) {
          state.blockToGridIndex[update.block.id] = [];
        }

        if (!state.blockToGridIndex[update.block.id].includes(gridIndex)) {
          state.blockToGridIndex[update.block.id].push(gridIndex);
        }

        if (!state.gridIndexToBlocks[gridIndex]) {
          state.gridIndexToBlocks[gridIndex] = [];
        }

        if (!state.gridIndexToBlocks[gridIndex].includes(update.block.id)) {
          state.gridIndexToBlocks[gridIndex].push(update.block.id);
        }
      } else if ('decoration' in update && update.decoration) {
        if (update.decoration.decoration === 'cables') {
          const cableDecorator = update.decoration as CableDecorator;

          setGridIndexToBlock(state, update.decoration.id, cableDecorator.points[0].position);
          setGridIndexToBlock(state, update.decoration.id, cableDecorator.points[1].position);
        }
      } else if ('remove' in update) {
        const gridIndexes = state.blockToGridIndex[update.remove.id];
        delete state.blockToGridIndex[update.remove.id];

        gridIndexes.forEach((gridIndex) => {
          const removeIndex = state.gridIndexToBlocks[gridIndex].indexOf(update.remove.id);
          state.gridIndexToBlocks[gridIndex].splice(removeIndex, 1);

          if (state.gridIndexToBlocks[gridIndex].length === 0) {
            delete state.gridIndexToBlocks[gridIndex];
          }
        });
      }
    });
  }
}

export default GridUpdater;
