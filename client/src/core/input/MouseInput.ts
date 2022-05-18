import Point from '../models/Point';
import ToolStore from '../tool/ToolStore';
import PointerData from '../tool/PointerData';

class MouseInput {
  private canvas: HTMLCanvasElement;

  private toolStore: ToolStore;

  private offset: Point | undefined;

  private isDown = false;

  constructor(canvas: HTMLCanvasElement, toolStore: ToolStore) {
    this.canvas = canvas;
    this.toolStore = toolStore;
  }

  onDown(): void {
    this.setOffset();
    this.isDown = true;
  }

  onUp(): void {
    this.isDown = false;
  }

  onClick(e: MouseEvent): void {
    const pointerData = this.getPointerData(e);
    if (pointerData) {
      this.toolStore.selectedTool?.click(pointerData);
    }
  }

  onMove(e: MouseEvent): void {
    const pointerData = this.getPointerData(e);
    if (!pointerData) {
      return;
    }

    if (this.isDown) {
      this.toolStore.selectedTool?.drag(pointerData);
    } else {
      this.toolStore.selectedTool?.move(pointerData);
    }
  }

  private getPointerData(e: MouseEvent): PointerData | undefined {
    if (!this.offset) {
      return;
    }

    return {
      x: e.clientX - this.offset.x,
      y: e.clientY - this.offset.y,
    };
  }

  private setOffset() {
    const rect = this.canvas.getBoundingClientRect();
    this.offset = new Point(rect.left, rect.top);
  }
}

export default MouseInput;
