import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { resetNotifyOnRendered, updateBlocks, updateState } from './blockActions';
import BlocksUpdater from './BlocksUpdater';
import { BlockState } from './blockSlice.types';

export const initialBlockState: BlockState = {
  rootBlocksIds: [],
  blocks: {},
  blockIds: [],
  decorations: {
    cables: {},
    transformers: {},
    poles: {},
  },
  selectedBlocks: [],
};

const blockUpdater = new BlocksUpdater('city');

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
      blockUpdater.update(state, action.payload.blockUpdates);
    });

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

    builder.addCase('clearAll', (state) => {
      state.rootBlocksIds = [];
      state.blocks = {};
      state.hovered = undefined;
      state.currentPlayer = undefined;
      state.decorations = { ...initialBlockState.decorations };
      state.selectedBlocks = [];
    });
  },
});

export const { clear: clearBlockSlice, hover, update } = blockSlice.actions;

export default blockSlice.reducer;
