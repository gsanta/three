import MeshInfo, { PartialMeshInfo } from '@/editor/types/MeshInfo';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface SceneState {
  meshes: MeshInfo[];
}

const initialState: SceneState = {
  meshes: [],
};

export const sceneSlice = createSlice({
  name: 'frame',
  initialState,
  reducers: {
    addMesh: (state, action: PayloadAction<MeshInfo>) => {
      state.meshes.push(action.payload);
    },

    setMeshes(state, action: PayloadAction<MeshInfo[]>) {
      state.meshes = action.payload;
    },

    setMeshPosition(state, action: PayloadAction<{ meshId: string; position: [number, number, number] }>) {
      const { meshId, position } = action.payload;
      const mesh = state.meshes.find((currentMesh) => currentMesh.id === meshId);

      if (mesh) {
        mesh.position = position;
      }
    },

    addMeshPosition(state, action: PayloadAction<{ meshId: string; position: [number, number, number] }>) {
      const { meshId, position } = action.payload;
      const mesh = state.meshes.find((currentMesh) => currentMesh.id === meshId);

      if (mesh) {
        mesh.position[0] += position[0];
        mesh.position[1] += position[1];
        mesh.position[2] += position[2];
      }
    },

    updateMesh(state, action: PayloadAction<MeshInfo>) {
      const newMesh = action.payload;
      const mesh = state.meshes.find((currentMesh) => currentMesh.id === newMesh.id);

      if (mesh) {
        Object.assign(mesh, newMesh);
      }
    },

    updateMeshes(state, action: PayloadAction<PartialMeshInfo[]>) {
      const newMeshes = action.payload;

      newMeshes.forEach((newMesh) => {
        const mesh = state.meshes.find((currentMesh) => currentMesh.id === newMesh.id);

        if (mesh) {
          Object.assign(mesh, newMesh);
        }
      });
    },
  },
});

export const { addMesh, addMeshPosition, setMeshes, setMeshPosition, updateMesh, updateMeshes } = sceneSlice.actions;

export default sceneSlice.reducer;
