import EditorEventEmitter from './EditorEventEmitter';
import EditorEvents from './EditorEvents';
import EditorEventType from './EditorEventType';

class EditorEventsCreator {
  static create(): [EditorEvents, EditorEventEmitter] {
    const handlers: Map<EditorEventType, Set<any>> = new Map();
    handlers.set('pixelAdded', new Set());

    return [new EditorEvents(handlers), new EditorEventEmitter(handlers)];
  }
}

export default EditorEventsCreator;
