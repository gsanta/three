import Block from '@/client/editor/types/Block';
import BlockCategory, { BlockCategories, BlockCategoryRecords } from '@/client/editor/types/BlockCategory';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type BlocksState = {
  blocks: Record<string, Block>;
  categories: BlockCategoryRecords;
  rootBlocksIds: string[];
  selectedBlockIds: string[];
};

export const initialSceneState: BlocksState = {
  rootBlocksIds: [],
  blocks: {},
  selectedBlockIds: [],
  categories: {
    cables: {},
    decorations: {},
    poles: {},
    walls: {},
  },
};

export type SpecificUpdate<T extends BlockCategory> = {
  id: string;
  key: T;
  val: BlockCategories[T];
};

export type DecorationUpdate<K extends BlockCategory> = {
  decoration: BlockCategories[K];
};

export type BlockUpdate = { block: Block };

export type BlockSelect = { select: string | null };

// Update type constrained to keys and values from BlockCategories
export type UpdateBlock<K extends BlockCategory> = BlockUpdate | DecorationUpdate<K> | { remove: Block } | BlockSelect;

export type UpdateBlocks = Array<UpdateBlock<BlockCategory>>;

export const blocksSlice = createSlice({
  name: 'block',
  initialState: initialSceneState,
  reducers: {
    updateBlocks(state: BlocksState, action: PayloadAction<UpdateBlocks>) {
      const updates = action.payload;

      updates.forEach((update) => {
        if ('remove' in update) {
          const rootIndex = state.rootBlocksIds.indexOf(update.remove.id);
          if (rootIndex !== -1) {
            state.rootBlocksIds.splice(rootIndex, 1);
          }

          const selectedIndex = state.selectedBlockIds.indexOf(update.remove.id);
          if (selectedIndex !== -1) {
            state.selectedBlockIds.splice(rootIndex, 1);
          }

          const block = state.blocks[update.remove.id];

          if (block) {
            delete state.blocks[update.remove.id];
            delete state.categories[block.category][update.remove.id];
          }
        } else if ('select' in update) {
          if (update.select === null) {
            state.selectedBlockIds = [];
          } else if (!state.selectedBlockIds.includes(update.select)) {
            state.selectedBlockIds.push(update.select);
          }
        } else if ('block' in update) {
          state.blocks[update.block.id] = update.block;

          if (!update.block.parent) {
            state.rootBlocksIds.push(update.block.id);
          }
        } else {
          const { decoration } = update;

          if (decoration) {
            state.categories[decoration.category][decoration.id] = decoration;
          }
        }
      });
    },

    setSelectedBlocks: (state, action: PayloadAction<string[]>) => {
      state.selectedBlockIds = action.payload;
    },

    update(state, action: PayloadAction<Partial<BlocksState>>) {
      state.blocks = action.payload.blocks || state.blocks;
      state.rootBlocksIds = action.payload.rootBlocksIds || state.rootBlocksIds;
      state.selectedBlockIds = action.payload.selectedBlockIds || state.selectedBlockIds;
    },
  },
});

export const { setSelectedBlocks, update, updateBlocks } = blocksSlice.actions;

export default blocksSlice.reducer;
