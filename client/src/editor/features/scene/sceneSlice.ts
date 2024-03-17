import MeshInfo, { PartialMeshInfo } from '@/editor/types/MeshInfo';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface SceneState {
  roots: string[];
  meshes: Record<string, MeshInfo>;
}

const initialState: SceneState = {
  roots: [],
  meshes: {},
};

export const sceneSlice = createSlice({
  name: 'frame',
  initialState,
  reducers: {
    addMesh: (state, action: PayloadAction<MeshInfo>) => {
      const newMesh = action.payload;
      state.meshes[newMesh.id] = newMesh;

      if (!newMesh.parent) {
        state.roots.push(newMesh.id);
      }
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

    groupMeshes(state, action: PayloadAction<{ children: string[]; parent: MeshInfo }>) {
      const { children, parent } = action.payload;

      state.roots = state.roots.filter((root) => !children.includes(root));
      state.roots.push(parent.id);
      state.meshes[parent.id] = parent;
    },

    setMeshes(state, action: PayloadAction<MeshInfo[]>) {
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
    },

    updateMesh(state, action: PayloadAction<MeshInfo>) {
      const newMesh = action.payload;
      const mesh = state.meshes[newMesh.id];

      if (mesh) {
        Object.assign(mesh, newMesh);
      }
    },

    updateMeshes(state, action: PayloadAction<PartialMeshInfo[]>) {
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

export const {
  addMesh,
  addMeshPosition,
  deleteMeshes,
  groupMeshes,
  setMeshes,
  setMeshPosition,
  update,
  updateMesh,
  updateMeshes,
} = sceneSlice.actions;

export default sceneSlice.reducer;
