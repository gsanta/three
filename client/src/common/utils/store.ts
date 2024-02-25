import builderSlice from '../../editor/features/builder/builderSlice';
import sceneSlice from '../../editor/features/scene/sceneSlice';
import settingsSlice from '../../editor/features/settings/state/settingsSlice';
import toolSlice from '../../editor/features/tool/state/toolSlice';
import userSlice from '../../editor/features/user/userSlice';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    settings: settingsSlice,
    tool: toolSlice,
    user: userSlice,
    builder: builderSlice,
    scene: sceneSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'frame/initFrames',
          'layer/initLayers',
          'tool/initTools',
          'settings/initSettings',
          'editor/setEditor',
        ],
        ignoredPaths: ['frame.editor', 'layer.editor', 'settings.editor', 'tool.editor', 'editor.editor'],
      },
    }),
});

export type Store = typeof store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
