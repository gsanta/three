import App from '@/app/App';

export abstract class EditorEventListener {
  onDataChange(): void {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onEditorInitialized(_context: App): void {}
}

class EditorEvents {
  private listeners: EditorEventListener[] = [];

  emitDataChange() {
    this.listeners.forEach((listener) => listener.onDataChange());
  }

  emitEditorInitialized(context: App) {
    this.listeners.forEach((listener) => listener.onEditorInitialized(context));
  }

  public addListener(listener: EditorEventListener): void {
    this.listeners.push(listener);
  }

  public removeListener(listener: EditorEventListener) {
    this.listeners = this.listeners.filter((currentListener) => currentListener != listener);
  }
}

export default EditorEvents;
