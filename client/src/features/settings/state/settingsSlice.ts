import Editor from '@/features/editor/Editor';
import { initLayers } from '@/features/layer/state/layerSlice';
import { toRGBAColor } from '@/common/utils/colorUtils';
import type { RootState } from '@/common/utils/store';
// import type { RootState } from '@/utils/store';
import { Action, createSlice, Dispatch, PayloadAction, ThunkDispatch } from '@reduxjs/toolkit';

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
  reducers: {
    initSettings: (state, action: PayloadAction<Pick<SettingsState, 'canvasSize'>>) => {
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
    },

    setCanvasSize: (state, action: PayloadAction<SettingsState['canvasSize']>) => {
      state.canvasSize = action.payload;
    },
  },
});

export const { initSettings, receiveColor } = settingsSlice.actions;

const actions = settingsSlice.actions;

export function flipHorizontal() {
  return (_dispatch: ThunkDispatch<unknown, unknown, Action>, getState: () => RootState) => {
    getState().editor.editor?.flipHorizontal();
  };
}

export function setColor(color: string) {
  return (dispatch: ThunkDispatch<unknown, unknown, Action>, getState: () => RootState) => {
    dispatch(actions.setColor(color));

    const r = color.substring(1, 3);
    const g = color.substring(3, 5);
    const b = color.substring(5, 7);
    const a = color.substring(7, 9);
    const hexColor = Number('0x' + a + b + g + r);
    getState().editor.editor?.setColor(hexColor);
  };
}

export const importDocument = (fileContent: string, editor: Editor) => async (dispatch: Dispatch) => {
  editor.importDocument(fileContent);
  dispatch(initLayers(editor));
};

export const setCanvasSize = (canvasSize: SettingsState['canvasSize']) => {
  return (_dispatch: ThunkDispatch<unknown, unknown, Action>, getState: () => RootState) => {
    getState().editor.editor.setCanvasSize(canvasSize.width, canvasSize.height);
    actions.setCanvasSize(canvasSize);
  };
};

export default settingsSlice.reducer;
