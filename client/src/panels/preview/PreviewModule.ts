import AppModule from '@/core/AppModule';
import Editor from '@/services/native/Editor';
import CanvasEventHandler from '@/services/canvas/CanvasEventHandler';
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
