import EditorEventType from './EditorEventType';

class EditorEventEmitter {
  private handlers: Map<EditorEventType, Set<any>>;

  constructor(handlers: Map<EditorEventType, Set<any>>) {
    this.handlers = handlers;
  }

  emit(type: 'pixelAdded'): void;
  emit(type: 'pixelRemoved'): void;

  emit(type: EditorEventType, data?: unknown): void {
    this.handlers.get(type)?.forEach((handler) => {
      handler(data);
    });
  }
}

export default EditorEventEmitter;
