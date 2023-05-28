import Editor from '@/features/editor/Editor';
import EditorApi from '@/features/editor/EditorApi';
import { toRGBAColor } from '@/utils/colorUtils';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
  color: string;
  editor?: EditorApi;
}

const initialState: SettingsState = {
  color: '#000000',
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    initSettings: (state, action: PayloadAction<Editor>) => {
      state.editor = action.payload;
    },

    // receives the color from the c++ editor
    receiveColor: (state, action: PayloadAction<string>) => {
      const color = action.payload;
      const abgrColor = Number(color).toString(16);
      const rgbaColor = toRGBAColor('#' + abgrColor).toString(16);
      state.color = '#' + rgbaColor;
    },

    setColor: (state, action: PayloadAction<string>) => {
      const color = action.payload;
      state.color = color;

      const r = color.substring(1, 3);
      const g = color.substring(3, 5);
      const b = color.substring(5, 7);
      const a = color.substring(7, 9);
      const hexColor = Number('0x' + a + b + g + r);
      state.editor?.setColor(hexColor);
    },

    flipHorizontal: (state) => {
      state.editor?.flipHorizontal();
    },
  },
});

export const { flipHorizontal, initSettings, receiveColor, setColor } = settingsSlice.actions;

export default settingsSlice.reducer;
