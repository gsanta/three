import { AppContextType } from '@/core/AppContext';
import LifeCycleEventListener from './LifeCycleEventListener';

class LifeCycleEventHandler {
  private listeners: LifeCycleEventListener[] = [];

  emitCanvasInitialized(context: AppContextType) {
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
