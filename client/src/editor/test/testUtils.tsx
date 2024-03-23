import { PreloadedState, RootState, setupStore } from '@/common/utils/store';
import ReactThreeTestRenderer from '@react-three/test-renderer';
import { Provider } from 'react-redux';
import AddTool from '../features/block/service/AddTool';
import GroupTool from '../features/block/service/GroupTool';
import SelectTool from '../features/block/service/SelectTool';
import KeyboardService from '../services/tool/service/KeyboardService';
import ToolService from '../services/tool/service/ToolService';
import { EditorContext } from '@/app/editor/EditorContext';
import { initialSettingsState } from '../features/settings/state/settingsSlice';
import { initialToolState } from '../services/tool/state/toolSlice';
import { initialUserState } from '@/user/userSlice';
import { initialBlockState } from '../features/block/blockSlice';
import { initialSceneState } from '../services/scene/sceneSlice';
import { BlockType } from '../types/Block';
import { ReactThreeTestInstance } from '@react-three/test-renderer/dist/declarations/src/types';

type ExtendedRenderOptions = {
  preloadedState?: Partial<PreloadedState>;
} & Parameters<(typeof ReactThreeTestRenderer)['create']>[1];

export const renderWithProviders = async (
  ui: React.ReactElement,
  { preloadedState, ...renderOptions }: ExtendedRenderOptions = {},
) => {
  const defaultState: RootState = {
    settings: preloadedState?.settings || initialSettingsState,
    tool: preloadedState?.tool || initialToolState,
    user: preloadedState?.user || initialUserState,
    block: {
      present: preloadedState?.block || initialBlockState,
      past: [],
      future: [],
    },
    scene: {
      present: preloadedState?.scene || initialSceneState,
      past: [],
      future: [],
    },
  };

  const store = setupStore(defaultState);

  const editorContext = {
    tool: new ToolService([new AddTool(store), new SelectTool(store), new GroupTool(store)], store),
    keyboard: new KeyboardService(store),
  };

  const renderer = await ReactThreeTestRenderer.create(
    <EditorContext.Provider value={editorContext}>
      <Provider store={store}>{ui}</Provider>
    </EditorContext.Provider>,
    renderOptions,
  );

  return {
    store,
    renderer,
  };
};

type FindMeshOptions = {
  name?: BlockType;
};

export const findByModelId = (
  instance: ReactThreeTestInstance,
  modelId: string,
  options: FindMeshOptions = {},
): ReactThreeTestInstance => {
  const meshes = instance.findAllByProps(options);

  const result = meshes.find((mesh) => mesh.instance.userData?.modelId === modelId);

  if (!result) {
    throw new Error('Instance not found');
  }

  return result;
};
