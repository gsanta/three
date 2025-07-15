import { PayloadAction, createSlice, current } from '@reduxjs/toolkit';
import {
  clearAll,
  historyAction,
  importAction,
  redoAction,
  resetNotifyOnRendered,
  undoAction,
  updateBlocks,
  updateState,
} from './blockActions';
import BlocksUpdater from './BlocksUpdater';
import { BlockState } from './blockSlice.types';
import HistoryStorage from '../utils/HistoryStorage';

export const initialBlockState: BlockState = {
  rootBlocksIds: [],
  blocks: {},
  blockIds: [],
  decorations: {
    cables: {},
    players: {},
    poles: {},
    transformers: {},
  },
  hovered: undefined,
  selectedBlocks: [],
};

const blockUpdater = new BlocksUpdater();

const history = new HistoryStorage<BlockState>(HistoryStorage.MAX_DEPTH);

const overwriteState = (writableState: BlockState, newState: BlockState) => {
  writableState.rootBlocksIds = newState.rootBlocksIds;
  writableState.blocks = newState.blocks;
  writableState.blockIds = newState.blockIds;
  writableState.hovered = newState.hovered;
  writableState.currentPlayer = newState.currentPlayer;
  writableState.decorations = newState.decorations;
  writableState.selectedBlocks = newState.selectedBlocks;
};

export const blockSlice = createSlice({
  name: 'block',
  initialState: initialBlockState,
  reducers: {
    clear(state: BlockState) {
      state.rootBlocksIds = [];
      state.blocks = {};
      state.hovered = undefined;
      state.currentPlayer = undefined;
      state.decorations = { ...initialBlockState.decorations };
      state.selectedBlocks = [];
    },

    hover(state, action: PayloadAction<{ block: string; partIndex?: string } | undefined>) {
      if (state.hovered) {
        state.blocks[state.hovered.block].isHovered = false;
      }
      state.hovered = action.payload;

      if (state.hovered) {
        state.blocks[state.hovered.block].isHovered = true;
      }
    },

    update(state, action: PayloadAction<Partial<BlockState>>) {
      state.blocks = action.payload.blocks || state.blocks;
      state.rootBlocksIds = action.payload.rootBlocksIds || state.rootBlocksIds;
      state.blockIds = action.payload.blockIds || [];
      if (action.payload.decorations) {
        state.decorations = action.payload.decorations;
      }
    },
  },

  extraReducers: (builder) => {
    builder.addCase(updateBlocks, (state, action) => {
      if (action.payload.history) {
        history.push(structuredClone(current(state)));
      }

      blockUpdater.update(state, action.payload.blockUpdates);
    });

    builder.addCase(historyAction, (state) => {
      history.push(structuredClone(current(state)));
    });

    builder.addCase(undoAction, (state) => {
      const previousState = history.undo(structuredClone(current(state)));

      overwriteState(state, previousState);
    });

    builder.addCase(redoAction, (state) => {
      const previousState = history.redo(structuredClone(current(state)));

      overwriteState(state, previousState);
    });

    builder.addCase(importAction, (state, action) => {
      overwriteState(state, action.payload.block);
    });
    // if (previousState) {
    //   state.rootBlocksIds = previousState.rootBlocksIds;
    //   state.blocks = previousState.blocks;
    //   state.blockIds = previousState.blockIds;
    //   state.decorations = previousState.decorations;

    builder.addCase(updateState, (state, action) => {
      const cityState = action.payload.city;
      state.blocks = cityState.blocks || state.blocks;
      state.rootBlocksIds = cityState.rootBlocksIds || state.rootBlocksIds;
      state.blockIds = cityState.blockIds || [];
      state.decorations = cityState.decorations || {};
    });

    builder.addCase(resetNotifyOnRendered, (state, action) => {
      const blockId = action.payload.block;
      if (state.blocks[blockId]) {
        state.blocks[blockId].notifyOnRender = false;
      }
    });

    builder.addCase(clearAll, (state) => {
      overwriteState(state, initialBlockState);
    });

    // for debugging purposes
    builder.addMatcher(
      () => true,
      (state) => {
        if (typeof window !== 'undefined') {
          (window as any).blockState = current(state);
        }
      },
    );
  },
});

export const { clear: clearBlockSlice, hover, update } = blockSlice.actions;

export default blockSlice.reducer;
