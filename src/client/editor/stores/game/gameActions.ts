import { Dispatch } from '@reduxjs/toolkit';
import BlockData from '../../models/block/BlockData';
import { updateBlocks } from '../block/blockActions';
import { setSelectedPlayer } from './gameSlice';
import { setReachableGrids } from '../grid/gridSlice';

export const selectPlayer = (block: BlockData, reachableGrids: Record<number, number>) => (dispatch: Dispatch) => {
  dispatch(updateBlocks({ blockUpdates: [{ select: [block] }] }));
  dispatch(setSelectedPlayer(block.id));
  dispatch(setReachableGrids(reachableGrids));
};
