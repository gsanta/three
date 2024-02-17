import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type BasicGeometryName = 'box' | 'sphere' | 'cylinder';

type BasicGeometry = {
  name: BasicGeometryName;
};

interface BuilderState {
  selectedGeometry: BasicGeometryName;
  geometries: BasicGeometry[];
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
};

export const builderSlice = createSlice({
  name: 'frame',
  initialState,
  reducers: {
    setSelectedGeometry: (state, action: PayloadAction<BasicGeometryName>) => {
      state.selectedGeometry = action.payload;
    },
  },
});

export const { setSelectedGeometry } = builderSlice.actions;

export default builderSlice.reducer;
