import { createClient } from 'really-simple-xdm';
import CanvasEventListener from '../canvas/CanvasEventListener';
import { CanvasService } from '../CanvasService';

class PreviewDataProvider extends CanvasEventListener {
  // TODO: add type
  private previewProxy: any;

  private canvasService?: CanvasService;

  onDataChange(): void {
    if (!this.previewProxy) {
      return;
    }

    this.previewProxy.testFunc(this.canvasService?.getEngineData());
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
