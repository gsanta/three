import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { BasicGeometryName } from '../builder/builderSlice';

type MeshInfo = {
  name: BasicGeometryName;
  position: [number, number, number];
  rotation: [number, number, number];
};

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
  },
});

export const { addMesh } = sceneSlice.actions;

export default sceneSlice.reducer;
