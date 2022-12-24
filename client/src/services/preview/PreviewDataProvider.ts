import { createClient } from 'really-simple-xdm';
import CanvasEventListener from '../canvas/CanvasEventListener';
import Editor from '../api/Editor';

class PreviewDataProvider extends CanvasEventListener {
  // TODO: add type
  private previewProxy: any;

  private editorApi?: Editor;

  constructor(editorApi?: Editor) {
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
