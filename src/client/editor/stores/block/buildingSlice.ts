import BlockData from '../../models/block/BlockData';
import { BlockCategoryRecords } from '../../models/block/BlockCategory';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { updateBlocks, updateState } from './blockActions';
import BlocksUpdater from './BlocksUpdater';

export type BlockState = {
  blocks: Record<string, BlockData>;
  blockIds: string[];
  decorations: BlockCategoryRecords;
  hovered?: {
    block: string;
    partIndex?: string;
  };
  rootBlocksIds: string[];
  selectedRootBlockIds: string[];
  selectedBlocks: Record<string, boolean>;
  selectedPartIndexes: Record<string, string[]>;
};

export const initialRoomState: BlockState = {
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

const blockUpdater = new BlocksUpdater('building');

export const buildingSlice = createSlice({
  name: 'building',
  initialState: initialRoomState,
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
      const buildingState = action.payload.building;
      state.blocks = buildingState.blocks || state.blocks;
      state.rootBlocksIds = buildingState.rootBlocksIds || state.rootBlocksIds;
      state.blockIds = buildingState.blockIds || [];
      state.decorations = buildingState.decorations || {};
    });
  },
});

export const { clear: clearBlockSlice, hover, update } = buildingSlice.actions;

export default buildingSlice.reducer;
