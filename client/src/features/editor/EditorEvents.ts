import EventEmitter from 'eventemitter3';

export interface EditorEventListener {
  listen(events: EditorEvents): void;
}

class EditorEvents extends EventEmitter {
  public dispatch<T>(type: string, data: string) {
    this.emit(type, JSON.parse(data) as T);
  }
}

export default EditorEvents;
