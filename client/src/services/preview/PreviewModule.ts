import AppModule from '@/core/AppModule';
import CanvasEventHandler from '../canvas/CanvasEventHandler';
import Editor from '../api/Editor';
import PreviewDataProvider from './PreviewDataProvider';

class PreviewModule extends AppModule {
  private previewDataProvider: PreviewDataProvider;

  constructor(canvasEventWHandler: CanvasEventHandler, editorApi?: Editor) {
    super();

    this.previewDataProvider = new PreviewDataProvider(editorApi);
    canvasEventWHandler.addListener(this.previewDataProvider);
  }
}

export default PreviewModule;
