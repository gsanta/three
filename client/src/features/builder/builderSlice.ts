import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export type GeometryType = 'box' | 'sphere' | 'cylinder';

type BasicGeometry = {
  name: GeometryType;
};

interface BuilderState {
  selectedGeometry: GeometryType;
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
    setSelectedGeometry: (state, action: PayloadAction<GeometryType>) => {
      state.selectedGeometry = action.payload;
    },
  },
});

export const { setSelectedGeometry } = builderSlice.actions;

export default builderSlice.reducer;
