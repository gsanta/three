import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import Block, { BlockType } from '../../types/Block';
import parseBlocks from './utils/parseBlocks';
import Axis from '@/editor/types/Axis';
import { getBlock } from './utils/blockUtils';
import { getAxisIndex } from '@/editor/utils/vectorUtils';
import blocks from '@/editor/utils/blocks.json';

export type TransformType = 'move' | 'scale';

export type BlockState = {
  selectedBlockName: BlockType;
  blocks: Block[];
  selectedTransformType: TransformType;
};

export const initialBlockState: BlockState = {
  selectedBlockName: 'box',
  blocks: parseBlocks(blocks as unknown as Parameters<typeof parseBlocks>[0]),
  selectedTransformType: 'move',
};

export const blockSlice = createSlice({
  name: 'frame',
  initialState: initialBlockState,
  reducers: {
    setBlockSize(state, action: PayloadAction<{ size: number; blockName: BlockType }>) {
      const { size, blockName } = action.payload;
      const block = getBlock(state.blocks, blockName);
      block.options.size.selected = size;
    },
    setBlockRotation(state, action: PayloadAction<{ axis: Axis; blockName: BlockType; rotation: number }>) {
      const { axis, blockName, rotation } = action.payload;
      const block = getBlock(state.blocks, blockName);
      block.selected.rotation[getAxisIndex(axis)] = rotation;
    },
    setSelectedGeometry: (state, action: PayloadAction<BlockType>) => {
      state.selectedBlockName = action.payload;
    },
    setSelectedTransformType: (state, action: PayloadAction<TransformType>) => {
      state.selectedTransformType = action.payload;
    },
  },
});

export const { setBlockSize, setBlockRotation, setSelectedGeometry, setSelectedTransformType } = blockSlice.actions;

export default blockSlice.reducer;
