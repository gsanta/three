import Block, { PartialMeshData } from '@/editor/types/Block';
import { BlockCategories, BlockCategory, BlockCategoryRecords } from '@/editor/types/BlockCategory';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { StateWithHistory } from 'redux-undo';

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
    poles: {},
    walls: {},
  },
};

export type SpecificUpdate<T extends BlockCategory> = {
  id: string;
  key: T;
  val: BlockCategories[T];
};

export const blocksSlice = createSlice({
  name: 'frame',
  initialState: initialSceneState,
  reducers: {
    createBlockDecoration<T extends BlockCategory>(
      state: BlocksState,
      action: PayloadAction<{ key: T; value: BlockCategories[T] }>,
    ) {
      const { key, value } = action.payload;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (state.categories[key][value.id] as any) = value;
    },

    updateBlockDecoration<T extends BlockCategory>(state: BlocksState, action: PayloadAction<SpecificUpdate<T>>) {
      const { id, key, val } = action.payload;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (state.categories[key][id] as any) = val;
    },

    addMeshes: (state, action: PayloadAction<Block[]>) => {
      const newMeshes = action.payload;

      newMeshes.forEach((newMesh) => {
        state.blocks[newMesh.id] = newMesh;

        if (!newMesh.parent) {
          state.rootBlocksIds.push(newMesh.id);
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

    groupMeshes(state, action: PayloadAction<{ children: string[]; parent: Block }>) {
      const { children, parent } = action.payload;

      state.rootBlocksIds = state.rootBlocksIds.filter((root) => !children.includes(root));
      state.rootBlocksIds.push(parent.id);
      state.blocks[parent.id] = parent;
    },

    setMeshes(state, action: PayloadAction<Block[]>) {
      const meshes = action.payload;

      meshes.forEach((mesh) => {
        state.blocks[mesh.id] = mesh;

        if (!mesh.parent) {
          state.rootBlocksIds.push(mesh.id);
        }
      });
    },

    setMeshPosition(state, action: PayloadAction<{ meshId: string; position: [number, number, number] }>) {
      const { meshId, position } = action.payload;
      const mesh = state.blocks[meshId];

      if (mesh) {
        mesh.position = position;
      }
    },

    setSelectedMeshes: (state, action: PayloadAction<string[]>) => {
      state.selectedBlockIds = action.payload;
    },

    addMeshPosition(state, action: PayloadAction<{ meshId: string; position: [number, number, number] }>) {
      const { meshId, position } = action.payload;
      const mesh = state.blocks[meshId];

      if (mesh) {
        mesh.position[0] += position[0];
        mesh.position[1] += position[1];
        mesh.position[2] += position[2];
      }
    },

    update(state, action: PayloadAction<Partial<BlocksState>>) {
      state.blocks = action.payload.blocks || state.blocks;
      state.rootBlocksIds = action.payload.rootBlocksIds || state.rootBlocksIds;
      state.selectedBlockIds = action.payload.selectedBlockIds || state.selectedBlockIds;
    },

    updateMesh(state, action: PayloadAction<Block>) {
      const newMesh = action.payload;
      const mesh = state.blocks[newMesh.id];

      if (mesh) {
        Object.assign(mesh, newMesh);
      }
    },

    updateMeshes(state, action: PayloadAction<PartialMeshData[]>) {
      const newMeshes = action.payload;

      newMeshes.forEach((newMesh) => {
        const mesh = state.blocks[newMesh.id];

        if (mesh) {
          Object.assign(mesh, newMesh);
        }
      });
    },
  },
});

export const getSpecific = <T extends keyof BlockCategoryRecords>(
  slice: StateWithHistory<BlocksState>,
  key: T,
  id: string,
): BlockCategoryRecords[T] extends Record<string, infer U> ? U : unknown => {
  return slice.present.categories[key][id] as BlockCategoryRecords[T] extends Record<string, infer U> ? U : unknown;
};

export const {
  addMeshes,
  addMeshPosition,
  createBlockDecoration,
  deleteMeshes,
  groupMeshes,
  setMeshes,
  setMeshPosition,
  setSelectedMeshes,
  update,
  updateMesh,
  updateMeshes,
  updateBlockDecoration,
} = blocksSlice.actions;

export default blocksSlice.reducer;
