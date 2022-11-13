import AppModule from '@/core/AppModule';
import CanvasEventHandler from '../canvas/CanvasEventHandler';
import PreviewDataProvider from './PreviewDataProvider';

class PreviewModule extends AppModule {
  private previewDataProvider: PreviewDataProvider;

  constructor(canvasEventWHandler: CanvasEventHandler) {
    super();

    this.previewDataProvider = new PreviewDataProvider();
    canvasEventWHandler.addListener(this.previewDataProvider);
  }
}

export default PreviewModule;
