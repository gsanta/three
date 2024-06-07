import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import BlockType, { BlockName } from '../../types/BlockType';
import Axis from '@/client/editor/types/Axis';
import { RGBColor } from '@/client/editor/utils/colorUtils';
import BlockSettings from '@/client/editor/types/BlockSettings';
import VectorUtils from '@/client/editor/utils/vectorUtils';
import BlockSelectedSettings from '@/client/editor/types/BlockSelectedSettings';
import BlockUtils from '../../utils/BlockUtils';

export type TransformType = 'move' | 'scale';

export type BlockSettingsState = {
  selectedBlockName: string;
  blocks: BlockType[];
  settings: Partial<Record<string, BlockSettings>>;
  selectedSettings: Record<string, BlockSelectedSettings>;
  selectedTransformType: TransformType;
  color: RGBColor;
};

export const initialBlockSettingsState: BlockSettingsState = {
  selectedBlockName: 'building-base-1',
  blocks: [],
  settings: {},
  selectedSettings: {},
  selectedTransformType: 'move',
  color: { r: 1, g: 1, b: 1 },
};

export const blockSettingsSlice = createSlice({
  name: 'frame',
  initialState: initialBlockSettingsState,
  reducers: {
    setBlockRotation(state, action: PayloadAction<{ axis: Axis; blockName: string; rotation: number }>) {
      const { axis, blockName, rotation } = action.payload;
      const block = BlockUtils.getBlock(state.blocks, blockName);
      const axisIndex = VectorUtils.getAxisIndex(axis);
      state.selectedSettings[block.category].rotation[axisIndex] = rotation;
    },
    setSelectedGeometry: (state, action: PayloadAction<string>) => {
      state.selectedBlockName = action.payload;
    },
    setSelectedTransformType: (state, action: PayloadAction<TransformType>) => {
      state.selectedTransformType = action.payload;
    },

    setColor(state, action: PayloadAction<RGBColor>) {
      state.color = action.payload;
    },

    setTemplates(state, action: PayloadAction<BlockType[]>) {
      state.blocks = action.payload.map((block) => ({
        ...block,
        geometry: block.geometry || 'model',
        movable: block.movable || true,
        partDetails: block.partDetails || {},
        rotation: block.rotation || [0, 0, 0],
        scale: block.scale || [1, 1, 1],
      }));
      state.selectedBlockName = state.blocks[0].type;
    },
  },
});

export const { setBlockRotation, setColor, setSelectedGeometry, setSelectedTransformType, setTemplates } =
  blockSettingsSlice.actions;

export default blockSettingsSlice.reducer;
