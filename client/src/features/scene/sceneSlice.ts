import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Camera } from 'three';
import { BasicGeometryName } from '../builder/builderSlice';

type MeshInfo = {
  name: BasicGeometryName;
  position: [number, number, number];
  rotation?: [number, number, number];
};

interface SceneState {
  meshes: MeshInfo[];
  camera: Camera | undefined;
}

const initialState: SceneState = {
  meshes: [],
  camera: undefined,
};

export const sceneSlice = createSlice({
  name: 'frame',
  initialState,
  reducers: {
    addMesh: (state, action: PayloadAction<MeshInfo>) => {
      state.meshes.push(action.payload);
    },

    setCamera: (state, action: PayloadAction<Camera | undefined>) => {
      state.camera = action.payload;
    },
  },
});

export const { addMesh, setCamera } = sceneSlice.actions;

export default sceneSlice.reducer;
