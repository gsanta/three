import MeshData, { PartialMeshData } from '@/editor/types/MeshData';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import Pole, { PartialPole } from './types/Pole';
import { StateWithHistory } from 'redux-undo';

export type Specifics = {
  poles: Pole;
  other: number;
};

export type SpecificRecords = {
  [K in keyof Specifics]: Record<string, Specifics[K]>;
};

export type SpecificPartials = {
  poles: PartialPole;
  other: number;
};

export type SpecificType<T extends SpecificKeys> = SpecificRecords[T] extends Record<string, infer U> ? U : unknown;
export type SpecificKeys = keyof SpecificRecords;

export type SpecificPartial<T extends SpecificKeys> = SpecificPartials[T] extends Record<string, infer U> ? U : unknown;

export type SceneState = {
  roots: string[];
  meshes: Record<string, MeshData>;
  selectedMeshIds: string[];

  specifics: SpecificRecords;
};

export const initialSceneState: SceneState = {
  roots: [],
  meshes: {},
  selectedMeshIds: [],
  specifics: {
    poles: {},
  },
};

export type SpecificUpdate<T extends SpecificKeys> = {
  id: string;
  key: T;
  val: Specifics[T];
};

export const sceneSlice = createSlice({
  name: 'frame',
  initialState: initialSceneState,
  reducers: {
    updateSpecific<T extends SpecificKeys>(state: SceneState, action: PayloadAction<SpecificUpdate<T>>) {
      const { id, key, val } = action.payload;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (state.specifics[key][id] as any) = val;
    },

    addMeshes: (state, action: PayloadAction<MeshData[]>) => {
      const newMeshes = action.payload;

      newMeshes.forEach((newMesh) => {
        state.meshes[newMesh.id] = newMesh;

        if (!newMesh.parent) {
          state.roots.push(newMesh.id);
        }
      });
    },

    deleteMeshes(state, action: PayloadAction<string[]>) {
      const removables = [...action.payload];

      state.roots = state.roots.filter((root) => !removables.includes(root));

      const allRemovables: string[] = [];

      while (removables.length) {
        const next = removables.shift();
        const mesh = state.meshes[next || ''];
        removables.push(...mesh.children);
        allRemovables.push(next || '');
      }

      allRemovables.forEach((meshId) => {
        const mesh = state.meshes[meshId];

        if (!mesh) {
          return;
        }

        if (mesh.parent) {
          const parent = state.meshes[mesh.parent];

          if (parent) {
            parent.children = parent.children.filter((child) => child !== meshId);
          }
        }

        delete state.meshes[meshId];
      });
    },

    groupMeshes(state, action: PayloadAction<{ children: string[]; parent: MeshData }>) {
      const { children, parent } = action.payload;

      state.roots = state.roots.filter((root) => !children.includes(root));
      state.roots.push(parent.id);
      state.meshes[parent.id] = parent;
    },

    setMeshes(state, action: PayloadAction<MeshData[]>) {
      const meshes = action.payload;

      meshes.forEach((mesh) => {
        state.meshes[mesh.id] = mesh;

        if (!mesh.parent) {
          state.roots.push(mesh.id);
        }
      });
    },

    setMeshPosition(state, action: PayloadAction<{ meshId: string; position: [number, number, number] }>) {
      const { meshId, position } = action.payload;
      const mesh = state.meshes[meshId];

      if (mesh) {
        mesh.position = position;
      }
    },

    setSelectedMeshes: (state, action: PayloadAction<string[]>) => {
      state.selectedMeshIds = action.payload;
    },

    addMeshPosition(state, action: PayloadAction<{ meshId: string; position: [number, number, number] }>) {
      const { meshId, position } = action.payload;
      const mesh = state.meshes[meshId];

      if (mesh) {
        mesh.position[0] += position[0];
        mesh.position[1] += position[1];
        mesh.position[2] += position[2];
      }
    },

    update(state, action: PayloadAction<Partial<SceneState>>) {
      state.meshes = action.payload.meshes || state.meshes;
      state.roots = action.payload.roots || state.roots;
      state.selectedMeshIds = action.payload.selectedMeshIds || state.selectedMeshIds;
    },

    updateMesh(state, action: PayloadAction<MeshData>) {
      const newMesh = action.payload;
      const mesh = state.meshes[newMesh.id];

      if (mesh) {
        Object.assign(mesh, newMesh);
      }
    },

    updateMeshes(state, action: PayloadAction<PartialMeshData[]>) {
      const newMeshes = action.payload;

      newMeshes.forEach((newMesh) => {
        const mesh = state.meshes[newMesh.id];

        if (mesh) {
          Object.assign(mesh, newMesh);
        }
      });
    },
  },
});

export const getSpecific = <T extends keyof SpecificRecords>(
  slice: StateWithHistory<SceneState>,
  key: T,
  id: string,
): SpecificRecords[T] extends Record<string, infer U> ? U : unknown => {
  return slice.present.specifics[key][id] as SpecificRecords[T] extends Record<string, infer U> ? U : unknown;
};

export const {
  addMeshes,
  addMeshPosition,
  deleteMeshes,
  groupMeshes,
  setMeshes,
  setMeshPosition,
  setSelectedMeshes,
  update,
  updateMesh,
  updateMeshes,
  updateSpecific,
} = sceneSlice.actions;

export default sceneSlice.reducer;
