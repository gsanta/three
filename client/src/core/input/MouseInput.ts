import Point from '../primitives/Point';
import ToolStore from '../tool/ToolStore';
import PointerData from '../tool/PointerData';

class MouseInput {
  private canvas: HTMLCanvasElement;

  private toolStore: ToolStore;

  private offset: Point | undefined;

  constructor(canvas: HTMLCanvasElement, toolStore: ToolStore) {
    this.canvas = canvas;
    this.toolStore = toolStore;

    this.setOffset();
  }

  onClick(e: MouseEvent): void {
    if (!this.offset) {
      return;
    }
    const pointerData: PointerData = {
      x: e.clientX - this.offset.x,
      y: e.clientY - this.offset.y,
    };
    this.toolStore.getActiveTool()?.onClick(pointerData);
  }

  private setOffset() {
    const rect = this.canvas.getBoundingClientRect();
    this.offset = new Point(rect.left, rect.top);
  }
}

export default MouseInput;
