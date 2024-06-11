import Block from '@/client/editor/types/Block';
import BlockDecoration, { BlockCategories, BlockCategoryRecords } from '@/client/editor/types/BlockCategory';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type BlockState = {
  blocks: Record<string, Block>;
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

export const initialBlockState: BlockState = {
  rootBlocksIds: [],
  blocks: {},
  selectedBlocks: {},
  selectedRootBlockIds: [],
  selectedPartIndexes: {},
  decorations: {
    cables: {},
    decorations: {},
    devices: {},
    poles: {},
    roads: {},
    walls: {},
    'building-bases': {},
  },
};

export type SpecificUpdate<T extends BlockDecoration> = {
  id: string;
  key: T;
  val: BlockCategories[T];
};

export type DecorationUpdate<K extends BlockDecoration> = {
  type: 'update';
  decoration: BlockCategories[K];
};

export type BlockUpdate = { type: 'update'; block: Block };

export type BlockSelect = { select: string | null; partIndex?: string };

// Update type constrained to keys and values from BlockCategories
export type UpdateBlock<K extends BlockDecoration> =
  | BlockUpdate
  | DecorationUpdate<K>
  | { remove: Block }
  | BlockSelect;

export type UpdateBlocks = Array<UpdateBlock<BlockDecoration>>;

export const blockSlice = createSlice({
  name: 'block',
  initialState: initialBlockState,
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
        poles: {},
        walls: {},
        'building-bases': {},
        roads: {},
      };
    },

    updateBlocks(state: BlockState, action: PayloadAction<UpdateBlocks>) {
      const updates = action.payload;

      updates.forEach((update) => {
        if ('remove' in update) {
          const rootIndex = state.rootBlocksIds.indexOf(update.remove.id);
          if (rootIndex !== -1) {
            state.rootBlocksIds.splice(rootIndex, 1);
          }

          const selectedIndex = state.selectedRootBlockIds.indexOf(update.remove.id);
          if (selectedIndex !== -1) {
            state.selectedRootBlockIds.splice(selectedIndex, 1);
          }

          if (state.selectedBlocks[update.remove.id]) {
            delete state.selectedBlocks[update.remove.id];
          }

          const block = state.blocks[update.remove.id];

          if (block) {
            delete state.blocks[update.remove.id];
            block.decorations.forEach((category) => {
              delete state.decorations[category][update.remove.id];
            });
          }
        } else if ('select' in update) {
          if (update.select === null) {
            Object.keys(state.selectedBlocks).forEach((selectedBlock) => {
              state.blocks[selectedBlock].isSelected = false;
              Object.values(state.blocks[selectedBlock].partDetails).forEach((val) => {
                if (val) {
                  val.isSelected = false;
                }
              });
            });
            state.selectedRootBlockIds = [];
            state.selectedPartIndexes = {};
            state.selectedBlocks = {};
          } else {
            if (update.partIndex) {
              if (!state.selectedPartIndexes[update.select]) {
                state.selectedPartIndexes[update.select] = [];
              }

              state.selectedPartIndexes[update.select] = [
                ...new Set([...state.selectedPartIndexes[update.select], update.partIndex]),
              ];

              const partDetail = state.blocks[update.select].partDetails[update.partIndex];
              if (partDetail) {
                partDetail.isSelected = true;
              }
            }
            state.selectedBlocks[update.select] = true;
            state.blocks[update.select].isSelected = true;
            state.selectedRootBlockIds = [...new Set([...state.selectedRootBlockIds, update.select])];
          }
        } else {
          if ('block' in update && update.block) {
            state.blocks[update.block.id] = update.block;

            if (update.block.parent) {
              const rootIndex = state.rootBlocksIds.indexOf(update.block.id);
              if (rootIndex !== -1) {
                state.rootBlocksIds.splice(rootIndex, 1);
              }
            } else {
              const rootIndex = state.rootBlocksIds.indexOf(update.block.id);

              if (rootIndex === -1) {
                state.rootBlocksIds.push(update.block.id);
              }
            }
          }

          if ('decoration' in update) {
            const { decoration } = update;

            if (decoration) {
              state.decorations[decoration.category][decoration.id] = decoration;
            }
          }
        }
      });
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
      if (action.payload.decorations) {
        state.decorations = action.payload.decorations;
      }
    },
  },
});

export const { clear: clearBlockSlice, hover, update, updateBlocks } = blockSlice.actions;

export default blockSlice.reducer;
