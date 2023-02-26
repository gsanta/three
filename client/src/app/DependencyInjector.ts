import { App } from './App';
import KeyCode from '../services/keyboard/KeyCode';
import ExternalTool from '../panels/toolbar/model/ExternalTool';
import ToolName from '../panels/toolbar/model/ToolName';
import ToolSelectionEvent from '../panels/toolbar/model/ToolSelectionEvents';
import ColorPickerTool from '@/panels/toolbar/model/ColorPickerTool';

class DependencyInjector {
  private app: App;

  constructor(app: App) {
    this.app = app;
  }

  init() {
    const { editorStore, toolStore, editorApi, moduleManager, layerHandler, keyboardHandler } = this.app;

    toolStore.addTool(
      new ExternalTool(
        ToolName.Brush,
        'BiPencil',
        editorApi,
        new ToolSelectionEvent(toolStore, ToolName.Brush, KeyCode.b),
      ),
    );
    toolStore.addTool(new ExternalTool(ToolName.Rectangle, 'BiRectangle', editorApi));
    toolStore.addTool(new ExternalTool(ToolName.SelectionRectangle, 'BiBorderRadius', editorApi));
    toolStore.addTool(new ExternalTool(ToolName.Erase, 'BiEraser', editorApi));
    toolStore.addTool(new ExternalTool(ToolName.Pan, 'BiMove', editorApi));
    toolStore.addTool(new ExternalTool(ToolName.PaintBucket, 'BiColorFill', editorApi));
    toolStore.addTool(new ColorPickerTool(ToolName.ColorPicker, 'BiHighlight', editorApi, editorStore));
    toolStore.setSelectedTool(ToolName.Brush);

    moduleManager.start();

    layerHandler.init();

    toolStore.tools.forEach((tool) => {
      const shortCut = tool.getShortCut();
      if (shortCut) {
        keyboardHandler.addKeyEvent(shortCut);
      }
    });
  }
}

export default DependencyInjector;
