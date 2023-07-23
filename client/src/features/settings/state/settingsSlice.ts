import Editor from '@/features/editor/Editor';
import EditorApi from '@/features/editor/EditorApi';
import { initLayers } from '@/features/layer/state/layerSlice';
import { toRGBAColor } from '@/utils/colorUtils';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
  color: string;
  editor?: EditorApi;
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
  reducers: {
    initSettings: (state, action: PayloadAction<Pick<SettingsState, 'editor' | 'canvasSize'>>) => {
      state.editor = action.payload.editor;
      state.canvasSize = action.payload.canvasSize;
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

    setCanvasSize: (state, action: PayloadAction<SettingsState['canvasSize']>) => {
      state.canvasSize = action.payload;

      state.editor?.setCanvasSize(state.canvasSize.width, state.canvasSize.height);
    },

    flipHorizontal: (state) => {
      state.editor?.flipHorizontal();
    },
  },
});

export const { flipHorizontal, initSettings, receiveColor, setCanvasSize, setColor } = settingsSlice.actions;

export const importDocument = (fileContent: string, editor: EditorApi) => async (dispatch: any) => {
  editor.importDocument(fileContent);
  dispatch(initLayers(editor as Editor));
};

export default settingsSlice.reducer;
