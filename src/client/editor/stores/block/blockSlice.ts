import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { resetNotifyOnRendered, updateBlocks, updateState } from './blockActions';
import BlocksUpdater from './BlocksUpdater';
import { BlockState } from './blockSlice.types';

export const initialBlockState: BlockState = {
  rootBlocksIds: [],
  blocks: {},
  blockIds: [],
  selectedBlocks: {},
  selectedRootBlockIds: [],
  selectedPartIndexes: {},
  decorations: {
    cables: {},
    decorations: {},
    devices: {},
    roads: {},
    walls: {},
    'building-bases': {},
  },
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
      state.selectedRootBlockIds = [];

      state.selectedBlocks = {};
      state.selectedPartIndexes = {};
      state.decorations = {
        cables: {},
        decorations: {},
        devices: {},
        walls: {},
        'building-bases': {},
        roads: {},
      };
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
      state.selectedRootBlockIds = action.payload.selectedRootBlockIds || state.selectedRootBlockIds;
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
  },
});

export const { clear: clearBlockSlice, hover, update } = blockSlice.actions;

export default blockSlice.reducer;
