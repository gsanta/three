import { App } from '@/app/App';
import { EditorEventListener } from './EditorEvents';

class WindowHandler extends EditorEventListener {
  private context?: App;

  onEditorInitialized(context: App): void {
    this.context = context;
    this.updateWindowSize();
  }

  updateWindowSize() {
    //   const canvasNode = this.context?.editorApi?.canvasNode;
    //   if (canvasNode) {
    //     canvasNode.removeAttribute('width');
    //     canvasNode.removeAttribute('height');
    //     const rect = canvasNode.getBoundingClientRect();
    //     this.context?.editorApi?.setWindowSize(rect.width, rect.height);
    //   }
  }
}

export default WindowHandler;
