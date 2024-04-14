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
import { initialBlockSettingsState } from '../features/block/blockSettingsSlice';
import { initialSceneState } from '../services/scene/blocksSlice';
import { BlockName } from '../types/BlockType';
import { ReactThreeTestInstance } from '@react-three/test-renderer/dist/declarations/src/types';

type ExtendedRenderOptions = {
  preloadedState?: Partial<PreloadedState>;
} & Parameters<(typeof ReactThreeTestRenderer)['create']>[1];

export const createStoreState = (initialState?: Partial<PreloadedState>): RootState => {
  return {
    settings: initialState?.settings || initialSettingsState,
    tool: initialState?.tool || initialToolState,
    user: initialState?.user || initialUserState,
    blockSettings: {
      present: initialState?.block || initialBlockSettingsState,
      past: [],
      future: [],
    },
    blocks: {
      present: initialState?.scene || initialSceneState,
      past: [],
      future: [],
    },
  };
};

export const renderWithProviders = async (
  ui: React.ReactElement,
  { preloadedState, ...renderOptions }: ExtendedRenderOptions = {},
) => {
  const store = setupStore(createStoreState(preloadedState));

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
  name?: BlockName;
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
