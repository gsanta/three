import AppModule from '@/core/AppModule';
import CanvasEventHandler from '../canvas/CanvasEventHandler';
import EditorApi from '../api/EditorApi';
import PreviewDataProvider from './PreviewDataProvider';

class PreviewModule extends AppModule {
  private previewDataProvider: PreviewDataProvider;

  constructor(canvasEventWHandler: CanvasEventHandler, editorApi?: EditorApi) {
    super();

    this.previewDataProvider = new PreviewDataProvider(editorApi);
    canvasEventWHandler.addListener(this.previewDataProvider);
  }
}

export default PreviewModule;
