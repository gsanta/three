import { createClient } from 'really-simple-xdm';
import CanvasEventListener from '../canvas/CanvasEventListener';
import EditorApi from '../api/EditorApi';

class PreviewDataProvider extends CanvasEventListener {
  // TODO: add type
  private previewProxy: any;

  private editorApi?: EditorApi;

  constructor(editorApi?: EditorApi) {
    super();
    this.editorApi = editorApi;
    this.init();
  }

  onDataChange(): void {
    if (!this.previewProxy) {
      return;
    }

    this.previewProxy.testFunc(this.editorApi?.getEngineData());
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
