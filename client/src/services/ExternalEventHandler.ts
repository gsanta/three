import ExternalEventListener from './ExternalEventListener';

class ExternalEventHandler {
  private listeners: ExternalEventListener[] = [];

  emitDataChange() {
    console.log('emitting event from c++');
    this.listeners.forEach((listener) => listener.onDataChange());
  }

  public addListener(listener: ExternalEventListener): void {
    this.listeners.push(listener);
  }

  public removeListener(listener: ExternalEventListener) {
    this.listeners = this.listeners.filter((currentListener) => currentListener != listener);
  }
}

export default ExternalEventHandler;
