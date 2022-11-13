import { AppContextType } from '@/core/AppContext';
import { createClient } from 'really-simple-xdm';
import CanvasEventListener from '../canvas/CanvasEventListener';
import { CanvasService } from '../CanvasService';
import LifeCycleEventListener from '../core/LifeCycleEventListener';

class PreviewDataProvider extends CanvasEventListener implements LifeCycleEventListener {
  // TODO: add type
  private previewProxy: any;

  private canvasService?: CanvasService;

  onDataChange(): void {
    if (!this.previewProxy) {
      return;
    }

    this.previewProxy.testFunc(this.canvasService?.getEngineData());
  }

  onCanvasInitialized(context: AppContextType): void {
    this.canvasService = context.canvasService;
    this.init();
  }

  onCanvasReady(canvasService: CanvasService): void {
    this.canvasService = canvasService;

    this.init();
  }

  private async init() {
    const iframeElement = document.getElementById('test-iframe') as HTMLIFrameElement;
    this.previewProxy = await createClient({
      targetWindow: iframeElement?.contentWindow as Window,
      targetOrigin: '*',
    });
  }
}

export default PreviewDataProvider;
