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

type BlockCategoryEntries = {
  [K in keyof BlockCategories]: { block?: Block; category: K; decoration?: BlockCategories[K] };
}[keyof BlockCategories];

// Update type constrained to keys and values from BlockCategories
export type UpdateBlock = BlockCategoryEntries;

export type UpdateBlocks = Array<UpdateBlock>;

export const blocksSlice = createSlice({
  name: 'frame',
  initialState: initialSceneState,
  reducers: {
    updateBlocks(state: BlocksState, action: PayloadAction<UpdateBlocks>) {
      const updates = action.payload;

      updates.forEach(({ block, category, decoration }) => {
        if (block) {
          state.blocks[block.id] = block;
        }

        if (decoration) {
          state.categories[category][decoration.id] = decoration;
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
