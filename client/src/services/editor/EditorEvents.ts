export interface EditorEventListener<T = unknown> {
  onDataChange?(): void;

  onChange?(eventType: string, data: T): void;

  onEditorInitialized?(): void;
}

class EditorEvents {
  private listeners: EditorEventListener[] = [];

  emitChange(data: string) {
    console.log(data);
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
