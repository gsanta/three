import { AppContextType } from '@/core/AppContext';
import LifeCycleEventListener from './LifeCycleEventListener';

class WindowHandler implements LifeCycleEventListener {
  private context?: AppContextType;

  onCanvasInitialized(context: AppContextType): void {
    this.context = context;
    this.updateWindowSize();
  }

  updateWindowSize() {
    const canvasNode = this.context?.editorApi?.canvasNode;
    if (canvasNode) {
      canvasNode.removeAttribute('width');
      canvasNode.removeAttribute('height');
      const rect = canvasNode.getBoundingClientRect();
      this.context?.editorApi?.setWindowSize(rect.width, rect.height);
    }
  }
}

export default WindowHandler;
