import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import BlockConstantData from '../../data/BlockConstantData';
import { RGBColor } from '@/client/editor/utils/colorUtils';
import BlockSettings from '@/client/editor/models/BlockSettings';
import BlockSelectedSettings from '@/client/editor/models/BlockSelectedSettings';

export type TransformType = 'move' | 'scale';

export type BlockTypeState = {
  selectedBlockName: string;
  blocks: BlockConstantData[];
  settings: Partial<Record<string, BlockSettings>>;
  selectedSettings: Record<string, BlockSelectedSettings>;
  selectedTransformType: TransformType;
  color: RGBColor;
};

export const initialBlockTypeState: BlockTypeState = {
  selectedBlockName: 'two-story-house-1',
  blocks: [],
  settings: {},
  selectedSettings: {},
  selectedTransformType: 'move',
  color: { r: 1, g: 1, b: 1 },
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

    setColor(state, action: PayloadAction<RGBColor>) {
      state.color = action.payload;
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

export const { setColor, setSelectedGeometry, setSelectedTransformType, setTemplates } = blockTypeSlice.actions;

export default blockTypeSlice.reducer;
