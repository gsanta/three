import { createAction } from '@reduxjs/toolkit';
import { BlockState, UpdateBlocks } from './blockSlice.types';
import { SerializedState } from '../../controllers/serializer/SerializedState';

export const initState = createAction('initState');

export const updateBlocks = createAction<UpdateBlocks>('updateBlocks');

export const updateState = createAction<{ city: BlockState; building: BlockState }>('updateState');

export const importAction = createAction<SerializedState>('importAction');

export const resetNotifyOnRendered = createAction<{ block: string }>('resetNotifyOnRendered');

export const clearAll = createAction('clearAll');

export const historyAction = createAction('history');

export const undoAction = createAction('undo');

export const redoAction = createAction('redo');
