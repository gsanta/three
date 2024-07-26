import { createAction } from '@reduxjs/toolkit';
import { UpdateBlocks } from './blockSlice.types';

export const updateBlocks = createAction<UpdateBlocks>('updateBlocks');
