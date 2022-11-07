import { AppContextType } from '@/core/AppContext';
import AppModule from '@/core/AppModule';
import PreviewDataProvider from './PreviewDataProvider';

class PreviewModule extends AppModule {
  private appContext: AppContextType;

  private previewDataProvider: PreviewDataProvider;

  constructor(appContext: AppContextType) {
    super();
    this.appContext = appContext;

    this.previewDataProvider = new PreviewDataProvider();
    this.appContext.canvasEventHandler.addListener(this.previewDataProvider);
  }
}

export default PreviewModule;
