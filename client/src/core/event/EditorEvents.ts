import EditorEventType from './EditorEventType';

class EditorEvents {
  private handlers: Map<string, Set<any>>;

  constructor(handlers: Map<string, Set<any>>) {
    this.handlers = handlers;
  }

  on(type: 'pixelAdded', handler: () => void): void;
  on(type: 'pixelRemoved', handler: () => void): void;

  on(type: EditorEventType, handler: unknown): void {
    this.handlers.get(type)?.add(handler);
  }

  off(type: 'pixelAdded', handler: () => void): void;
  off(type: 'pixelRemoved', handler: () => void): void;

  off(type: EditorEventType, handler: unknown): void {
    this.handlers.get(type)?.delete(handler);
  }
}

export default EditorEvents;
