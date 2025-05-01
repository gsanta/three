import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import Num3 from '../../models/math/Num3';

export type TemporaryState = {
  cables?: [Num3, Num3];
};

export const initialTemporaryState: TemporaryState = {};

export const temporarySlice = createSlice({
  name: 'temporary',
  initialState: initialTemporaryState,
  reducers: {
    updateTemporaryCables(state: TemporaryState, action: PayloadAction<[Num3, Num3] | undefined>) {
      state.cables = action.payload;
    },
  },
});

export const { updateTemporaryCables } = temporarySlice.actions;

export default temporarySlice.reducer;
