// import type { RootState } from '@/utils/store';
import { createSlice } from '@reduxjs/toolkit';

interface SettingsState {
  color: string;
  canvasSize: {
    width: number;
    height: number;
  };
}

const initialState: SettingsState = {
  color: '#000000',
  canvasSize: {
    width: 0,
    height: 0,
  },
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {},
});

export const {} = settingsSlice.actions;

export default settingsSlice.reducer;
