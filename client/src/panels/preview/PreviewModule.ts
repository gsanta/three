import AppModule from '@/app/AppModule';
import Editor from '@/services/editor/Editor';
import EditorEvents from '@/services/editor/EditorEvents';
import PreviewDataProvider from './PreviewDataProvider';

class PreviewModule extends AppModule {
  private previewDataProvider: PreviewDataProvider;

  constructor(canvasEventWHandler: EditorEvents, editorApi?: Editor) {
    super();

    this.previewDataProvider = new PreviewDataProvider(editorApi);
    canvasEventWHandler.addListener(this.previewDataProvider);
  }
}

export default PreviewModule;
