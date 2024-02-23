import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { MeshInfo } from '../scene/sceneSlice';

export type GeometryType = 'box' | 'sphere' | 'cylinder';

export type TransformType = 'move' | 'scale';

type BasicGeometry = {
  name: GeometryType;
};

interface BuilderState {
  selectedGeometry: GeometryType;
  geometries: BasicGeometry[];
  selectedTransformType: TransformType;

  selectedMeshId?: string;
}

const initialState: BuilderState = {
  selectedGeometry: 'box',
  geometries: [
    {
      name: 'box',
    },
    {
      name: 'sphere',
    },
    {
      name: 'cylinder',
    },
  ],
  selectedTransformType: 'move',
};

export const builderSlice = createSlice({
  name: 'frame',
  initialState,
  reducers: {
    setSelectedGeometry: (state, action: PayloadAction<GeometryType>) => {
      state.selectedGeometry = action.payload;
    },
    setSelectedTransformType: (state, action: PayloadAction<TransformType>) => {
      state.selectedTransformType = action.payload;
    },
    setSelectedMesh: (state, action: PayloadAction<MeshInfo | undefined>) => {
      state.selectedMeshId = action.payload?.id;
    },
  },
});

export const { setSelectedGeometry, setSelectedMesh, setSelectedTransformType } = builderSlice.actions;

export default builderSlice.reducer;
