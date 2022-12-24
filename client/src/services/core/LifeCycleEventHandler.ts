import { App } from '@/core/App';
import LifeCycleEventListener from './LifeCycleEventListener';

class LifeCycleEventHandler {
  private listeners: LifeCycleEventListener[] = [];

  emitCanvasInitialized(context: App) {
    this.listeners.forEach((listener) => listener.onCanvasInitialized(context));
  }

  public addListener(listener: LifeCycleEventListener): void {
    this.listeners.push(listener);
  }

  public removeListener(listener: LifeCycleEventListener) {
    this.listeners = this.listeners.filter((currentListener) => currentListener != listener);
  }
}

export default LifeCycleEventHandler;
