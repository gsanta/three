import { createAction } from '@reduxjs/toolkit';
import { BlockState, UpdateBlocks } from './blockSlice.types';

export const updateBlocks = createAction<UpdateBlocks>('updateBlocks');

export const updateState = createAction<{ city: BlockState; building: BlockState }>('updateState');
