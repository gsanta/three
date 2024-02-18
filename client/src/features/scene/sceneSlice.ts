import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { GeometryType } from '../builder/builderSlice';

type MeshInfo = {
  id: string;
  type: GeometryType;
  position: [number, number, number];
  rotation?: [number, number, number];
};

interface SceneState {
  meshes: MeshInfo[];
  selectedMesh?: string;
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

    setSelectedMesh: (state, action: PayloadAction<MeshInfo | undefined>) => {
      state.selectedMesh = action.payload?.id;
    },
  },
});

export const { addMesh, setSelectedMesh } = sceneSlice.actions;

export default sceneSlice.reducer;
