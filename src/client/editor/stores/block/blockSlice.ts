import Block from '@/client/editor/types/Block';
import BlockCategory, { BlockCategories, BlockCategoryRecords } from '@/client/editor/types/BlockCategory';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type BlockState = {
  blocks: Record<string, Block>;
  categories: BlockCategoryRecords;
  hovered: string | null;
  rootBlocksIds: string[];
  selectedRootBlockIds: string[];
  selectedBlocks: Record<string, boolean>;
  selectedPartNames: Record<string, string[]>;
};

export const initialBlockState: BlockState = {
  rootBlocksIds: [],
  blocks: {},
  hovered: null,
  selectedBlocks: {},
  selectedRootBlockIds: [],
  selectedPartNames: {},
  categories: {
    cables: {},
    decorations: {},
    poles: {},
    roads: {},
    walls: {},
    'building-bases': {},
  },
};

export type SpecificUpdate<T extends BlockCategory> = {
  id: string;
  key: T;
  val: BlockCategories[T];
};

export type DecorationUpdate<K extends BlockCategory> = {
  type: 'update';
  block?: Block;
  decoration: BlockCategories[K];
};

export type BlockUpdate<K extends BlockCategory> = { type: 'update'; block: Block; decoration?: BlockCategories[K] };

export type BlockCreate<K extends BlockCategory> = { type: 'create'; block: Block; decoration?: BlockCategories[K] };

export type BlockSelect = { select: string | null; partName?: string };

// Update type constrained to keys and values from BlockCategories
export type UpdateBlock<K extends BlockCategory> =
  | BlockUpdate<K>
  | DecorationUpdate<K>
  | BlockCreate<K>
  | { remove: Block }
  | BlockSelect;

export type UpdateBlocks = Array<UpdateBlock<BlockCategory>>;

export const blockSlice = createSlice({
  name: 'block',
  initialState: initialBlockState,
  reducers: {
    clear(state: BlockState) {
      state.rootBlocksIds = [];
      state.blocks = {};
      state.selectedRootBlockIds = [];

      state.selectedBlocks = {};
      state.selectedPartNames = {};
      state.categories = {
        cables: {},
        decorations: {},
        poles: {},
        walls: {},
        'building-bases': {},
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
            state.selectedRootBlockIds.splice(rootIndex, 1);
          }

          const block = state.blocks[update.remove.id];

          if (block) {
            delete state.blocks[update.remove.id];
            delete state.categories[block.category][update.remove.id];
          }
        } else if ('select' in update) {
          if (update.select === null) {
            state.selectedRootBlockIds = [];
            state.selectedPartNames = {};
            state.selectedBlocks = {};
          } else {
            if (update.partName) {
              if (!state.selectedPartNames[update.select]) {
                state.selectedPartNames[update.select] = [];
              }

              state.selectedPartNames[update.select] = [
                ...new Set([...state.selectedPartNames[update.select], update.partName]),
              ];
            } else {
              state.selectedBlocks[update.select] = true;
              state.selectedRootBlockIds = [...new Set([...state.selectedRootBlockIds, update.select])];
            }
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
              state.categories[decoration.category][decoration.id] = decoration;
            }
          }
        }
      });
    },

    hover(state, action: PayloadAction<string | null>) {
      if (state.hovered) {
        state.blocks[state.hovered].isHovered = false;
      }
      state.hovered = action.payload;

      if (state.hovered) {
        state.blocks[state.hovered].isHovered = true;
      }
    },

    update(state, action: PayloadAction<Partial<BlockState>>) {
      state.blocks = action.payload.blocks || state.blocks;
      state.rootBlocksIds = action.payload.rootBlocksIds || state.rootBlocksIds;
      state.selectedRootBlockIds = action.payload.selectedRootBlockIds || state.selectedRootBlockIds;
    },
  },
});

export const { clear: clearBlockSlice, hover, update, updateBlocks } = blockSlice.actions;

export default blockSlice.reducer;
