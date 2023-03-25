import { configureStore } from '@reduxjs/toolkit';
import frameSlice from './features/frame/state/frameSlice';
import layerSlice from './panels/layer/state/layerSlice';

export const store = configureStore({
  reducer: {
    frame: frameSlice,
    layer: layerSlice,
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
