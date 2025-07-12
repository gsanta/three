import { Dispatch } from '@reduxjs/toolkit';
import BlockData from '../../models/block/BlockData';
import { updateBlocks } from '../block/blockActions';
import { setSelectedPlayer } from './gameSlice';

export const selectPlayer = (block: BlockData) => (dispatch: Dispatch) => {
  dispatch(updateBlocks({ blockUpdates: [{ select: [block] }] }));
  dispatch(setSelectedPlayer(block.id));
};
