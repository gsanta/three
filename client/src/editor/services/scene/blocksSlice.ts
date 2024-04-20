import Block from '@/editor/types/Block';
import BlockCategory, { BlockCategories, BlockCategoryRecords } from '@/editor/types/BlockCategory';
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

export type BlockCategoryEntries<K extends BlockCategory> = {
  decoration: BlockCategories[K];
};

// Update type constrained to keys and values from BlockCategories
export type UpdateBlock<K extends BlockCategory> = { block: Block } | BlockCategoryEntries<K> | { remove: Block };

export type UpdateBlocks = Array<UpdateBlock<BlockCategory>>;

export const blocksSlice = createSlice({
  name: 'frame',
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
        } else {
          const { block, decoration } = update;

          if (block) {
            state.blocks[block.id] = block;
          }

          if (decoration) {
            state.categories[decoration.category][decoration.id] = decoration;
          }
        }
      });
    },

    deleteMeshes(state, action: PayloadAction<string[]>) {
      const removables = [...action.payload];

      state.rootBlocksIds = state.rootBlocksIds.filter((root) => !removables.includes(root));

      const allRemovables: string[] = [];

      while (removables.length) {
        const next = removables.shift();
        const mesh = state.blocks[next || ''];
        removables.push(...mesh.children);
        allRemovables.push(next || '');
      }

      allRemovables.forEach((meshId) => {
        const mesh = state.blocks[meshId];

        if (!mesh) {
          return;
        }

        if (mesh.parent) {
          const parent = state.blocks[mesh.parent];

          if (parent) {
            parent.children = parent.children.filter((child) => child !== meshId);
          }
        }

        delete state.blocks[meshId];
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

export const { deleteMeshes, setSelectedBlocks, update, updateBlocks } = blocksSlice.actions;

export default blocksSlice.reducer;
