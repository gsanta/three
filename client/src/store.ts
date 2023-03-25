import { configureStore } from '@reduxjs/toolkit';
import frameSlice from './features/frame/state/frameSlice';
import settingsSlice from './features/settings/state/settingsSlice';
import toolSlice from './features/tool/state/toolSlice';
import layerSlice from './panels/layer/state/layerSlice';

export const store = configureStore({
  reducer: {
    frame: frameSlice,
    layer: layerSlice,
    settings: settingsSlice,
    tool: toolSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['frame/initFrames', 'layer/initLayers'],
        ignoredPaths: ['frame.editor', 'layer.editor'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
