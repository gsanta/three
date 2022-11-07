import { CanvasService } from '../CanvasService';
import CanvasEventListener from './CanvasEventListener';

class CanvasEventHandler {
  private listeners: CanvasEventListener[] = [];

  emitDataChange() {
    console.log('emitting event from c++');
    this.listeners.forEach((listener) => listener.onDataChange());
  }

  emitCanvasReady(canvasService: CanvasService) {
    this.listeners.forEach((listener) => listener.onCanvasReady(canvasService));
  }

  public addListener(listener: CanvasEventListener): void {
    this.listeners.push(listener);
  }

  public removeListener(listener: CanvasEventListener) {
    this.listeners = this.listeners.filter((currentListener) => currentListener != listener);
  }
}

export default CanvasEventHandler;
