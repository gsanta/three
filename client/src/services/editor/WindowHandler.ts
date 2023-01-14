import { EditorEventListener } from './EditorEvents';

class WindowHandler implements EditorEventListener {
  onEditorInitialized(): void {
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
