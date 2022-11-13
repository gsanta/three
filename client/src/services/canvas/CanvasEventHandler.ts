import CanvasEventListener from './CanvasEventListener';

class CanvasEventHandler {
  private listeners: CanvasEventListener[] = [];

  emitDataChange() {
    this.listeners.forEach((listener) => listener.onDataChange());
  }

  public addListener(listener: CanvasEventListener): void {
    this.listeners.push(listener);
  }

  public removeListener(listener: CanvasEventListener) {
    this.listeners = this.listeners.filter((currentListener) => currentListener != listener);
  }
}

export default CanvasEventHandler;
