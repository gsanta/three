import { createAction } from '@reduxjs/toolkit';
import { BlockState, UpdateBlocks } from './blockSlice.types';

export const initState = createAction('initState');

export const updateBlocks = createAction<UpdateBlocks>('updateBlocks');

export const updateState = createAction<{ city: BlockState; building: BlockState }>('updateState');

export const resetNotifyOnRendered = createAction<{ block: string }>('resetNotifyOnRendered');
