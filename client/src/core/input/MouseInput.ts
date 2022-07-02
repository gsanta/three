import Point from '../models/Point';
import PointerData from '../tool/PointerData';
import MouseInputHandler from './MouseInputHandler';

class MouseInput {
  private canvas: HTMLCanvasElement;

  private handlers: MouseInputHandler[] = [];

  private offset: Point | undefined;

  private isDown = false;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  addHandler(handler: MouseInputHandler) {
    this.handlers.push(handler);
  }

  removeHandler(handler: MouseInputHandler) {
    this.handlers = this.handlers.filter((currentHandler) => currentHandler !== handler);
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
      this.handlers.forEach((handler) => handler?.click(pointerData));
    }
  }

  onMove(e: MouseEvent): void {
    const pointerData = this.getPointerData(e);
    if (!pointerData) {
      return;
    }

    if (this.isDown) {
      this.handlers.forEach((handler) => handler?.drag(pointerData));
    } else {
      this.handlers.forEach((handler) => handler?.move(pointerData));
    }
  }

  onWheel(e: WheelEvent): void {
    this.handlers.forEach((handler) => handler?.wheel({ deltaX: e.deltaX, deltaY: e.deltaY }));
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
    this.offset = new Point(rect.left || 0, rect.top || 0);
  }
}

export default MouseInput;
