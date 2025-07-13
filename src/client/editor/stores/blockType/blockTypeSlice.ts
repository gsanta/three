import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import BlockConstantData, { BlockTypeName } from '../../models/block/BlockConstantData';
import BlockSettings from '@/client/editor/models/BlockSettings';
import BlockSelectedSettings from '@/client/editor/models/BlockSelectedSettings';
import { BlockDecorations } from '../../models/block/BlockDecoration';

export type TransformType = 'move' | 'scale';

export type BlockTypeState = {
  addAction:
    | {
        blockType: string;
        cancelable: boolean;
        finishable: boolean;
      }
    | undefined;
  blocks: BlockConstantData[];
  decorations: Record<BlockTypeName, Partial<BlockDecorations>>;
  isOrbitControlStopped: boolean;
  settings: Partial<Record<string, BlockSettings>>;
  selectedSettings: Record<string, BlockSelectedSettings>;
  selectedTransformType: TransformType;
};

export const initialBlockTypeState: BlockTypeState = {
  addAction: undefined,
  blocks: [],
  decorations: {},
  isOrbitControlStopped: false,
  settings: {},
  selectedSettings: {},
  selectedTransformType: 'move',
};

export const blockTypeSlice = createSlice({
  name: 'block-type',
  initialState: initialBlockTypeState,
  reducers: {
    setAddAction: (state, action: PayloadAction<BlockTypeState['addAction']>) => {
      state.addAction = action.payload;
    },
    setIsOrbitControlStopped: (state, action: PayloadAction<boolean>) => {
      state.isOrbitControlStopped = action.payload;
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
    },
  },
});

export const { setAddAction, setBlockTypes, setIsOrbitControlStopped, setSelectedTransformType } =
  blockTypeSlice.actions;

export default blockTypeSlice.reducer;
