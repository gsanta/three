import AppModule from '@/core/AppModule';
import CanvasEventHandler from '../canvas/CanvasEventHandler';
import { CanvasService } from '../CanvasService';
import PreviewDataProvider from './PreviewDataProvider';

class PreviewModule extends AppModule {
  private previewDataProvider: PreviewDataProvider;

  constructor(canvasEventWHandler: CanvasEventHandler, canvasService?: CanvasService) {
    super();

    this.previewDataProvider = new PreviewDataProvider(canvasService);
    canvasEventWHandler.addListener(this.previewDataProvider);
  }
}

export default PreviewModule;