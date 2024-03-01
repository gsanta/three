import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { MeshInfo } from '../scene/sceneSlice';
import * as blocks from './utils/blocks.json';
import Block, { BlockType } from './types/Block';
import parseBlocks from './utils/parseBlocks';

export type TransformType = 'move' | 'scale';

interface BuilderState {
  selectedBlockName: BlockType;
  blocks: Block[];
  selectedTransformType: TransformType;

  selectedMeshId?: string;
}

const initialState: BuilderState = {
  selectedBlockName: 'box',
  blocks: parseBlocks(blocks as unknown as Parameters<typeof parseBlocks>[0]),
  selectedTransformType: 'move',
};

export const builderSlice = createSlice({
  name: 'frame',
  initialState,
  reducers: {
    setSelectedGeometry: (state, action: PayloadAction<BlockType>) => {
      state.selectedBlockName = action.payload;
    },
    setSelectedTransformType: (state, action: PayloadAction<TransformType>) => {
      state.selectedTransformType = action.payload;
    },
    setSelectedMesh: (state, action: PayloadAction<MeshInfo | undefined>) => {
      state.selectedMeshId = action.payload?.id;
    },
  },
});

export const { setSelectedGeometry, setSelectedMesh, setSelectedTransformType } = builderSlice.actions;

export default builderSlice.reducer;
