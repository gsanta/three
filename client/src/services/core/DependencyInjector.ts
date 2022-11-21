import { AppContextType } from '@/core/AppContext';
import KeyCode from '../keyboard/KeyCode';
import PreviewModule from '../preview/PreviewModule';
import ExternalTool from '../tool/ExternalTool';
import ToolName from '../tool/ToolName';
import ToolSelectionEvent from '../tool/ToolSelectionEvents';
import LifeCycleEventListener from './LifeCycleEventListener';

class DependencyInjector implements LifeCycleEventListener {
  onCanvasInitialized({
    canvasEventHandler,
    editorApi,
    toolStore,
    keyboardHandler,
    layerHandler,
    moduleManager,
  }: AppContextType) {
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
    moduleManager.addModule(new PreviewModule(canvasEventHandler, editorApi));

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
