import App from '../../app/App';

export interface EditorEventListener {
  onDataChange?(): void;

  onEditorInitialized?(): void;
}

class EditorEvents {
  private listeners: EditorEventListener[] = [];

  emitDataChange() {
    this.listeners.forEach((listener) => listener.onDataChange?.());
  }

  emitEditorInitialized() {
    this.listeners.forEach((listener) => listener.onEditorInitialized?.());
  }

  public addListener(listener: EditorEventListener): void {
    this.listeners.push(listener);
  }

  public removeListener(listener: EditorEventListener) {
    this.listeners = this.listeners.filter((currentListener) => currentListener != listener);
  }
}

export default EditorEvents;
