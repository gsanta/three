import { AppContextType } from '@/core/AppContext';
import LifeCycleEventListener from './LifeCycleEventListener';

class WindowHandler extends LifeCycleEventListener {
  private context?: AppContextType;

  onCanvasInitialized(context: AppContextType): void {
    this.context = context;
    this.updateWindowSize();
  }

  updateWindowSize() {
    const canvasNode = this.context?.canvasService?.canvasNode;
    if (canvasNode) {
      canvasNode.removeAttribute('width');
      canvasNode.removeAttribute('height');
      const rect = canvasNode.getBoundingClientRect();
      this.context?.canvasService?.setWindowSize(rect.width, rect.height);
    }
  }
}

export default WindowHandler;
