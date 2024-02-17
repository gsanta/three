import AddTool from '@/features/builder/AddTool';
import builderSlice from '@/features/builder/builderSlice';
import sceneSlice from '@/features/scene/sceneSlice';
import settingsSlice from '@/features/settings/state/settingsSlice';
import toolSlice, { setTools } from '@/features/tool/state/toolSlice';
import userSlice from '@/features/user/userSlice';
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

store.dispatch(setTools([new AddTool(store)]));

export type Store = typeof store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
