import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import BlockType, { BlockName } from '../../types/BlockType';
import parseBlocks from './utils/parseBlocks';
import Axis from '@/editor/types/Axis';
import { getBlock } from './utils/blockUtils';
import blocks from '@/editor/utils/blocks.json';
import { RGBColor } from '@/editor/services/tool/colorUtils';
import BlockSettings from '@/editor/types/BlockSettings';
import parseBlockSettings from './utils/parseBlockSettings';
import VectorUtils from '@/editor/utils/vectorUtils';
import { PartialDeep } from 'type-fest';
import BlockSelectedSettings from '@/editor/types/BlockSelectedSettings';
import BlockCategory from '@/editor/types/BlockCategory';

export type TransformType = 'move' | 'scale';

export type BlockSettingsState = {
  selectedBlockName: BlockName;
  blocks: BlockType[];
  settings: Record<string, BlockSettings>;
  selectedSettings: Record<string, BlockSelectedSettings>;
  selectedTransformType: TransformType;
  color: RGBColor;
};

const parsedBlocks = parseBlocks(blocks.blocks as unknown as Parameters<typeof parseBlocks>[0]);

export const initialBlockSettingsState: BlockSettingsState = {
  selectedBlockName: 'box',
  blocks: parsedBlocks,
  ...parseBlockSettings(blocks.settings as (PartialDeep<BlockSettings> & { category: BlockCategory })[], parsedBlocks),
  selectedTransformType: 'move',
  color: { r: 1, g: 1, b: 1 },
};

export const blockSettingsSlice = createSlice({
  name: 'frame',
  initialState: initialBlockSettingsState,
  reducers: {
    setBlockSize(state, action: PayloadAction<{ size: number; axis: Axis; blockName: BlockName }>) {
      const { size, blockName, axis } = action.payload;
      const block = getBlock(state.blocks, blockName);
      const axisIndex = VectorUtils.getAxisIndex(axis);
      state.selectedSettings[block.category].size[axisIndex] = size;
    },
    setBlockRotation(state, action: PayloadAction<{ axis: Axis; blockName: BlockName; rotation: number }>) {
      const { axis, blockName, rotation } = action.payload;
      const block = getBlock(state.blocks, blockName);
      const axisIndex = VectorUtils.getAxisIndex(axis);
      state.selectedSettings[block.category].rotation[axisIndex] = rotation;
    },
    setSelectedGeometry: (state, action: PayloadAction<BlockName>) => {
      state.selectedBlockName = action.payload;
    },
    setSelectedTransformType: (state, action: PayloadAction<TransformType>) => {
      state.selectedTransformType = action.payload;
    },

    setColor(state, action: PayloadAction<RGBColor>) {
      state.color = action.payload;
    },
  },
});

export const { setBlockSize, setBlockRotation, setColor, setSelectedGeometry, setSelectedTransformType } =
  blockSettingsSlice.actions;

export default blockSettingsSlice.reducer;
