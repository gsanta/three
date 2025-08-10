import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import BlockConstantData, { BlockTypeName } from '../../models/block/BlockConstantData';
import BlockSettings from '@/client/editor/models/BlockSettings';
import BlockSelectedSettings from '@/client/editor/models/BlockSelectedSettings';
import { CoreDecorations, BlockDecoratorName } from '../../models/block/BlockDecoration';
import ElectricSupplierDecorator, {
  electricSupplierDefaultValues,
} from '../../models/block/categories/ElectricSupplierDecorator';
import CableDecorator from '../../models/block/categories/CableDecorator';
import PlayerDecorator from '../../models/block/categories/PlayerDecorator';
import TransformerDecorator from '../../models/block/categories/TransformerDecorator';
import PoleDecorator from '../../models/block/categories/PoleDecorator';
import ElectricConsumerDecorator, {
  electricConsumerDefaultValues,
} from '../../models/block/categories/ElectricConsumerDecorator';
import ElectricsDecorator, { electricsDefaultValues } from '../../models/block/categories/ElectricsDecorator';

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
  decorations: Record<BlockTypeName, Partial<CoreDecorations>>;
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
        decorations: Record<BlockTypeName, Partial<CoreDecorations> | null>;
      }>,
    ) {
      state.blocks = action.payload.blocks.map((block) => ({
        ...block,
        movable: block.movable || true,
        partDetails: block.partDetails || {},
      }));

      state.decorations = {};

      const getDefaultValues = (decoratorName: BlockDecoratorName) => {
        switch (decoratorName) {
          case 'cables':
            return { decoration: 'cables' } as CableDecorator;
          case 'electrics':
            return { ...electricsDefaultValues } as ElectricsDecorator;
          case 'electric-suppliers':
            return { ...electricSupplierDefaultValues } as ElectricSupplierDecorator;
          case 'electric-consumers':
            return { ...electricConsumerDefaultValues } as ElectricConsumerDecorator;
          case 'players':
            return { decoration: 'players' } as PlayerDecorator;
          case 'transformers':
            return { decoration: 'transformers' } as TransformerDecorator;
          case 'poles':
            return { decoration: 'poles' } as PoleDecorator;
        }
      };

      Object.entries(action.payload.decorations).forEach(([blockTypeName, decorations]) => {
        const mergedDecorations: Partial<CoreDecorations> = {};

        if (decorations) {
          Object.entries(decorations).forEach(([decoratorName, decorationData]) => {
            const defaultValues = getDefaultValues(decoratorName as BlockDecoratorName);

            (mergedDecorations as any)[decoratorName] = {
              ...defaultValues,
              ...decorationData,
            };
          });

          state.decorations[blockTypeName as BlockTypeName] = mergedDecorations;
        }
      });
    },
  },
});

export const { setAddAction, setBlockTypes, setIsOrbitControlStopped, setSelectedTransformType } =
  blockTypeSlice.actions;

export default blockTypeSlice.reducer;
