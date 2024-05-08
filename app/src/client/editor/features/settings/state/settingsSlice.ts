import { createSlice } from '@reduxjs/toolkit';

export type SettingsState = {
  color: string;
  canvasSize: {
    width: number;
    height: number;
  };
};

export const initialSettingsState: SettingsState = {
  color: '#000000',
  canvasSize: {
    width: 0,
    height: 0,
  },
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState: initialSettingsState,
  reducers: {},
});

export const {} = settingsSlice.actions;

export default settingsSlice.reducer;
