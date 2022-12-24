import { App } from '@/core/App';
import LifeCycleEventListener from './LifeCycleEventListener';

class WindowHandler implements LifeCycleEventListener {
  private context?: App;

  onCanvasInitialized(context: App): void {
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
