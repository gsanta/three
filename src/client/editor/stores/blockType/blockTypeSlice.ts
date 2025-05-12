import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import BlockConstantData from '../../models/block/BlockConstantData';
import BlockSettings from '@/client/editor/models/BlockSettings';
import BlockSelectedSettings from '@/client/editor/models/BlockSelectedSettings';

export type TransformType = 'move' | 'scale';

export type BlockTypeState = {
  selectedBlockName: string;
  blocks: BlockConstantData[];
  settings: Partial<Record<string, BlockSettings>>;
  selectedSettings: Record<string, BlockSelectedSettings>;
  selectedTransformType: TransformType;
};

export const initialBlockTypeState: BlockTypeState = {
  selectedBlockName: 'two-story-house-1',
  blocks: [],
  settings: {},
  selectedSettings: {},
  selectedTransformType: 'move',
};

export const blockTypeSlice = createSlice({
  name: 'block-type',
  initialState: initialBlockTypeState,
  reducers: {
    setSelectedGeometry: (state, action: PayloadAction<string>) => {
      state.selectedBlockName = action.payload;
    },
    setSelectedTransformType: (state, action: PayloadAction<TransformType>) => {
      state.selectedTransformType = action.payload;
    },

    setTemplates(state, action: PayloadAction<BlockConstantData[]>) {
      state.blocks = action.payload.map((block) => ({
        ...block,
        movable: block.movable || true,
        partDetails: block.partDetails || {},
      }));
      state.selectedBlockName = state.blocks[0].type;
    },
  },
});

export const { setSelectedGeometry, setSelectedTransformType, setTemplates } = blockTypeSlice.actions;

export default blockTypeSlice.reducer;
