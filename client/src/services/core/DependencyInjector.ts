import { AppContextType } from '@/core/AppContext';
import KeyCode from '../keyboard/KeyCode';
import PreviewModule from '../preview/PreviewModule';
import ExternalTool from '../tool/ExternalTool';
import ToolName from '../tool/ToolName';
import ToolSelectionEvent from '../tool/ToolSelectionEvents';
import LifeCycleEventListener from './LifeCycleEventListener';

class DependencyInjector implements LifeCycleEventListener {
  onCanvasInitialized({ canvasEventHandler, toolStore, keyboardHandler, moduleManager }: AppContextType) {
    toolStore.addTool(
      new ExternalTool(
        ToolName.Brush,
        'BiPencil',
        Module,
        new ToolSelectionEvent(toolStore, ToolName.Brush, KeyCode.b),
      ),
    );
    toolStore.addTool(new ExternalTool(ToolName.Rectangle, 'BiRectangle', Module));
    toolStore.addTool(new ExternalTool(ToolName.SelectionRectangle, 'BiBorderRadius', Module));
    toolStore.addTool(new ExternalTool(ToolName.Erase, 'BiEraser', Module));
    toolStore.addTool(new ExternalTool(ToolName.Pan, 'BiMove', Module));
    moduleManager.addModule(new PreviewModule(canvasEventHandler));

    moduleManager.start();

    toolStore.tools.forEach((tool) => {
      const shortCut = tool.getShortCut();
      if (shortCut) {
        keyboardHandler.addKeyEvent(shortCut);
      }
    });
  }
}

export default DependencyInjector;
