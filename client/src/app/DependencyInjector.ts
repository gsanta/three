import { App } from './App';
import { store } from '@/store';
import { initFrames } from '@/features/frame/state/frameSlice';
import { initLayers } from '@/panels/layer/state/layerSlice';
import { initTools } from '@/features/tool/state/toolSlice';
import { initSettings } from '@/features/settings/state/settingsSlice';

class DependencyInjector {
  private app: App;

  constructor(app: App) {
    this.app = app;
  }

  init() {
    const { editorApi } = this.app;

    store.dispatch(initFrames(editorApi));
    store.dispatch(initLayers(editorApi));
    store.dispatch(initTools(editorApi));
    store.dispatch(initSettings(editorApi));
  }
}

export default DependencyInjector;
