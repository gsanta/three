import { AppContextType } from '@/ui/context/AppContext';
import PreviewProcessor from './PreviewProcessor';

class PreviewModule {
  private appContext: AppContextType;

  private previewProcessor: PreviewProcessor;

  constructor(appContext: AppContextType) {
    this.appContext = appContext;

    this.previewProcessor = new PreviewProcessor(appContext.canvasService);
  }

  enable() {
    this.appContext.externalEventHandler.addListener(this.previewProcessor);
  }
}

export default PreviewModule;
