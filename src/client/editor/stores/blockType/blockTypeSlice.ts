import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import BlockConstantData, { BlockTypeName } from '../../models/block/BlockConstantData';
import BlockSettings from '@/client/editor/models/BlockSettings';
import BlockSelectedSettings from '@/client/editor/models/BlockSelectedSettings';
import { BlockDecorations } from '../../models/block/BlockDecoration';

export type TransformType = 'move' | 'scale';

export type BlockTypeState = {
  activeBlockType: string;
  blocks: BlockConstantData[];
  decorations: Record<BlockTypeName, Partial<BlockDecorations>>;
  settings: Partial<Record<string, BlockSettings>>;
  selectedSettings: Record<string, BlockSelectedSettings>;
  selectedTransformType: TransformType;
};

export const initialBlockTypeState: BlockTypeState = {
  activeBlockType: 'two-story-house-1',
  blocks: [],
  decorations: {},
  settings: {},
  selectedSettings: {},
  selectedTransformType: 'move',
};

export const blockTypeSlice = createSlice({
  name: 'block-type',
  initialState: initialBlockTypeState,
  reducers: {
    setActiveBlockType: (state, action: PayloadAction<string>) => {
      state.activeBlockType = action.payload;
    },
    setSelectedTransformType: (state, action: PayloadAction<TransformType>) => {
      state.selectedTransformType = action.payload;
    },

    setBlockTypes(
      state,
      action: PayloadAction<{
        blocks: BlockConstantData[];
        decorations: Record<BlockTypeName, Partial<BlockDecorations>>;
      }>,
    ) {
      state.blocks = action.payload.blocks.map((block) => ({
        ...block,
        movable: block.movable || true,
        partDetails: block.partDetails || {},
      }));

      state.decorations = action.payload.decorations;

      state.activeBlockType = state.blocks[0].type;
    },
  },
});

export const { setActiveBlockType, setSelectedTransformType, setBlockTypes } = blockTypeSlice.actions;

export default blockTypeSlice.reducer;
